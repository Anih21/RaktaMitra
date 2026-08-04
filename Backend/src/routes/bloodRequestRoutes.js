const express = require("express");

const router = express.Router();

const bloodRequestController = require("../controllers/bloodRequestController");

router.post("/", bloodRequestController.createRequest);

module.exports = router;