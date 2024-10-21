const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createJob", protect, createJob);
router.get("/getJobs", protect, getJobs);

module.exports = router;
