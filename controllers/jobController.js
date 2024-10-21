const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const sendJobEmails = require("../utils/sendJobEmail");

// Create job posting
const createJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;
  const companyId = req.companyId;

  try {
    // const job = new Job({
    //   title,
    //   description,
    //   experienceLevel,
    //   endDate,
    //   company: companyId,
    //   candidates,
    // });

    // await job.save();
    const company = await Company.findById(companyId);
    // company.jobs.push(job);
    // await company.save();
    for (let candidate of candidates) {
     await sendJobEmails(candidate,"New Job Alert",title,description,experienceLevel,endDate,company.companyEmail);
    }

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
};

// Get all jobs for a company
const getJobs = async (req, res) => {
  const companyId = req.companyId;

  try {
    const jobs = await Job.find({ company: companyId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

module.exports = {
  createJob,
  getJobs,
}