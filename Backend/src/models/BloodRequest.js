const mongoose = require("mongoose");

const BloodRequestSchema = new mongoose.Schema({
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  bloodGroup: {
    type: String,
    required: true,
    trim: true
  },
  units: {
    type: Number,
    required: true
  },
  hospital: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending"
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  declinedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
}, {
  timestamps: true
});

// Index for geospatial queries
BloodRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("BloodRequest", BloodRequestSchema);