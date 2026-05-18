import express from "express";
import {
  assignTeacher,
  deleteAssignment,
  getAssignments,
  getByTeacher,
} from "../../models/controllers/assignteacher/assignteacherController.js";

const router = express.Router();

router.post("/assign-teacher", assignTeacher);
router.get("/assignments", getAssignments);
router.get("/assignments/:id", getByTeacher);
router.delete("/assign-teacher/:id", deleteAssignment);

export default router;
