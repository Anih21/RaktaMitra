const DonorProfile = require("../models/DonorProfile");
const User = require("../models/User");

// @desc    Search matching donors based on blood group and location filters
// @route   GET /api/donor/search
// @access  Private (Seeker / Hospital)
const searchDonors = async (req, res) => {
  const { bloodGroup, city, district, taluka } = req.query;

  try {
    const filter = { availability: true };

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }
    if (city) {
      filter.city = { $regex: new RegExp(city, "i") };
    }
    if (district) {
      filter.district = { $regex: new RegExp(district, "i") };
    }
    if (taluka) {
      filter.taluka = { $regex: new RegExp(taluka, "i") };
    }

    // Find profiles matching requirements
    const donors = await DonorProfile.find(filter)
      .populate("userId", "fullName email phone")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: donors.length,
      donors
    });
  } catch (error) {
    console.error("Search Donors Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all donors
// @route   GET /api/donor
// @access  Private (Seeker / Hospital / Admin)
const getAllDonors = async (req, res) => {
  try {
    const donors = await DonorProfile.find()
      .populate("userId", "fullName email phone")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: donors.length,
      donors
    });
  } catch (error) {
    console.error("Get All Donors Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchDonors, getAllDonors };
