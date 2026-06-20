const Donor = require("../models/Donor");

async function registerDonor(req, res) {
  try {
    const { name, age, bloodGroup, city, phone, email, availability } = req.body;

    if (!name || !age || !bloodGroup || !city || !phone) {
      return res.status(400).json({ message: "Name, age, blood group, city, and phone are required" });
    }

    const donor = await Donor.create({
      name,
      age,
      bloodGroup,
      city,
      phone,
      email,
      availability
    });

    res.status(201).json({
      message: "Donor registered successfully",
      donor
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to register donor" });
  }
}

async function searchDonors(req, res) {
  try {
    const { bloodGroup, city } = req.query;

    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required" });
    }

    const donors = await Donor.find({
      bloodGroup,
      city: new RegExp(`^${city}$`, "i"),
      availability: true
    }).sort({ createdAt: -1 });

    res.json({
      count: donors.length,
      donors
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to search donors" });
  }
}

async function getAllDonors(req, res) {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donors" });
  }
}

module.exports = {
  registerDonor,
  searchDonors,
  getAllDonors
};
