const express = require("express");
const router = express.Router();
const { getAllHospitals, getNearbyHospitals, updateInventory } = require("../controllers/hospitalController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getAllHospitals);
router.get("/nearby", protect, getNearbyHospitals);
router.put("/inventory", protect, updateInventory);

module.exports = router;
