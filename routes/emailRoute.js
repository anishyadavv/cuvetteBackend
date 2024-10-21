const express = require("express");
const { sendEmails } = require("../controllers/emailController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/send", protect, sendEmails);

module.exports = router;
