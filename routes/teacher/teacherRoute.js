
import express from "express";
import getTeacherId from "../../controllers/teacherController.js";

const router = express.Router();

router.get("/:id", getTeacherId);

export default router;
