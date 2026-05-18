import { Schema, model } from "mongoose";

const announcementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["notice", "news"],
      default: "notice",
      index: true,
    },
    classes: [{ type: String, trim: true }],
    date: { type: Date, default: Date.now },
    popup: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export default model("Announcement", announcementSchema);
