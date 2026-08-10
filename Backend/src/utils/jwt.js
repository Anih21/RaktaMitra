const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "raktamitra_jwt_secret_key_2026",
    { expiresIn: "30d" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "raktamitra_jwt_secret_key_2026");
};

module.exports = { generateToken, verifyToken };
