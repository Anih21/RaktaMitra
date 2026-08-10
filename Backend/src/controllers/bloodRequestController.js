const BloodRequest = require("../models/BloodRequest");
const DonorProfile = require("../models/DonorProfile");
const Hospital = require("../models/Hospital");
const BloodBank = require("../models/BloodBank");
const User = require("../models/User");
const Notification = require("../models/Notification");

// @desc    Create a new blood request & notify nearest donors, hospitals, and blood banks
// @route   POST /api/bloodrequests
// @access  Private (Seeker)
const createRequest = async (req, res) => {
  const { patientName, bloodGroup, units, hospital, latitude, longitude } = req.body;

  if (!patientName || !bloodGroup || !units || !latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const lat = Number(latitude);
    const lng = Number(longitude);

    // 1. Create the request in the database
    const bloodRequest = await BloodRequest.create({
      seekerId: req.user.id,
      patientName,
      bloodGroup,
      units: Number(units),
      hospital: hospital || "",
      location: {
        type: "Point",
        coordinates: [lng, lat] // [longitude, latitude]
      }
    });

    console.log(`Created request ${bloodRequest._id}. Searching for nearest matching providers...`);

    // 2. Broadcast notifications to nearest matching donors (10km radius)
    const matchingDonors = await DonorProfile.find({
      bloodGroup: bloodGroup,
      availability: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000 // 10 km in meters
        }
      }
    });

    const inventoryKey = `inventory.${bloodGroup}`;

    // 3. Broadcast notifications to nearest hospitals having stock (10km radius)
    const matchingHospitals = await Hospital.find({
      [inventoryKey]: { $gt: 0 },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000
        }
      }
    });

    // 4. Broadcast notifications to nearest blood banks having stock (10km radius)
    const matchingBloodBanks = await BloodBank.find({
      [inventoryKey]: { $gt: 0 },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000
        }
      }
    });

    // 5. Build notifications array
    const notificationsToInsert = [];
    const message = `URGENT: ${units} units of ${bloodGroup} needed for patient "${patientName}" at "${hospital || "local hospital"}".`;

    // Add donor notifications
    matchingDonors.forEach((donor) => {
      // Don't notify the seeker themselves if they also happen to be a donor
      if (donor.userId.toString() !== req.user.id) {
        notificationsToInsert.push({
          userId: donor.userId,
          requestId: bloodRequest._id,
          message,
          type: "request_broadcast"
        });
      }
    });

    // Add hospital notifications
    matchingHospitals.forEach((hosp) => {
      if (hosp.userId.toString() !== req.user.id) {
        notificationsToInsert.push({
          userId: hosp.userId,
          requestId: bloodRequest._id,
          message,
          type: "request_broadcast"
        });
      }
    });

    // Add blood bank notifications
    matchingBloodBanks.forEach((bb) => {
      if (bb.userId.toString() !== req.user.id) {
        notificationsToInsert.push({
          userId: bb.userId,
          requestId: bloodRequest._id,
          message,
          type: "request_broadcast"
        });
      }
    });

    // Bulk insert notifications if there are any
    if (notificationsToInsert.length > 0) {
      await Notification.insertMany(notificationsToInsert);
      console.log(`Successfully broadcasted ${notificationsToInsert.length} notifications.`);
    }

    res.status(201).json({
      success: true,
      message: "Request created and notifications broadcasted successfully.",
      bloodRequest
    });
  } catch (error) {
    console.error("Create Request Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Accept a blood request (locked to exactly one acceptor)
// @route   POST /api/bloodrequests/:id/accept
// @access  Private (Donor, Hospital, Blood Bank)
const acceptRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // Atomic update to lock acceptance to a single user
    const request = await BloodRequest.findOneAndUpdate(
      { _id: id, status: "pending" },
      { status: "accepted", acceptedBy: req.user.id },
      { new: true }
    );

    if (!request) {
      // Check if it exists but is already accepted
      const checkExists = await BloodRequest.findById(id);
      if (!checkExists) {
        return res.status(404).json({ success: false, message: "Blood request not found" });
      }
      return res.status(409).json({
        success: false,
        message: "This blood request has already been accepted by another provider."
      });
    }

    // Terminate other broadcast notifications for this request
    await Notification.deleteMany({
      requestId: request._id,
      type: "request_broadcast"
    });

    // Fetch acceptor details (full name + phone)
    const acceptor = await User.findById(req.user.id).select("fullName phone");
    const acceptorName = acceptor ? acceptor.fullName : "A registered provider";
    const acceptorPhone = acceptor ? acceptor.phone : "N/A";

    // Notify seeker
    await Notification.create({
      userId: request.seekerId,
      requestId: request._id,
      message: `Your request for patient "${request.patientName}" has been ACCEPTED by ${acceptorName}. Contact: ${acceptorPhone}`,
      type: "request_accepted"
    });

    res.json({
      success: true,
      message: "Request accepted successfully. Seeker has been notified.",
      bloodRequest: request
    });
  } catch (error) {
    console.error("Accept Request Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Decline a blood request
// @route   POST /api/bloodrequests/:id/decline
// @access  Private (Donor, Hospital, Blood Bank)
const declineRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // Add current user to declinedBy list
    const request = await BloodRequest.findByIdAndUpdate(
      id,
      { $addToSet: { declinedBy: req.user.id } },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: "Blood request not found" });
    }

    // Fetch decliner details
    const decliner = await User.findById(req.user.id).select("fullName");
    const declinerName = decliner ? decliner.fullName : "A registered provider";

    // Notify the seeker that this provider declined
    await Notification.create({
      userId: request.seekerId,
      requestId: request._id,
      message: `Your blood request for patient "${request.patientName}" was declined by ${declinerName}.`,
      type: "request_declined"
    });

    res.json({
      success: true,
      message: "Request declined. Seeker has been notified.",
      bloodRequest: request
    });
  } catch (error) {
    console.error("Decline Request Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get requests created by the current seeker
// @route   GET /api/bloodrequests/my
// @access  Private (Seeker)
const getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ seekerId: req.user.id })
      .populate("acceptedBy", "fullName phone email")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Get My Requests Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active requests near the current user
// @route   GET /api/bloodrequests/available
// @access  Private (Donor, Hospital, Blood Bank)
const getAvailableRequests = async (req, res) => {
  try {
    // Fetch profile to find coordinates
    let profile = null;
    if (req.user.role === "DONOR") {
      profile = await DonorProfile.findOne({ userId: req.user.id });
    } else if (req.user.role === "HOSPITAL") {
      profile = await Hospital.findOne({ userId: req.user.id });
    } else if (req.user.role === "BLOOD_BANK") {
      profile = await BloodBank.findOne({ userId: req.user.id });
    }

    if (!profile || !profile.location || !profile.location.coordinates) {
      return res.status(400).json({ success: false, message: "Profile location details are missing" });
    }

    const [lng, lat] = profile.location.coordinates;

    // Find pending requests within 10km
    // Exclude requests they created, accepted, or declined
    const requests = await BloodRequest.find({
      status: "pending",
      seekerId: { $ne: req.user.id },
      declinedBy: { $ne: req.user.id },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000
        }
      }
    }).sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Get Available Requests Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRequest,
  acceptRequest,
  declineRequest,
  getMyRequests,
  getAvailableRequests
};