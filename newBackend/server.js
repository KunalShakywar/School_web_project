import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
// Routes import krne ke liye
import authRoute from './routes/authRoute.js';
import studentRoute from './routes/student/studentRoute.js'
import teacherRoute from './routes/teacher/teacherRoute.js'
import attendanceRoute from './routes/attendance/Attendance.js'
import curriculumRoute from './routes/curriculumRoute.js'
import announcementRoute from './routes/announcementRoute.js'

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schooldb";

// Cors
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(json());
// Login,and Register
app.use("/api/auth",authRoute);

// student Profile
app.use("/api/student",studentRoute);
// teacher Profile
app.use("/api/teacher",teacherRoute);
// attendance
app.use("/api/attendance",attendanceRoute)
// curriculum
app.use("/api/curriculum", curriculumRoute)
// announcements / news / notices
app.use("/api/announcements", announcementRoute)


const startServer = async () => {
  try {
    await connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");

    // Yahan Routes update krna nahi bhulna hai
    app.listen(5000, "0.0.0.0", () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();











