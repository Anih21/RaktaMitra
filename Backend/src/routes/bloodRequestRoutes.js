const express = require("express");
const router = express.Router();
const {
  createRequest,
  acceptRequest,
  declineRequest,
  getMyRequests,
  getAvailableRequests
} = require("../controllers/bloodRequestController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createRequest);
router.get("/my", protect, getMyRequests);
router.get("/available", protect, getAvailableRequests);
router.post("/:id/accept", protect, acceptRequest);
router.post("/:id/decline", protect, declineRequest);

module.exports = router;