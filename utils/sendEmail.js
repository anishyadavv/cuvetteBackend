const nodemailer = require("nodemailer");
require("dotenv").config();

const userEmail = process.env.USER_EMAIL;
const userPass = process.env.USER_PASS;

const sendEmail = async (recipient, subject, message) => {
 try {
   const transporter = nodemailer.createTransport({
     service: "gmail",
     port: 465,
     secure: true,
     auth: {
       user: userEmail,
       pass: userPass,
     }
   });

   const mailOptions = {
     from: userEmail,
     to: recipient,
     subject:subject,
     html: `<h3>Hi,${message}</h3>`,
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

module.exports = sendEmail;
