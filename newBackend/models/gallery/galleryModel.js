import { Schema, model } from "mongoose";

const gallerySchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    likes: { type: Number, default: 0, min: 0 },
    likedIps: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

export default model("Gallery", gallerySchema);
