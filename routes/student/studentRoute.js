
import express from "express";
import getStudentId from "../../controllers/studentController.js";

const router = express.Router();

router.get("/:id", getStudentId);

export default router;
