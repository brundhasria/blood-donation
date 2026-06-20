const BloodRequest = require("../models/BloodRequest");

async function createBloodRequest(req, res) {
  try {
    const { patientName, bloodGroup, hospital, city, contact } = req.body;

    if (!patientName || !bloodGroup || !hospital || !city || !contact) {
      return res.status(400).json({ message: "All blood request fields are required" });
    }

    const bloodRequest = await BloodRequest.create({
      patientName,
      bloodGroup,
      hospital,
      city,
      contact
    });

    res.status(201).json({
      message: "Blood request submitted successfully",
      request: bloodRequest
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to submit blood request" });
  }
}

async function getAllRequests(req, res) {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blood requests" });
  }
}

module.exports = {
  createBloodRequest,
  getAllRequests
};
