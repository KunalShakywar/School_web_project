import express from "express";
import { listGalleryItems, toggleGalleryLike } from "../models/controllers/galleryController.js";

const router = express.Router();

router.get("/", listGalleryItems);
router.patch("/:id/like", toggleGalleryLike);

export default router;
