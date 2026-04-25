import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  classOptions,
  defaultSubject,
  defaultTeacher,
  normalizeStudents,
  todayString,
} from "./attendanceData.jsx";

export function useAttendance() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [teacherName, setTeacherName] = useState(defaultTeacher);
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(todayString());
  const [classFilter, setClassFilter] = useState("All");

  useEffect(() => {
    if (!apiUrl) {
      setFetchError("Backend URL is not configured.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    axios
      .get(`${apiUrl}/api/student`)
      .then((res) => {
        if (cancelled) return;
        setStudents(normalizeStudents(res.data?.data ?? []));
        setFetchError("");
      })
      .catch((error) => {
        console.error("Failed to load students for attendance", error);
        if (!cancelled) setFetchError("Unable to load students.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const markAttendance = (studentId, status) => {
    const dayAttendance = attendanceData[date] || {};
    setAttendanceData({
      ...attendanceData,
      [date]: {
        ...dayAttendance,
        [studentId]: status,
      },
    });
  };

  const filteredStudents = useMemo(
    () =>
      classFilter === "All"
        ? students
        : students.filter((student) => student.className === classFilter),
    [students, classFilter]
  );

  const todayAttendance = attendanceData[date] || {};
  const presentCount = Object.values(todayAttendance).filter((s) => s === "Present").length;
  const absentCount = Object.values(todayAttendance).filter((s) => s === "Absent").length;

  const getPercentage = (studentId) => {
    let totalDays = 0;
    let presentDays = 0;

    Object.values(attendanceData).forEach((day) => {
      if (day[studentId]) {
        totalDays++;
        if (day[studentId] === "Present") presentDays++;
      }
    });

    if (totalDays === 0) return 0;
    return Math.round((presentDays / totalDays) * 100);
  };

  const saveAttendance = async () => {
    if (saving) return;
    setSaving(true);
    setSaveMessage("");

    try {
      if (!apiUrl) throw new Error("Backend URL is not configured.");

      const payload = {
        date,
        subject,
        teacherName,
        className: classFilter === "All" ? undefined : classFilter,
        students: students.map((student) => ({
          _id: student.id,
          name: student.name,
          roll: student.roll,
          className: student.className,
          present: attendanceData[student.id] === "Present",
          status: attendanceData[student.id] ?? "Absent",
        })),
      };

      await axios.post(`${apiUrl}/api/attendance/mark`, payload);
      setSaveMessage("Attendance synced with backend.");
    } catch (error) {
      console.error("Failed to save attendance", error);
      setSaveMessage("Unable to save attendance to backend.");
    } finally {
      setSaving(false);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Attendance Report", 14, 15);
    doc.setFontSize(12);
    doc.text("Date: " + date, 14, 25);
    doc.save("attendance-report.pdf");
  };

  return {
    classOptions,
    students,
    loading,
    fetchError,
    subject,
    setSubject,
    teacherName,
    setTeacherName,
    saveMessage,
    attendanceData,
    date,
    setDate,
    classFilter,
    setClassFilter,
    filteredStudents,
    presentCount,
    absentCount,
    getPercentage,
    markAttendance,
    saveAttendance,
    exportPDF,
  };
}
