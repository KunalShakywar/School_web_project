import express from "express";


import { createExam,getExam } from "../../models/controllers/examination/examinationController.js";

const router = express.Router()

router.post("/create", createExam);
router.get("/all",getExam);

export default router;