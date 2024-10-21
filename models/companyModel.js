const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    employeeSize: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailOTP: { type: String },
    phoneOTP: { type: String },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
