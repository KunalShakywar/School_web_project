import express from "express";
import {
  createSubject,
  getSubjects,
  getSubjectsByClass,
} from "../../models/controllers/curriculum/subjectController.js";

const router = express.Router();

router.post("/create", createSubject);
router.get("/all", getSubjects);
router.get("/class/:classId", getSubjectsByClass);

export default router;
