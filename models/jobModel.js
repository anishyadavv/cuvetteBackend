const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  endDate: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  candidates: [{ type: String }], // List of candidate emails
},{timestamps: true});

module.exports = mongoose.model("Job", jobSchema);
