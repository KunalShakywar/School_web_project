import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    dates: [
      {
        subject: {
          type: String,
          required: true,
        },

        date: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;