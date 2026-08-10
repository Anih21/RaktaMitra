const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["DONOR", "SEEKER", "HOSPITAL", "BLOOD_BANK", "ADMIN"],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
