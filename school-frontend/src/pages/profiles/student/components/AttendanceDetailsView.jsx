import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiXCircle,
  FiArrowLeft,
  FiTrendingUp,
  FiBarChart2,
  FiRefreshCcw
} from "react-icons/fi";

import Table from "../../../../components/table/Table";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toInputDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AttendanceDetailsView = ({
  profile,
  attendanceLoading,
  attendanceError,
  attendanceRecords = [],
  onBack,
  onRefresh,
  refreshDisabled = false,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  const teacherClassCounts = useMemo(() => {
    return attendanceRecords.reduce((counts, record) => {
      const teacher = record?.teacherName || "Unknown";
      counts[teacher] = (counts[teacher] || 0) + 1;
      return counts;
    }, {});
  }, [attendanceRecords]);

  const rows = useMemo(
    () =>
      attendanceRecords.map((record) => {
        const status = (record.status ?? "Absent").toString().toLowerCase();
        const teacher = record.teacherName || "-";

        return {
          _id: record._id || `${record.date}-${record.subject || "subject"}`,
          rawDate: toInputDate(record.date),
          Date: formatDate(record.date),
          TotalClass: `${teacherClassCounts[teacher] || 0} classes`,
          Subject: record.subject || "-",
          Teacher: teacher,
          Status: status,
        };
      }),
    [attendanceRecords, teacherClassCounts]
  );

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

  const totalAttendanceDays = visibleRows.length;
  const presentDays = visibleRows.filter((row) => row.Status === "present").length;
  const absentDays = totalAttendanceDays - presentDays;
  const attendancePercent =
    totalAttendanceDays === 0
      ? 0
      : Math.round((presentDays / totalAttendanceDays) * 100);

  const statsData = [
    {
      label: "Total Days",
      value: totalAttendanceDays,
      color: "text-slate-900",
      icon: <FiBarChart2 size={12} />,
    },
    {
      label: "Present",
      value: presentDays,
      color: "text-emerald-600",
      icon: <FiCheckCircle size={12} />,
    },
    {
      label: "Absent",
      value: absentDays,
      color: "text-rose-600",
      icon: <FiXCircle size={12} />,
    },
    {
      label: "Attendance %",
      value: `${attendancePercent}%`,
      color: "text-blue-600",
      icon: <FiTrendingUp size={12} />,
    },
  ];

  return (
    <div className="min-h-screen px-3 pt-28 pb-6">
      <div className="mx-auto max-w-6xl space-y-4">

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center border-slate-400  border px-2 py-2 rounded-xl gap-2 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <FiArrowLeft size={16} />
          Back to Profile
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl bg-white">

          {/* Header */}
          <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="flex uppercase items-center gap-2 text-lg font-bold text-slate-900">
                <FiCalendar size={18} />
                Attendance Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {profile?.name || "Student"} attendance pulled from backend.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Showing: {visibleDateLabel}
              </p>
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

              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshDisabled}
                className="inline-flex border border-slate-200  w-fit items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiRefreshCcw />  <span className="ml-2">{attendanceLoading ? "Refreshing..." : "Refresh"}</span> 
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {statsData.map(({ label, value, color, icon }) => (
              <div key={label} className="rounded-xl border bg-white p-3 shadow-sm">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  {icon}
                  {label}
                </div>
                <p className={`mt-1 text-lg font-semibold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="px-4 pb-4 sm:px-6">

            {attendanceLoading && (
              <div className="rounded-xl border bg-white p-4 text-sm text-slate-500 shadow-sm">
                Attendance loading...
              </div>
            )}

            {!attendanceLoading && attendanceError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
                {attendanceError}
              </div>
            )}

            {!attendanceLoading &&
              !attendanceError &&
              attendanceRecords.length === 0 && (
                <div className="rounded-xl border bg-white p-4 text-sm text-slate-500 shadow-sm">
                  No attendance records found for this student yet.
                </div>
              )}

            {!attendanceLoading &&
              !attendanceError &&
              attendanceRecords.length > 0 && (
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                  {/* Table Header */}
                  <div className="border-b px-4 py-3 sm:px-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <p className="text-sm uppercase font-semibold text-slate-500">
                        Attendance Table
                      </p>
                      <p className="text-xs border border-slate-200 w-fit rounded-xl px-2 py-1 text-slate-400">
                        {visibleRows.length} records
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="p-3 sm:p-4">
                    <Table
                      columns={["Date", "Total Class", "Subject", "Teacher", "Status"]}
                      data={visibleRows}
                      cellRenderers={{
                        Date: (r) => (
                          <span className="flex items-center gap-1 text-xs text-slate-600">
                            <FiCalendar size={12} />
                            {r.Date}
                          </span>
                        ),
                        "Total Class": (r) => (
                          <span className="inline-flex items-center rounded-full bg-slate -10 px-2.5 py-1 text-[10px] font-medium text-slate-700">
                            {r.TotalClass}
                          </span>
                        ),
                        Subject: (r) => (
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
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
                          const isPresent = r.Status === "present";
                          const isLate = r.Status === "late";

                          const Icon = isPresent
                            ? FiCheckCircle
                            : isLate
                            ? FiClock
                            : FiXCircle;

                          const classes = isPresent
                            ? "bg-emerald-50 text-emerald-700"
                            : isLate
                            ? "bg-orange-50 text-orange-600"
                            : "bg-rose-50 text-rose-700";

                          return (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${classes}`}
                            >
                              <Icon size={12} />
                              {r.Status}
                            </span>
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailsView;
