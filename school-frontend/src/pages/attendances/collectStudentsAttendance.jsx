import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuth } from "../auth/context/AuthContext";
import {
  extractStudentList,
  readAttendanceRecord,
  getTeacherAttendanceContext,
  clearAttendanceDraftRecord,
  writeAttendanceRecord,
  getLatestSubmittedAttendanceRecord,
} from "../../utils/attendanceStorage";
import AttendanceDashboardHeader from "./components/AttendanceDashboardHeader";
import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceStatus from "./components/AttendanceStatus";
import AttendanceStats from "./components/AttendanceStats";
import AttendanceStudentGrid from "./components/AttendanceStudentGrid";
import AttendanceActionButtons from "./components/AttendanceActionButtons";

const DEFAULT_SUBJECT = "";
const DEFAULT_TEACHER = "";

function CollectStudentsAttendance() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { user, role } = useAuth();
  const authUserId = user?.id || user?._id;
  const authTeacherEmail = user?.email || "";
  const { teacherIdentifier, teacherName: loginTeacherName } = useMemo(
    () => getTeacherAttendanceContext(user),
    [user]
  );

  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [teacherName, setTeacherName] = useState(loginTeacherName || DEFAULT_TEACHER);
  const [teacherSubject, setTeacherSubject] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [baseStudents, setBaseStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingTeacherProfile, setLoadingTeacherProfile] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTeacherName(loginTeacherName || DEFAULT_TEACHER);
  }, [loginTeacherName]);

  useEffect(() => {
    if (!authUserId || role !== "teacher") return;

    let cancelled = false;
    setLoadingTeacherProfile(true);

    axios
      .get(`${apiUrl}/api/teacher/user/${authUserId}`)
      .then((res) => {
        if (cancelled) return;

        const profile = res.data?.data ?? res.data ?? {};
        const resolvedName = profile.name || loginTeacherName || DEFAULT_TEACHER;
        const resolvedSubject = profile.subject || profile.department || DEFAULT_SUBJECT;

        setTeacherName(resolvedName);
        setTeacherSubject(resolvedSubject);
        setSubject((current) => current?.trim() ? current : resolvedSubject);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Unable to load teacher profile", error);
        setTeacherName(loginTeacherName || DEFAULT_TEACHER);
        setTeacherSubject("");
      })
      .finally(() => {
        if (!cancelled) setLoadingTeacherProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl, authUserId, loginTeacherName, role]);
  // Load students when component mounts or apiUrl changes
  useEffect(() => {
    let cancelled = false;
    setLoadingStudents(true);
    setFetchError("");

    axios
      .get(`${apiUrl}/api/student`)
      .then((res) => {
        if (cancelled) return;

        const list = res.data?.data ?? [];
        const normalized = list.map((student) => ({
          id: student._id,
          studentId: student._id,
          userId: student.userId ?? student._id,
          name: student.name,
          roll: student.rollNumber,
          className: student.className,
          present: false,
        }));
        setBaseStudents(normalized);
      })
      .catch((err) => {
        console.error("Unable to load students", err);
        if (!cancelled) {
          setFetchError("Unable to load the student list. Check your backend connection.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingStudents(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);
  // Load attendance record for the selected date and teacher
  useEffect(() => {
    if (baseStudents.length === 0) {
      setStudents([]);
      return;
    }

    const saved =
      readAttendanceRecord(date, teacherIdentifier, loginTeacherName) ??
      getLatestSubmittedAttendanceRecord(date, teacherIdentifier, loginTeacherName);
    const storedStudents = extractStudentList(saved) ?? [];

    const normalized = baseStudents.map((student) => {
      const match = storedStudents.find(
        (entry) =>
          entry?.studentId === student.studentId ||
          entry?.id === student.id ||
          entry?.userId === student.userId
      );

      return { ...student, present: match?.present ?? false };
    });

    setStudents(normalized);
    setSubject(saved?.subject ?? teacherSubject ?? DEFAULT_SUBJECT);
    setTeacherName(saved?.teacherName ?? loginTeacherName ?? DEFAULT_TEACHER);
    setTeacherSubject(saved?.teacherSubject ?? teacherSubject ?? "");
    setHistory([]);
  }, [baseStudents, date, loginTeacherName, teacherIdentifier, teacherSubject]);
  // Auto-save attendance record to localStorage whenever students, date, subject, or teacherName changes
  useEffect(() => {
    if (!date || students.length === 0) return;

    writeAttendanceRecord(date, {
      date,
      subject,
      teacherName,
      teacherSubject,
      teacherIdentifier,
      teacherId: authUserId,
      teacherEmail: authTeacherEmail,
      students: students.map(({ id, studentId, userId, name, className, present }) => ({
        id,
        studentId,
        userId,
        name,
        className,
        present,
      })),
    });
  }, [students, date, subject, teacherName, teacherSubject, teacherIdentifier, authUserId, authTeacherEmail]);

  if (role && role !== "teacher") {
    return (
      <div className="px-4 pt-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          Attendance is available only for teacher logins.
        </div>
      </div>
    );
  }
  // Toggle attendance status for a student and save the previous state in history for undo functionality
  const handleCheck = (id) => {
    setHistory((prev) => [...prev, students.map((student) => ({ ...student }))]);
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    setStudents(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleRestore = () => {
    if (students.length === 0) return;
    setHistory((prev) => [...prev, students.map((student) => ({ ...student }))]);
    setStudents((prev) => prev.map((student) => ({ ...student, present: false })));
  };

  const handleSubmit = async () => {
    if (saving) return;

    setSaving(true);
    setStatusMessage("");
    // Prepare payload and attempt to submit attendance record to backend. If it fails, save locally and show an alert.
    const payload = {
      date,
      subject,
      teacherName,
      teacherSubject,
      teacherId: authUserId,
      teacherEmail: authTeacherEmail,
      students: students.map((student) => ({
        _id: student.studentId,
        name: student.name,
        roll: student.roll,
        className: student.className,
        present: student.present,
      })),
    };

    try {
      await axios.post(`${apiUrl}/api/attendance/mark`, payload);
      writeAttendanceRecord(
        date,
        {
          ...payload,
          submittedAt: new Date().toISOString(),
        },
        { submitted: true }
      );
      clearAttendanceDraftRecord(date, teacherIdentifier, loginTeacherName);
      setStatusMessage(`Attendance synced (${new Date().toLocaleTimeString()})`);
      alert("Attendance submitted successfully.");
    } catch (err) {
      console.error("Attendance submit failed", err);
      if (err?.response?.status === 409) {
        setStatusMessage("Attendance already submitted for this class and date.");
        alert("This attendance is already submitted for the selected date.");
      } else {
        writeAttendanceRecord(
          date,
          {
            ...payload,
            submittedAt: new Date().toISOString(),
          },
          { submitted: true }
        );
        clearAttendanceDraftRecord(date, teacherIdentifier, loginTeacherName);
        setStatusMessage(`Saved locally (${new Date().toLocaleTimeString()})`);
        alert("Backend unavailable. Attendance saved locally.");
      }
    } finally {
      setSaving(false);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const total = students.length;
    const present = students.filter((student) => student.present).length;
    const absent = total - present;
    const percentage = total === 0 ? "0.00" : ((present / total) * 100).toFixed(2);

    doc.setFontSize(14);
    doc.text(`Attendance Report — ${date}`, 20, 20);
    doc.setFontSize(11);
    doc.text(`Subject: ${subject}`, 20, 30);
    doc.text(`Teacher: ${teacherName}`, 20, 37);
    doc.text(`Total: ${total}`, 20, 44);
    doc.text(`Present: ${present}`, 20, 51);
    doc.text(`Absent: ${absent}`, 20, 58);
    doc.text(`Attendance %: ${percentage}%`, 20, 65);

    autoTable(doc, {
      startY: 75,
      head: [["#", "Student Name", "Roll No", "Status"]],
      body: students.map((student, index) => [
        index + 1,
        student.name,
        student.roll ?? "-",
        student.present ? "Present" : "Absent",
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 197, 94] },
      alternateRowStyles: { fillColor: [240, 253, 244] },
    });

    doc.save(`attendance-${date}.pdf`);
  };

  const totalStudents = students.length;
  const totalPresent = students.filter((student) => student.present).length;
  const totalAbsent = totalStudents - totalPresent;
  const percentage =
    totalStudents === 0
      ? "0.0"
      : ((totalPresent / totalStudents) * 100).toFixed(1);

  return (
    <div className="px-4 pt-28">
      <div>
        <AttendanceDashboardHeader statusMessage={statusMessage} />

        {loadingTeacherProfile && (
          <p className="mb-3 text-sm text-slate-500">
            Loading teacher profile for subject and name...
          </p>
        )}

        <AttendanceFilters
          date={date}
          subject={subject}
          teacherName={teacherName}
          teacherSubject={teacherSubject}
          onDateChange={setDate}
          onSubjectChange={setSubject}
          onTeacherNameChange={setTeacherName}
          teacherLocked
          subjectLocked
        />

        <AttendanceStatus
          loadingStudents={loadingStudents}
          fetchError={fetchError}
        />

        <AttendanceStats
          totalStudents={totalStudents}
          totalPresent={totalPresent}
          totalAbsent={totalAbsent}
          percentage={percentage}
        />

        <AttendanceStudentGrid
          students={students}
          loadingStudents={loadingStudents}
          onToggle={handleCheck}
        />

        <AttendanceActionButtons
          saving={saving}
          studentsCount={students.length}
          historyLength={history.length}
          onSubmit={handleSubmit}
          onRestore={handleRestore}
          onUndo={handleUndo}
          onExport={exportPDF}
        />
      </div>
    </div>
  );
}

export default CollectStudentsAttendance;
