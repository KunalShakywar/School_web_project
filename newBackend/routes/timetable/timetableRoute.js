import express from "express";
import {
  createTimetable,
  getTimetables,
} from "../../models/controllers/timetable/timetableController.js";

const router = express.Router();

router.get("/all", getTimetables);
router.post("/create", createTimetable);

export default router;
