require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.TWILIO_PHONE_NUMBER;


const client = require("twilio")(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    client.messages
      .create({
        body: message,
        from: number, // From a valid Twilio number
        to: to, // Text your number
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    res.status(500).json({ message: "Error sending SMS", error });
  }
};

module.exports = sendSMS;
