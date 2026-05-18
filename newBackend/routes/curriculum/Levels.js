import express from 'express';
import { createLevel, getLevel } from "../../models/controllers/curriculum/levelController.js";

const router = express.Router();

router.post("/createlevel", createLevel);

router.get("/getlevel",getLevel);

export default router;
