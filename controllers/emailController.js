const sendEmail = require("../utils/sendEmail");
const Job = require("../models/jobModel");

// Send job emails to candidates
const sendEmails = async (req, res) => {
  const { jobId, subject, message } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send emails to candidates
    for (let candidate of job.candidates) {
      await sendEmail(candidate, subject, message);
    }

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending emails", error });
  }
};

module.exports = {
  sendEmails,
}
