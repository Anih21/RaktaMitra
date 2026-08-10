const express = require("express");
const router = express.Router();
const { getSeekerProfile } = require("../controllers/seekerController");
const { protect } = require("../middleware/auth");

router.get("/profile", protect, getSeekerProfile);

module.exports = router;
