import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCalendar,
  FiBook,
  FiUser,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../auth/context/AuthContext";
import Table from "../../components/table/Table";
import {
  getTeacherAttendanceContext,
  listAttendanceRecords,
} from "../../utils/attendanceStorage";

const formatDate = (value) => {
  if (!value) return "-";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });
};

const toInputDate = (value) => {
  if (!value) return "";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeStatus = (v) => (v ?? "absent").toString().toLowerCase();

const getRecordClassLabel = (record) => {
  const classNames = Array.from(
    new Set(
      (Array.isArray(record?.students) ? record.students : [])
        .map((student) => student?.className || student?.class || "")
        .filter(Boolean)
    )
  );

  if (classNames.length === 0) return "-";
  if (classNames.length === 1) return classNames[0];
  return classNames.join(", ");
};

const getTeacherRows = (records) => {
  const teacherCounts = records.reduce((counts, { record }) => {
    const teacher = record?.teacherName || "Unknown";
    counts[teacher] = (counts[teacher] || 0) + 1;
    return counts;
  }, {});

  return records
    .map(({ key, record }) => {
      const students = Array.isArray(record?.students) ? record.students : [];
      const totalStudents = students.length;
      const presentStudents = students.filter((student) => student.present).length;
      const absentStudents = totalStudents - presentStudents;
      const teacher = record?.teacherName || "-";
      const submittedAt = record?.submittedAt || record?.createdAt || record?.date;

      return {
        _id: key,
        rawDate: toInputDate(record?.date),
        Date: formatDate(submittedAt),
        "Total Class": `${teacherCounts[teacher] || 0} classes`,
        Teacher: teacher,
        Subject: record?.subject || "-",
        Class: getRecordClassLabel(record),
        Students: totalStudents,
        Present: presentStudents,
        Absent: absentStudents,
        "Attendance %": totalStudents
          ? Math.round((presentStudents / totalStudents) * 100)
          : 0,
      };
    })
    .filter(Boolean);
};

const getStudentRows = (records, user) => {
  const userId = user?._id || user?.id;
  const roll = user?.rollNumber || user?.roll;

  return records
    .map(({ key, record }) => {
      const student = record?.students?.find((s) => {
        return (
          s?.userId === userId ||
          s?.studentId === userId ||
          s?.roll === roll
        );
      });

      if (!student) return null;

      return {
        _id: key,
        rawDate: toInputDate(record?.date),
        Date: formatDate(record?.date),
        Subject: record?.subject || "-",
        Teacher: record?.teacherName || "-",
        Status: normalizeStatus(student.present ? "present" : student.status),
      };
    })
    .filter(Boolean);
};

const getStatusUI = (status) => {
  switch (status) {
    case "present":
      return {
        icon: FiCheckCircle,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      };
    case "late":
      return {
        icon: FiClock,
        color: "text-orange-500",
        bg: "bg-orange-50",
      };
    default:
      return {
        icon: FiXCircle,
        color: "text-rose-600",
        bg: "bg-rose-50",
      };
  };
};

const ShowAttendance = () => {
  const { user, role } = useAuth();
  const { teacherIdentifier, teacherName } = useMemo(
    () => getTeacherAttendanceContext(user),
    [user]
  );

  const isTeacherView = role === "teacher";
  const isAdminView = role === "admin";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [teacherSessions, setTeacherSessions] = useState([]);
  const [teacherSessionsLoading, setTeacherSessionsLoading] = useState(false);
  const [teacherSessionsError, setTeacherSessionsError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const attendanceRecords = useMemo(() => {
    if (isTeacherView) return teacherSessions;
    return listAttendanceRecords();
  }, [isTeacherView, teacherSessions]);

  useEffect(() => {
    if (!isTeacherView || !teacherIdentifier) return undefined;

    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setTeacherSessionsLoading(true);
      setTeacherSessionsError("");

      axios
        .get(`${apiUrl}/api/attendance/teacher/${teacherIdentifier}`)
        .then((res) => {
          if (cancelled) return;
          setTeacherSessions(res.data?.data ?? []);
        })
        .catch((error) => {
          if (cancelled) return;
          console.error("Teacher attendance fetch error:", error);
          setTeacherSessionsError("Unable to load teacher attendance from backend.");
          setTeacherSessions([]);
        })
        .finally(() => {
          if (!cancelled) setTeacherSessionsLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [apiUrl, isTeacherView, teacherIdentifier]);

  const rows = useMemo(() => {
    if (isTeacherView || isAdminView) {
      return getTeacherRows(attendanceRecords);
    }

    return getStudentRows(attendanceRecords, user);
  }, [attendanceRecords, isAdminView, isTeacherView, user]);

  const visibleRows = useMemo(() => {
    if (!selectedDate) return rows;
    return rows.filter((row) => row.rawDate === selectedDate);
  }, [rows, selectedDate]);

  useEffect(() => {
    if (selectedDate || rows.length === 0) return;

    const latestDate = rows.find((row) => row.rawDate)?.rawDate || "";
    if (!latestDate) return;

    Promise.resolve().then(() => {
      setSelectedDate(latestDate);
    });
  }, [rows, selectedDate]);

  const visibleDateLabel = useMemo(() => {
    if (!selectedDate) return "All dates";
    return new Date(`${selectedDate}T00:00:00`).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [selectedDate]);

  const summary = useMemo(() => {
    const total = visibleRows.length;
    const present = visibleRows.reduce((sum, row) => {
      if (row.Present !== undefined) return sum + Number(row.Present || 0);
      return sum + (row.Status === "present" ? 1 : 0);
    }, 0);
    const absent = visibleRows.reduce((sum, row) => {
      if (row.Absent !== undefined) return sum + Number(row.Absent || 0);
      return sum + (row.Status === "present" ? 0 : 1);
    }, 0);
    const percent = present + absent ? Math.round((present / (present + absent)) * 100) : 0;

    return { total, present, absent, percent };
  }, [visibleRows]);

  return (
    <div className="min-h-screen px-3 pt-28 pb-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-bold">
              <FiCalendar size={18} />
              Attendance
            </h1>
            <p className="text-xs text-slate-500">
              {isTeacherView
                ? `Teacher record overview for ${teacherName}`
                : isAdminView
                ? "All teachers record overview"
                : "Student record overview"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Showing: {visibleDateLabel}
            </p>
            {isTeacherView && teacherSessionsLoading && (
              <p className="mt-1 text-xs text-slate-400">Loading backend attendance...</p>
            )}
            {isTeacherView && teacherSessionsError && (
              <p className="mt-1 text-xs text-rose-500">{teacherSessionsError}</p>
            )}
          </div>

          <div className="flex items-end gap-2">
            <label className="flex flex-col gap-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <FiCalendar size={12} />
                Filter by date
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Sessions", value: summary.total, icon: <FiLayers size={14} className="text-slate-900" />, color: "text-slate-900" },
            { label: "Present", value: summary.present, icon: <FiCheckCircle size={14} className="text-emerald-600" />, color: "text-emerald-600" },
            { label: "Absent", value: summary.absent, icon: <FiXCircle size={14} className="text-rose-600" />, color: "text-rose-600" },
            { label: "%", value: `${summary.percent}%`, icon: <FiUser size={14} className="text-blue-600" />, color: "text-blue-600" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="rounded-xl border bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                {icon}
                <p className="text-[10px] text-slate-400">{label}</p>
              </div>
              <p className={`mt-1 text-lg font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border shadow-sm">
          <Table
            columns={
              isTeacherView || isAdminView
                ? ["Date", "Total Class", "Teacher", "Subject", "Class", "Students", "Present", "Absent", "Attendance %"]
                : ["Date", "Subject", "Teacher", "Status"]
            }
            data={visibleRows}
            cellRenderers={
              isTeacherView || isAdminView
                ? {
                    Date: (r) => (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <FiCalendar size={12} />
                        {r.Date}
                      </span>
                    ),
                    "Total Class": (r) => (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700">
                        {r["Total Class"]}
                      </span>
                    ),
                    Teacher: (r) => (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <FiUser size={12} />
                        {r.Teacher}
                      </span>
                    ),
                    Subject: (r) => (
                      <span className="flex items-center gap-1 text-xs font-medium">
                        <FiBook size={12} />
                        {r.Subject}
                      </span>
                    ),
                    Class: (r) => (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <FiCalendar size={12} />
                        {r.Class}
                      </span>
                    ),
                    Students: (r) => (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                        <FiUsers size={12} />
                        {r.Students}
                      </span>
                    ),
                    Present: (r) => (
                      <span className="text-xs font-medium text-emerald-600">
                        {r.Present}
                      </span>
                    ),
                    Absent: (r) => (
                      <span className="text-xs font-medium text-rose-600">
                        {r.Absent}
                      </span>
                    ),
                    "Attendance %": (r) => {
                      const totalMarked = r.Present + r.Absent;
                      const percent = totalMarked ? Math.round((r.Present / totalMarked) * 100) : 0;
                      return (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                          <FiCheckCircle size={12} />
                          {percent}%
                        </span>
                      );
                    },
                  }
                : {
                    Date: (r) => (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <FiCalendar size={12} />
                        {r.Date}
                      </span>
                    ),
                    Subject: (r) => (
                      <span className="flex items-center gap-1 text-xs font-medium">
                        <FiBook size={12} />
                        {r.Subject}
                      </span>
                    ),
                    Teacher: (r) => (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <FiUser size={12} />
                        {r.Teacher}
                      </span>
                    ),
                    Status: (r) => {
                      const ui = getStatusUI(r.Status);
                      const Icon = ui.icon;

                      return (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ui.bg} ${ui.color}`}
                        >
                          <Icon size={12} />
                          {r.Status}
                        </span>
                      );
                    },
                  }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ShowAttendance;
