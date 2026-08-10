const mongoose = require("mongoose");

const DonorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  bloodGroup: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  lastDonationDate: {
    type: String,
    default: null
  },
  aadhaar: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContact: {
    type: String,
    default: ""
  },
  emergencyContactPhone: {
    type: String,
    default: ""
  },
  availability: {
    type: Boolean,
    default: true
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
DonorProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("DonorProfile", DonorProfileSchema);
