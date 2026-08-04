const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donor", require("./routes/donorRoutes"));
app.use("/api/seeker", require("./routes/seekerRoutes"));
app.use("/api/bloodbanks", require("./routes/bloodBankRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/bloodrequests", require("./routes/bloodRequestRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

module.exports = app;
app.use("/api/bloodrequests",bloodRequestRoutes);