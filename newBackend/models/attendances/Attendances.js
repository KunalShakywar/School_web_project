import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    remark: String,

    attendanceSessionId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance
attendanceSchema.index(
  { studentId: 1, date: 1, classId: 1 },
  { unique: true }
);

export default model("Attendance", attendanceSchema);