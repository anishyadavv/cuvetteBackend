const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const jobRoutes = require("./routes/jobRoute");
const emailRoutes = require("./routes/emailRoute");
var cors = require("cors");

dotenv.config();

const app = express();



connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/emails", emailRoutes);

app.get("/",(req,res)=>{
    res.send("hello anish");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
