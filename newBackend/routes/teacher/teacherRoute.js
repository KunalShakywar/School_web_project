
import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  getTeacherByUserId,
  getTeacherId,
  updateTeacher,
} from "../../models/controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);  
router.get("/", getTeachers);
router.get("/user/:userId", getTeacherByUserId);
router.get("/:id", getTeacherId);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
