const BloodBank = require("../models/BloodBank");

// @desc    Get all blood banks
// @route   GET /api/bloodbanks
// @access  Private
const getAllBloodBanks = async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find().populate("userId", "fullName email phone");
    res.json({ success: true, count: bloodBanks.length, bloodBanks });
  } catch (error) {
    console.error("Get All Blood Banks Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby blood banks
// @route   GET /api/bloodbanks/nearby
// @access  Private
const getNearbyBloodBanks = async (req, res) => {
  const { latitude, longitude, maxDistance } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Latitude and longitude are required" });
  }

  try {
    const lat = Number(latitude);
    const lng = Number(longitude);
    const dist = Number(maxDistance) || 15000; // default 15km

    const bloodBanks = await BloodBank.find({
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

    res.json({ success: true, count: bloodBanks.length, bloodBanks });
  } catch (error) {
    console.error("Get Nearby Blood Banks Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blood bank inventory
// @route   PUT /api/bloodbanks/inventory
// @access  Private (Blood Bank)
const updateInventory = async (req, res) => {
  const { inventory } = req.body;

  if (!inventory) {
    return res.status(400).json({ success: false, message: "Inventory data is required" });
  }

  try {
    const bloodBank = await BloodBank.findOneAndUpdate(
      { userId: req.user.id },
      { inventory },
      { new: true }
    );

    if (!bloodBank) {
      return res.status(404).json({ success: false, message: "Blood bank profile not found" });
    }

    res.json({ success: true, message: "Inventory updated successfully", bloodBank });
  } catch (error) {
    console.error("Update Inventory Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBloodBanks, getNearbyBloodBanks, updateInventory };
