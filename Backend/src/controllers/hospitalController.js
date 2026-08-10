const Hospital = require("../models/Hospital");

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Private
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("userId", "fullName email phone");
    res.json({ success: true, count: hospitals.length, hospitals });
  } catch (error) {
    console.error("Get All Hospitals Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby hospitals
// @route   GET /api/hospitals/nearby
// @access  Private
const getNearbyHospitals = async (req, res) => {
  const { latitude, longitude, maxDistance } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Latitude and longitude are required" });
  }

  try {
    const lat = Number(latitude);
    const lng = Number(longitude);
    const dist = Number(maxDistance) || 15000; // default 15km

    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: dist
        }
      }
    }).populate("userId", "fullName email phone");

    res.json({ success: true, count: hospitals.length, hospitals });
  } catch (error) {
    console.error("Get Nearby Hospitals Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update hospital inventory
// @route   PUT /api/hospitals/inventory
// @access  Private (Hospital)
const updateInventory = async (req, res) => {
  const { inventory } = req.body;

  if (!inventory) {
    return res.status(400).json({ success: false, message: "Inventory data is required" });
  }

  try {
    const hospital = await Hospital.findOneAndUpdate(
      { userId: req.user.id },
      { inventory },
      { new: true }
    );

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital profile not found" });
    }

    res.json({ success: true, message: "Inventory updated successfully", hospital });
  } catch (error) {
    console.error("Update Inventory Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllHospitals, getNearbyHospitals, updateInventory };
