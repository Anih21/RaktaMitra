const express = require("express");
const router = express.Router();
const { registerCamp, getAllCamps } = require("../controllers/campController");
const { protect } = require("../middleware/auth");

router.post("/", protect, registerCamp);
router.get("/", protect, getAllCamps);

module.exports = router;
