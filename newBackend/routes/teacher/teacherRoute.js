
import express from "express";
import {
  createTeacher,
  getTeacherByUserId,
  getTeacherId,
} from "../../models/controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);  
router.get("/user/:userId", getTeacherByUserId);
router.get("/:id", getTeacherId);

export default router;
