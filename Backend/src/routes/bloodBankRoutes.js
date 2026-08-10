const express = require("express");
const router = express.Router();
const { getAllBloodBanks, getNearbyBloodBanks, updateInventory } = require("../controllers/bloodBankController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getAllBloodBanks);
router.get("/nearby", protect, getNearbyBloodBanks);
router.put("/inventory", protect, updateInventory);

module.exports = router;
