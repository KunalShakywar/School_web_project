import express from "express";

import {
  createResult,
  getResults,
} from "../../models/controllers/results/resultController.js";

const router = express.Router();

router.post("/create", createResult);

router.get("/all", getResults);

export default router;