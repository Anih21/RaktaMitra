const Camp = require("../models/Camp");
const DonorProfile = require("../models/DonorProfile");
const SeekerProfile = require("../models/SeekerProfile");
const Hospital = require("../models/Hospital");
const BloodBank = require("../models/BloodBank");
const Notification = require("../models/Notification");

// @desc    Register a new blood donation camp & notify nearest users (10km radius)
// @route   POST /api/camps
// @access  Private (Organizer)
const registerCamp = async (req, res) => {
  const { name, description, date, time, address, city, state, pincode, latitude, longitude } = req.body;

  if (!name || !date || !time || !address || !city || !state || !pincode || !latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const lat = Number(latitude);
    const lng = Number(longitude);

    // 1. Create the camp in the database
    const camp = await Camp.create({
      organizerId: req.user.id,
      name,
      description: description || "",
      date: new Date(date),
      time,
      address,
      city,
      state,
      pincode,
      location: {
        type: "Point",
        coordinates: [lng, lat] // [longitude, latitude]
      }
    });

    console.log(`Registered camp ${camp._id}. Searching for users within 10km radius...`);

    // 2. Query nearest profiles (10km)
    const geoQuery = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000 // 10km in meters
        }
      }
    };

    const nearbyDonors = await DonorProfile.find(geoQuery).select("userId");
    const nearbySeekers = await SeekerProfile.find(geoQuery).select("userId");
    const nearbyHospitals = await Hospital.find(geoQuery).select("userId");
    const nearbyBloodBanks = await BloodBank.find(geoQuery).select("userId");

    // 3. Compile unique user IDs (excluding the organizer themselves)
    const targetUserIds = new Set();
    
    nearbyDonors.forEach(d => targetUserIds.add(d.userId.toString()));
    nearbySeekers.forEach(s => targetUserIds.add(s.userId.toString()));
    nearbyHospitals.forEach(h => targetUserIds.add(h.userId.toString()));
    nearbyBloodBanks.forEach(b => targetUserIds.add(b.userId.toString()));

    targetUserIds.delete(req.user.id);

    // 4. Create notification payload
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    
    const message = `BLOOD DONATION CAMP: "${name}" is scheduled near you on ${formattedDate} at "${address}". Join to save lives!`;
    const notificationsToInsert = Array.from(targetUserIds).map(userId => ({
      userId,
      message,
      type: "camp_registered"
    }));

    // 5. Bulk insert notifications
    if (notificationsToInsert.length > 0) {
      await Notification.insertMany(notificationsToInsert);
      console.log(`Dispatched camp notifications to ${notificationsToInsert.length} users.`);
    }

    res.status(201).json({
      success: true,
      message: "Camp registered successfully and proximity alerts broadcasted.",
      camp
    });
  } catch (error) {
    console.error("Register Camp Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all registered blood donation camps
// @route   GET /api/camps
// @access  Private
const getAllCamps = async (req, res) => {
  try {
    const camps = await Camp.find().populate("organizerId", "fullName email phone").sort({ date: 1 });
    res.json({ success: true, count: camps.length, camps });
  } catch (error) {
    console.error("Get Camps Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerCamp,
  getAllCamps
};
