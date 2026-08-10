const mongoose = require("mongoose");
const User = require("./src/models/User");
const DonorProfile = require("./src/models/DonorProfile");
const SeekerProfile = require("./src/models/SeekerProfile");
const Hospital = require("./src/models/Hospital");
const BloodRequest = require("./src/models/BloodRequest");
const Notification = require("./src/models/Notification");
const Camp = require("./src/models/Camp");

const { createRequest, acceptRequest, declineRequest } = require("./src/controllers/bloodRequestController");
const { getAllDonors } = require("./src/controllers/donorController");
const { registerCamp } = require("./src/controllers/campController");

require("dotenv").config();

// Helper to mock request and response objects for Express controllers
const mockResponse = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

async function runTests() {
  console.log("🚀 Starting MongoDB E2E Integration, Proximity, Stock, and Camp Tests...\n");

  try {
    // 1. Connect to local MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/raktamitra_db");
    console.log("✅ MongoDB Connected.");

    // Ensure geospatial indexes are fully compiled before querying
    await DonorProfile.ensureIndexes();
    await SeekerProfile.ensureIndexes();
    await Hospital.ensureIndexes();
    await BloodRequest.ensureIndexes();
    await Camp.ensureIndexes();
    console.log("✅ Geospatial 2dsphere indexes verified.");

    // Clean up any old test data
    const testEmailPrefix = "test_e2e_";
    const oldUsers = await User.find({ email: new RegExp(`^${testEmailPrefix}`) });
    const oldUserIds = oldUsers.map(u => u._id);
    await User.deleteMany({ _id: { $in: oldUserIds } });
    await DonorProfile.deleteMany({ userId: { $in: oldUserIds } });
    await SeekerProfile.deleteMany({ userId: { $in: oldUserIds } });
    await Hospital.deleteMany({ userId: { $in: oldUserIds } });
    await BloodRequest.deleteMany({ seekerId: { $in: oldUserIds } });
    await Notification.deleteMany({ userId: { $in: oldUserIds } });
    await Camp.deleteMany({ organizerId: { $in: oldUserIds } });

    // 2. Setup mock coordinates (Pune coordinates for near, Mumbai for far)
    const puneCoordinates = [73.8567, 18.5204]; // [lng, lat]
    const nearbyDonorCoords = [73.8600, 18.5250]; // ~1km from Pune center
    const nearbyHospCoords = [73.8580, 18.5220]; // ~0.5km from Pune center
    const farDonorCoords = [72.8777, 19.0760]; // ~120km away in Mumbai

    // 3. Create Users
    console.log("\nCreating mock accounts...");
    const seekerUser = await User.create({
      fullName: "Test Seeker",
      email: `${testEmailPrefix}seeker@example.com`,
      phone: "1234567890",
      password: "hashed_password",
      role: "SEEKER"
    });

    const nearbyDonorUser = await User.create({
      fullName: "Nearby Donor (O+)",
      email: `${testEmailPrefix}near_donor@example.com`,
      phone: "9876543210",
      password: "hashed_password",
      role: "DONOR"
    });

    const farDonorUser = await User.create({
      fullName: "Far-away Donor (O+)",
      email: `${testEmailPrefix}far_donor@example.com`,
      phone: "5555555555",
      password: "hashed_password",
      role: "DONOR"
    });

    const hospitalWithStockUser = await User.create({
      fullName: "Hospital With Stock",
      email: `${testEmailPrefix}hosp_stock@example.com`,
      phone: "2222222222",
      password: "hashed_password",
      role: "HOSPITAL"
    });

    const hospitalNoStockUser = await User.create({
      fullName: "Hospital Without Stock",
      email: `${testEmailPrefix}hosp_no_stock@example.com`,
      phone: "3333333333",
      password: "hashed_password",
      role: "HOSPITAL"
    });

    // 4. Create Profiles
    await SeekerProfile.create({
      userId: seekerUser._id,
      patientName: "Jane Doe",
      relationship: "Sister",
      bloodGroupNeeded: "O+",
      unitsNeeded: 2,
      urgency: "High",
      location: { type: "Point", coordinates: puneCoordinates }
    });

    await DonorProfile.create({
      userId: nearbyDonorUser._id,
      bloodGroup: "O+",
      age: 28,
      gender: "Male",
      weight: 75,
      aadhaar: "111122223333",
      availability: true,
      location: { type: "Point", coordinates: nearbyDonorCoords }
    });

    await DonorProfile.create({
      userId: farDonorUser._id,
      bloodGroup: "O+",
      age: 32,
      gender: "Female",
      weight: 60,
      aadhaar: "444455556666",
      availability: true,
      location: { type: "Point", coordinates: farDonorCoords }
    });

    // Hospital 1: Near, has O+ blood in stock
    await Hospital.create({
      userId: hospitalWithStockUser._id,
      hospitalName: "Pune City Hospital",
      location: { type: "Point", coordinates: nearbyHospCoords },
      inventory: { "O+": 5, "A+": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "A-": 0, "O-": 0 }
    });

    // Hospital 2: Near, but does NOT have O+ blood in stock (has A+ instead)
    await Hospital.create({
      userId: hospitalNoStockUser._id,
      hospitalName: "Pune Suburban Hospital",
      location: { type: "Point", coordinates: nearbyHospCoords },
      inventory: { "O+": 0, "A+": 3, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "A-": 0, "O-": 0 }
    });

    console.log("✅ Mock Seeker, Donors, and Hospital profiles generated.");

    // 5. Test Request Creation & Proximity Broadcasting (10km Range + Stock Filter)
    console.log("\nTesting Request Creation & Broadcast Proximity & Stock Filtering...");
    const reqBody = {
      patientName: "Jane Doe",
      bloodGroup: "O+",
      units: 2,
      hospital: "Pune City Hospital",
      latitude: puneCoordinates[1],
      longitude: puneCoordinates[0]
    };

    const createReq = { body: reqBody, user: { id: seekerUser._id.toString() } };
    const createRes = mockResponse();

    await createRequest(createReq, createRes);

    if (createRes.statusCode !== 201) {
      console.error("❌ Failed creating request:", createRes.body);
      process.exit(1);
    }

    const bloodRequestId = createRes.body.bloodRequest._id;
    console.log(`✅ Success! Blood request created with ID: ${bloodRequestId}`);

    // Verify notifications matching distance rules and stock checks
    const nearbyDonorNotifications = await Notification.find({ userId: nearbyDonorUser._id });
    const farDonorNotifications = await Notification.find({ userId: farDonorUser._id });
    const hospitalWithStockNotifications = await Notification.find({ userId: hospitalWithStockUser._id });
    const hospitalNoStockNotifications = await Notification.find({ userId: hospitalNoStockUser._id });

    console.log(`- Proximity Notification for Nearby Donor (1km): ${nearbyDonorNotifications.length > 0 ? "🔔 Sent" : "❌ Missed"}`);
    console.log(`- Proximity Notification for Nearby Hospital WITH stock: ${hospitalWithStockNotifications.length > 0 ? "🔔 Sent" : "❌ Missed"}`);
    console.log(`- Proximity Notification for Nearby Hospital WITHOUT stock: ${hospitalNoStockNotifications.length > 0 ? "❌ Sent (Should be blocked)" : "✅ Blocked"}`);
    console.log(`- Proximity Notification for Far-away Donor (120km): ${farDonorNotifications.length > 0 ? "❌ Sent (Should be blocked)" : "✅ Blocked"}`);

    if (nearbyDonorNotifications.length === 0 || hospitalWithStockNotifications.length === 0 || hospitalNoStockNotifications.length > 0 || farDonorNotifications.length > 0) {
      console.error("❌ Proximity & Stock matching validation failed.");
      process.exit(1);
    }
    console.log("✅ Proximity & Stock Broadcast logic validated successfully.");

    // 6. Test Listing All Donors API
    console.log("\nTesting Donor Listing API...");
    const donorListReq = {};
    const donorListRes = mockResponse();
    await getAllDonors(donorListReq, donorListRes);

    if (donorListRes.statusCode !== 200 || !donorListRes.body.success) {
      console.error("❌ Failed listing donors:", donorListRes.body);
      process.exit(1);
    }
    console.log(`✅ Success! Listed ${donorListRes.body.count} registered donors.`);
    if (donorListRes.body.count !== 2) {
      console.error(`❌ Expected 2 donors, found ${donorListRes.body.count}`);
      process.exit(1);
    }

    // 7. Test Single Acceptance Locking & Notification Termination
    console.log("\nTesting Single Acceptance Locking & Broadcast Termination...");
    
    // Attempt 1: Accept by Nearby Donor (Should succeed and terminate other broadcasts)
    const acceptReq = { params: { id: bloodRequestId }, user: { id: nearbyDonorUser._id.toString() } };
    const acceptRes = mockResponse();
    await acceptRequest(acceptReq, acceptRes);

    if (acceptRes.statusCode === 200 && acceptRes.body.success) {
      console.log("✅ Success: Request successfully accepted by Nearby Donor.");
    } else {
      console.error("❌ Failed primary acceptance:", acceptRes.body);
      process.exit(1);
    }

    // Verify broadcast notifications for this request are terminated/deleted
    const remainingBroadcasts = await Notification.find({
      requestId: bloodRequestId,
      type: "request_broadcast"
    });
    console.log(`- Broadcast notifications terminated (0 left): ${remainingBroadcasts.length === 0 ? "✅ Yes" : "❌ No"}`);
    if (remainingBroadcasts.length !== 0) {
      console.error("❌ Broadcast notifications were not cleaned up on acceptance.");
      process.exit(1);
    }

    // Attempt 2: Accept by Hospital (Should fail due to status locked to 'accepted')
    const acceptReq2 = { params: { id: bloodRequestId }, user: { id: hospitalWithStockUser._id.toString() } };
    const acceptRes2 = mockResponse();
    await acceptRequest(acceptReq2, acceptRes2);

    if (acceptRes2.statusCode === 409) {
      console.log("✅ Success: Second acceptance attempt blocked by concurrency lock (Conflict 409).");
    } else {
      console.error("❌ Error: Lock failed! Second acceptance was not blocked.", acceptRes2.body);
      process.exit(1);
    }

    // Check Seeker notification on Accept
    const seekerAcceptNotifications = await Notification.find({
      userId: seekerUser._id,
      type: "request_accepted"
    });
    console.log(`- Seeker Notification for acceptance: ${seekerAcceptNotifications.length > 0 ? "🔔 Sent" : "❌ Missed"}`);
    if (seekerAcceptNotifications.length === 0) {
      console.error("❌ Seeker acceptance notification was not created.");
      process.exit(1);
    }

    // 8. Test Blood Donation Camp Registration and Proximity Alerts (10km)
    console.log("\nTesting Blood Donation Camp Registration & Proximity Alerts...");
    const campReqBody = {
      name: "Pune Mega Blood Camp",
      description: "Donate blood, save lives!",
      date: new Date(Date.now() + 86400000), // tomorrow
      time: "9:00 AM - 5:00 PM",
      address: "Pune Center Hall, Deccan",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411004",
      latitude: puneCoordinates[1],
      longitude: puneCoordinates[0]
    };

    const registerCampReq = { body: campReqBody, user: { id: hospitalWithStockUser._id.toString() } };
    const registerCampRes = mockResponse();

    await registerCamp(registerCampReq, registerCampRes);

    if (registerCampRes.statusCode !== 201) {
      console.error("❌ Failed creating camp:", registerCampRes.body);
      process.exit(1);
    }

    const campId = registerCampRes.body.camp._id;
    console.log(`✅ Success! Camp registered with ID: ${campId}`);

    // Verify camp registered alerts are sent within 10km only
    const nearbyDonorCampAlerts = await Notification.find({ userId: nearbyDonorUser._id, type: "camp_registered" });
    const farDonorCampAlerts = await Notification.find({ userId: farDonorUser._id, type: "camp_registered" });

    console.log(`- Proximity Camp Alert for Nearby Donor (1km): ${nearbyDonorCampAlerts.length > 0 ? "🔔 Sent" : "❌ Missed"}`);
    console.log(`- Proximity Camp Alert for Far-away Donor (120km): ${farDonorCampAlerts.length > 0 ? "❌ Sent (Should be blocked)" : "✅ Blocked"}`);

    if (nearbyDonorCampAlerts.length === 0 || farDonorCampAlerts.length > 0) {
      console.error("❌ Camp proximity alert validation failed.");
      process.exit(1);
    }
    console.log("✅ Camp Proximity Broadcast logic validated successfully.");

    // 9. Cleanup Database
    console.log("\nCleaning up test collections...");
    const allMockIds = [seekerUser._id, nearbyDonorUser._id, farDonorUser._id, hospitalWithStockUser._id, hospitalNoStockUser._id];
    await User.deleteMany({ _id: { $in: allMockIds } });
    await DonorProfile.deleteMany({ userId: { $in: allMockIds } });
    await SeekerProfile.deleteMany({ userId: { $in: allMockIds } });
    await Hospital.deleteMany({ userId: { $in: allMockIds } });
    await BloodRequest.deleteMany({ seekerId: { $in: allMockIds } });
    await Notification.deleteMany({ userId: { $in: allMockIds } });
    await Camp.deleteMany({ organizerId: { $in: allMockIds } });

    console.log("\n🎉 ALL INTEGRATION, PROXIMITY, STOCK, LOCK, AND CAMP TESTS PASSED SUCCESSFULLY!");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ E2E Script Failure:", error);
    process.exit(1);
  }
}

runTests();
