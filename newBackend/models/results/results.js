import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    roll: {
      type: Number,
      required: true,
    },

    subjects: [
      {
        subject: {
          type: String,
          required: true,
        },

        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;