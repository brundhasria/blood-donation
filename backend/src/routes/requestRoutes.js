const express = require("express");
const {
  createBloodRequest,
  getAllRequests
} = require("../controllers/requestController");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createBloodRequest);
router.get("/", protectAdmin, getAllRequests);

module.exports = router;
