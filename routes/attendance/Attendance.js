
import express from "express";
import {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByTeacher,
  getAttendanceByTeacherAndSubject,
} from "../../models/controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/teacher/:teacherId/subject/:subject", getAttendanceByTeacherAndSubject);
router.get("/teacher/:teacherId", getAttendanceByTeacher);
router.get("/:id",getAttendanceByStudent);

export default router;
