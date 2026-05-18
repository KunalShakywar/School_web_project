import express from "express";
import levelRouter from "./curriculum/Levels.js";
import subjectRouter from "./curriculum/Subjects.js";

const router = express.Router();

router.use("/", levelRouter);
router.use("/subjects", subjectRouter);

export default router;
