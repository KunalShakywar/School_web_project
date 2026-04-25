import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Absent",
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    name: String,
    className: String,
    subject: String,
    teacherName: String,
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    teacherEmail: String,
    teacherSubject: String,
    attendanceSessionId: {
      type: String,
      index: true,
    },
    remark: String,
  },
  {
    timestamps: true,
  }
);

export default model("Attendance", attendanceSchema);
