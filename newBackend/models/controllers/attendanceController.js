import mongoose from "mongoose";
import Attendance from "../attendances/attendancesModel.js";
import Student from "../students/studentsModel.js";

const toDateOnly = (value) => {
  if (!value) return null;
  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const resolveStudentId = (value) => {
  if (!value) return null;
  if (mongoose.Types.ObjectId.isValid(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
};

const resolveTeacherId = (value) => {
  if (!value) return null;
  if (mongoose.Types.ObjectId.isValid(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
};

// MARK ATTENDANCE
export const markAttendance = async (req, res) => {
  const {
    students,
    date,
    className,
    classId,
    subject,
    teacherName,
    teacherId,
    teacherEmail,
    teacherSubject,
    remark,
    sessionId,
  } = req.body;

  try {
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No students provided",
      });
    }

    const normalizedDate = toDateOnly(date) ?? toDateOnly(new Date());
    const normalizedTeacherId = resolveTeacherId(teacherId);
    const resolvedSubject = subject || teacherSubject || "";
    const resolvedClassName =
      className ||
      students.find((student) => student?.className)?.className ||
      "";
    const resolvedClassId =
      classId ||
      students.find((student) => student?.classId)?.classId ||
      null;

    const duplicateQuery = {
      teacherId: normalizedTeacherId,
      date: normalizedDate,
      subject: resolvedSubject,
    };

    if (resolvedClassId) {
      duplicateQuery.classId = resolvedClassId;
    } else if (resolvedClassName) {
      duplicateQuery.className = resolvedClassName;
    }

    const existingAttendance = await Attendance.findOne(duplicateQuery).lean();

    if (existingAttendance) {
      return res.status(409).json({
        success: false,
        message: "Attendance already submitted for this teacher, subject and class on this date.",
        data: existingAttendance,
      });
    }

    // one session per attendance submission
    const attendanceSessionId =
      sessionId || new mongoose.Types.ObjectId().toString();

    const operations = students
      .map((student) => {
        const rawStudentId =
          student.studentId ?? student._id ?? student.id ?? student.userId;

        const studentId = resolveStudentId(rawStudentId);
        if (!studentId) return null;

        const status =
          student.status ??
          (student.present === true
            ? "Present"
            : student.present === false
            ? "Absent"
            : "Absent");

        const setData = {
          studentId,
          name: student.name || "",
          date: normalizedDate,
          status,
          present: student.present ?? status === "Present",
          subject: resolvedSubject,
          teacherName: teacherName || "",
          teacherId: normalizedTeacherId,
          teacherEmail: teacherEmail || "",
          teacherSubject: teacherSubject || resolvedSubject,
          className: student.className ?? resolvedClassName,
          classId: student.classId ?? resolvedClassId,
          remark: student.remark ?? remark,
          attendanceSessionId,
        };

        return {
          updateOne: {
            filter: {
              studentId,
              attendanceSessionId,
            },
            update: { $set: setData },
            upsert: true,
          },
        };
      })
      .filter(Boolean);

    if (operations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid student ids provided",
      });
    }

    await Attendance.bulkWrite(operations, { ordered: false });

    const studentIds = operations.map(
      (op) => op.updateOne.filter.studentId
    );

    const records = await Attendance.find({
      studentId: { $in: studentIds },
      attendanceSessionId,
    })
      .populate("studentId", "name rollNumber className class")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      sessionId: attendanceSessionId, 
      data: records,
    });
  } catch (error) {
    console.error("markAttendance error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY STUDENT
export const getAttendanceByStudent = async (req, res) => {
  try {
    const studentIdParam = req.params.studentId ?? req.params.id;

    if (!studentIdParam) {
      return res.status(400).json({
        success: false,
        message: "Student id is required",
      });
    }

    const studentId = resolveStudentId(studentIdParam);

    const records = await Attendance.find({ studentId })
      .populate("studentId", "name rollNumber className class")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("getAttendanceByStudent error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY USER ID
export const getAttendanceByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const student = await Student.findOne({ userId }).lean();

    if (!student?._id) {
      return res.status(404).json({
        success: false,
        message: "Student not found for this user",
      });
    }

    const records = await Attendance.find({
      studentId: student._id,
    })
      .populate("studentId", "name rollNumber className class")
      .sort({ date: -1, subject: 1 });

    res.status(200).json({
      success: true,
      data: records,
      student,
    });
  } catch (error) {
    console.error("getAttendanceByUserId error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const buildAttendanceSession = (records) => {
  if (!Array.isArray(records) || records.length === 0) return null;

  const first = records[0];
  return {
    attendanceSessionId: first.attendanceSessionId || first._id?.toString(),
    date: first.date,
    subject: first.subject || first.teacherSubject || "",
    teacherName: first.teacherName || "",
    teacherId: first.teacherId || null,
    teacherEmail: first.teacherEmail || "",
    className: first.className || "",
    students: records.map((record) => ({
      _id: record._id,
      studentId: record.studentId,
      name: record.name,
      roll: record.studentId?.rollNumber || record.studentId?.roll || "",
      className: record.className,
      present: record.present,
      status: record.status,
      remark: record.remark,
    })),
  };
};

export const getAttendanceByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { subject } = req.query;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        message: "Teacher id is required",
      });
    }

    const query = { teacherId };
    if (subject) {
      query.subject = subject;
    }

    const records = await Attendance.find(query)
      .populate("studentId", "name rollNumber className class")
      .sort({ createdAt: -1 });

    const grouped = new Map();

    records.forEach((record) => {
      const key = record.attendanceSessionId || `${record.teacherId}-${record.date}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(record);
    });

    const sessions = Array.from(grouped.values())
      .map(buildAttendanceSession)
      .filter(Boolean)
      .sort((a, b) => {
        const aDate = a.date ? new Date(a.date).getTime() : 0;
        const bDate = b.date ? new Date(b.date).getTime() : 0;
        return bDate - aDate;
      });

    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error("getAttendanceByTeacher error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAttendanceByTeacherAndSubject = async (req, res) => {
  try {
    const { teacherId, subject } = req.params;

    if (!teacherId || !subject) {
      return res.status(400).json({
        success: false,
        message: "Teacher id and subject are required",
      });
    }

    req.query.subject = subject;
    return getAttendanceByTeacher(req, res);
  } catch (error) {
    console.error("getAttendanceByTeacherAndSubject error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
