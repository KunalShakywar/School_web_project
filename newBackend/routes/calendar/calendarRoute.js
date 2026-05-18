import express from "express";
import {
  createAcademicCalendarEvent,
  deleteAcademicCalendarEvent,
  listAcademicCalendarEvents,
  updateAcademicCalendarEvent,
} from "../../models/controllers/calendar/academicCalendarController.js";

const router = express.Router();

router.get("/events", listAcademicCalendarEvents);
router.post("/events", createAcademicCalendarEvent);
router.put("/events/:id", updateAcademicCalendarEvent);
router.delete("/events/:id", deleteAcademicCalendarEvent);

export default router;
