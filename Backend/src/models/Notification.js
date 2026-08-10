const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodRequest",
    default: null
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["request_broadcast", "request_accepted", "request_declined", "camp_registered", "general"],
    default: "general"
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Notification", NotificationSchema);
