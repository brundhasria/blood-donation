const express = require("express");
const {
  registerDonor,
  searchDonors,
  getAllDonors
} = require("../controllers/donorController");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerDonor);
router.get("/search", searchDonors);
router.get("/", protectAdmin, getAllDonors);

module.exports = router;
