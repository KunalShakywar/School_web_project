import express, { json } from "express";
import http from "http";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
// Routes import krne ke liye
import authRoute from './routes/authRoute.js';
import studentRoute from './routes/student/studentRoute.js'
import teacherRoute from './routes/teacher/teacherRoute.js'
import staffRoute from './routes/staff/staffRoute.js'
import attendanceRoute from './routes/attendance/Attendance.js'
import curriculumRoute from './routes/curriculumRoute.js'
import announcementRoute from './routes/announcementRoute.js'
import galleryRoute from './routes/galleryRoute.js'
import otpRoute from './routes/otp/otpRoutes.js'
import teacherAssignRoute from './routes/teacherAssign/teacherAssignRoute.js'
import calendarRoute from './routes/calendar/calendarRoute.js'
import { seedLevels } from "./models/seeders/levelSeeder.js";
import classRoutes from "./routes/curriculum/Class.js"
import { setSocketIO } from "./config/socket.js";
import examinationRoute from "./routes/examination/examination.js";
import resultRoutes from "./routes/results/results.js"
import timetableRoute from "./routes/timetable/timetableRoute.js"

dotenv.config();

app.set("trust proxy", true);

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
// staff Profile
app.use("/api/staff", staffRoute);
// Teacher Classes
app.use("/api/teacherassign", teacherAssignRoute)
// attendance
app.use("/api/attendance",attendanceRoute)
// curriculum
app.use("/api/curriculum", curriculumRoute)
app.use("/api/classes", classRoutes);
app.use("/api/calendar", calendarRoute);
app.use("/api/exams", examinationRoute)
app.use("/api/results", resultRoutes);
app.use("/api/timetable", timetableRoute);

// announcements / news / notices
app.use("/api/announcements", announcementRoute)
app.use("/api/gallery", galleryRoute)
// otp
app.use("/api/otp", otpRoute)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

setSocketIO(io);


const startServer = async () => {
  try {
    await connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
    await seedLevels();

    // Yahan Routes update krna nahi bhulna hai
    server.listen(5000, "0.0.0.0", () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();

