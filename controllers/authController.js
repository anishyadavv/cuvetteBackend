const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const Company = require("../models/companyModel");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

// Company registration
const register = async (req, res) => {
  const { name, phoneNo, companyEmail, companyName, employeeSize } = req.body;
  try {
    let existingUser = await Company.findOne({ companyEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    existingUser = await Company.findOne({ phoneNo });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    // generate otp
    const emailOTP = generateOTP();
    const phoneOTP = generateOTP();

    const company = new Company({
      name,
      phoneNo,
      companyEmail,
      companyName,
      employeeSize,
      emailOTP,
      phoneOTP,
    });

    await company.save();

    await sendSMS(phoneNo, `Your OTP for Cuvette is ${phoneOTP}`);

    await sendEmail(
      companyEmail,
      "Cuvette OTP Verification",
      `Your OTP for Cuvette is ${emailOTP}`
    );

    res.status(201).json({
      message: `Email otp ${emailOTP} , phone ${phoneOTP}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering company", error });
  }
};

//verify OTP email
const verifyOTPEmail = async (req, res) => {
  const { companyEmail, emailOTP } = req.body;

  try {
    const company = await Company.findOne({ companyEmail });
    if (!company) {
      return res.status(401).json({ message: "Invalid email or company" });
    }

    if (company.emailOTP !== emailOTP) {
      return res.status(401).json({ message: "Invalid email OTP" });
    }
    res.json({ message:"Email verified"});

  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
};

// Verify OTP phone
const verifyOTPPhone = async(req, res)=>{
  const { phoneNo, phoneOTP } = req.body;
  try{
    const company = await Company.findOne({ phoneNo });
    if(!company){
      return res.status(401).json({message: "Invalid phone number or company"});
    }
    if(company.phoneOTP!== phoneOTP){
      return res.status(401).json({message: "Invalid phone OTP"});
    }
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.json({ token });
  }
  catch(error){
    res.status(500).json({message: "OTP verification failed", error});
  }
}


// Company login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company || !(await bcrypt.compare(password, company.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

module.exports = {
  register,
  login,
  verifyOTPEmail,
  verifyOTPPhone,
};
