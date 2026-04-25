
import express from "express";
import getParentId from "../../models/controllers/parentController.js";

const router = express.Router();

router.get("/:id", getParentId);

export default router;
