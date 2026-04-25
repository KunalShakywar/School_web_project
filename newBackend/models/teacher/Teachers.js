// Yeh kaam kar raha hai User.js se FK aa raha hai 
import { Schema, model } from "mongoose";

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: String,
    qualification: String,
    className: String,
    phone: String,
    email: String,
    department: String,
    attendanceRate: {
      type: Number,
      default: 0,
    },
    progressRate: {
      type: Number,
      default: 0,
    },
    // Foreign key
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Teacher", TeacherSchema);
