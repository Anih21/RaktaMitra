const mongoose = require("mongoose");

const SeekerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  relationship: {
    type: String,
    required: true
  },
  bloodGroupNeeded: {
    type: String,
    required: true,
    trim: true
  },
  unitsNeeded: {
    type: Number,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  medicalReason: {
    type: String,
    default: ""
  },
  hospitalName: {
    type: String,
    default: ""
  },
  doctorName: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  district: {
    type: String,
    default: ""
  },
  taluka: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  pincode: {
    type: String,
    default: ""
  },
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
SeekerProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("SeekerProfile", SeekerProfileSchema);
