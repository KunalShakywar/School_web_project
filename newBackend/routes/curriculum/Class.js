// routes/classRoutes.js

import express from "express";

import {
  createClass,
  getClasses,
  getClassesByLevel,
} from "../../models/controllers/curriculum/classController.js";

const router = express.Router();

router.post("/create", createClass);

router.get("/all", getClasses);
router.get("/getclass", getClasses);

router.get("/level/:levelId", getClassesByLevel);

export default router;
