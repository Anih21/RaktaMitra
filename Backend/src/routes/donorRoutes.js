const express = require("express");
const router = express.Router();
const { searchDonors, getAllDonors } = require("../controllers/donorController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getAllDonors);
router.get("/search", protect, searchDonors);

module.exports = router;
