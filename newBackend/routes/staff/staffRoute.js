import express from "express";
import {
  createStaff,
  deleteStaff,
  getStaffById,
  listStaff,
  updateStaff,
} from "../../models/controllers/staffController.js";

const router = express.Router();

router.get("/", listStaff);
router.post("/", createStaff);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
