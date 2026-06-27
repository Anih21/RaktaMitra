const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    // Common fields

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["DONOR", "SEEKER"],
        required: true
    },


    // -------------------
    // Donor Details
    // -------------------

    bloodGroup: {
        type: String
    },

    age: {
        type: Number
    },

    gender: {
        type: String
    },

    weight: {
        type: Number
    },

    lastDonationDate: {
        type: String
    },

    aadhaar: {
        type: String
    },


    // -------------------
    // Seeker Details
    // -------------------

    patientName: {
        type: String
    },

    relationship: {
        type: String
    },

    bloodGroupNeeded: {
        type: String
    },

    unitsNeeded: {
        type: Number
    },

    urgency: {
        type: String
    },

    medicalReason: {
        type: String
    },


    // -------------------
    // Hospital details (seeker)
    // -------------------

    hospitalName: {
        type: String
    },

    doctorName: {
        type: String
    },


    // -------------------
    // Location (Donor)
    // -------------------

    address: {
        type: String
    },

    state: {
        type: String
    },

    district: {
        type: String
    },

    taluka: {
        type: String
    },

    city: {
        type: String
    },

    pincode: {
        type: String
    },

    latitude: {
        type: Number
    },

    longitude: {
        type: Number
    },


    // -------------------
    // Emergency Contact
    // -------------------

    emergencyContact: {
        type: String
    },

    emergencyContactPhone: {
        type: String
    },


    availability: {
        type: String
    }

},
{
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);