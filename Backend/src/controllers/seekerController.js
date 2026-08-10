const SeekerProfile = require("../models/SeekerProfile");

// @desc    Get current seeker's detailed profile
// @route   GET /api/seeker/profile
// @access  Private (Seeker)
const getSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id })
      .populate("userId", "fullName email phone");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Seeker profile not found" });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error("Get Seeker Profile Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSeekerProfile };
