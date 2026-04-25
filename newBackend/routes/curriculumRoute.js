import express from "express";
import {
  getCurriculum,
  replaceCurriculum,
} from "../models/controllers/curriculumController.js";

const router = express.Router();

router.get("/", getCurriculum);
router.put("/", replaceCurriculum);

export default router;
