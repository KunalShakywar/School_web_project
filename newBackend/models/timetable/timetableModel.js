import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    monday: {
      type: String,
      default: "",
    },
    tuesday: {
      type: String,
      default: "",
    },
    wednesday: {
      type: String,
      default: "",
    },
    thursday: {
      type: String,
      default: "",
    },
    friday: {
      type: String,
      default: "",
    },
    saturday: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    periods: {
      type: [periodSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
