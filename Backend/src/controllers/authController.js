const User = require("../models/User");
const DonorProfile = require("../models/DonorProfile");
const SeekerProfile = require("../models/SeekerProfile");
const Hospital = require("../models/Hospital");
const BloodBank = require("../models/BloodBank");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

// @desc    Register a new user (Donor, Seeker, Hospital, Blood Bank)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { fullName, email, phone, password, role, ...profileDetails } = req.body;

  if (!fullName || !email || !phone || !password || !role) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create base user record
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role
    });

    // Create the appropriate profile based on role
    try {
      const latitude = Number(profileDetails.latitude);
      const longitude = Number(profileDetails.longitude);
      const coordinates = !isNaN(latitude) && !isNaN(longitude) ? [longitude, latitude] : [0, 0];

      if (role === "DONOR") {
        await DonorProfile.create({
          userId: user._id,
          bloodGroup: profileDetails.bloodGroup,
          age: Number(profileDetails.age),
          gender: profileDetails.gender,
          weight: Number(profileDetails.weight),
          lastDonationDate: profileDetails.lastDonationDate || null,
          aadhaar: profileDetails.aadhaar,
          emergencyContact: profileDetails.emergencyContact || "",
          emergencyContactPhone: profileDetails.emergencyContactPhone || "",
          availability: profileDetails.availability !== undefined ? profileDetails.availability : true,
          address: profileDetails.address || "",
          state: profileDetails.state || "",
          district: profileDetails.district || "",
          taluka: profileDetails.taluka || "",
          city: profileDetails.city || "",
          pincode: profileDetails.pincode || "",
          location: {
            type: "Point",
            coordinates
          }
        });
      } else if (role === "SEEKER") {
        await SeekerProfile.create({
          userId: user._id,
          patientName: profileDetails.patientName,
          relationship: profileDetails.relationship,
          bloodGroupNeeded: profileDetails.bloodGroupNeeded,
          unitsNeeded: Number(profileDetails.unitsNeeded),
          urgency: profileDetails.urgency,
          medicalReason: profileDetails.medicalReason || "",
          hospitalName: profileDetails.hospitalName || "",
          doctorName: profileDetails.doctorName || "",
          address: profileDetails.address || "",
          state: profileDetails.state || "",
          district: profileDetails.district || "",
          taluka: profileDetails.taluka || "",
          city: profileDetails.city || "",
          pincode: profileDetails.pincode || "",
          location: {
            type: "Point",
            coordinates
          }
        });
      } else if (role === "HOSPITAL") {
        await Hospital.create({
          userId: user._id,
          hospitalName: profileDetails.hospitalName || fullName,
          licenceNumber: profileDetails.licenceNumber || "",
          phone: profileDetails.profilePhone || profileDetails.phone || phone,
          address: profileDetails.address || "",
          city: profileDetails.city || "",
          state: profileDetails.state || "",
          pincode: profileDetails.pincode || "",
          location: {
            type: "Point",
            coordinates
          },
          inventory: profileDetails.inventory || {
            "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0, "plasma": 0, "platelets": 0
          }
        });
      } else if (role === "BLOOD_BANK") {
        await BloodBank.create({
          userId: user._id,
          bloodBankName: profileDetails.bloodBankName || fullName,
          licenceNumber: profileDetails.licenceNumber || "",
          phone: profileDetails.profilePhone || profileDetails.phone || phone,
          address: profileDetails.address || "",
          city: profileDetails.city || "",
          state: profileDetails.state || "",
          pincode: profileDetails.pincode || "",
          location: {
            type: "Point",
            coordinates
          },
          inventory: profileDetails.inventory || {
            "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0, "plasma": 0, "platelets": 0
          }
        });
      }

      // Return success response with token
      return res.status(201).json({
        success: true,
        token: generateToken(user._id, user.role),
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      });
    } catch (profileError) {
      // Rollback: Delete the user if profile creation failed
      await User.findByIdAndDelete(user._id);
      throw profileError;
    }
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide email/mobile and password" });
  }

  try {
    // Find user by email or phone (mobile number as username)
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone: email }
      ]
    });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email/mobile or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile details
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let profile = null;
    if (user.role === "DONOR") {
      profile = await DonorProfile.findOne({ userId: user._id });
    } else if (user.role === "SEEKER") {
      profile = await SeekerProfile.findOne({ userId: user._id });
    } else if (user.role === "HOSPITAL") {
      profile = await Hospital.findOne({ userId: user._id });
    } else if (user.role === "BLOOD_BANK") {
      profile = await BloodBank.findOne({ userId: user._id });
    }

    res.json({
      success: true,
      user,
      profile
    });
  } catch (error) {
    console.error("getMe Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
