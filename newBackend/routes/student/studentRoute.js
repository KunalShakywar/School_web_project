
import express from "express";
import {
  createStudent,
  listStudents,
  getStudentById,
  getStudentByUserId,
} from "../../models/controllers/studentController.js";
import {
  getAttendanceByStudent,
  getAttendanceByUserId,
} from "../../models/controllers/attendanceController.js";

const router = express.Router();

router.get("/user/:userId", getStudentByUserId);
router.get("/attendance/user/:userId", getAttendanceByUserId);
router.get("/attendance/:studentId", getAttendanceByStudent);
router.post("/", createStudent); 
router.get("/", listStudents); 
router.get("/:id", getStudentById);

export default router;
