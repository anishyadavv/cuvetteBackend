const nodemailer = require("nodemailer");
require("dotenv").config();

const userEmail = process.env.USER_EMAIL;
const userPass = process.env.USER_PASS;

const sendJobEmails = async (recipient, subject, jobTitle, jobDescription, experienceLevel, endDate, companyEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: userEmail,
        pass: userPass,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: recipient,
      subject: subject,
      html: `<h2>Job Alert</h2> <p>Hey Candidate, We are looking for the a candidate who has skills in the field of ${jobTitle}. Following is the Job Description</p> <h3>Job Description</h3><p>${jobDescription}</p><h3>Experience Required: ${experienceLevel}</h3> <p><b>Note</b>End Date of Application submission is <b>${endDate}</b></p><p>Contact at @${companyEmail}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendJobEmails;
