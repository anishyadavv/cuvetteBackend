const express = require("express");
const { register, login, verifyOTPEmail, verifyOTPPhone } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTPEmail",verifyOTPEmail);
router.post("/verifyOTPPhone",verifyOTPPhone);

module.exports = router;
