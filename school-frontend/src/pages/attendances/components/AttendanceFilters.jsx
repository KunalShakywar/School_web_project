import { FiCalendar, FiBookOpen, FiUser } from "react-icons/fi";

const AttendanceFilters = ({
  date,
  subject,
  teacherName,
  onDateChange,
  onSubjectChange,
  onTeacherNameChange,
  teacherSubject = "",
  teacherLocked = false,
  subjectLocked = false,
}) => {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {/* DATE */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="flex items-center gap-2 text-slate-500">
          <FiCalendar />
          Date
        </span>

        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </label>

      {/* SUBJECT (Context fallback added) */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="flex items-center gap-2 text-slate-500">
          <FiBookOpen />
          Subject
        </span>

        <input
          type="text"
          readOnly={subjectLocked}
          aria-readonly={subjectLocked}
          value={subject || teacherSubject || ""}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Subject name"
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        {subjectLocked && (
          <span className="text-xs text-slate-400">
            This is linked to your teacher profile.
          </span>
        )}
      </label>

      {/* TEACHER (Context fallback added) */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="flex items-center gap-2 text-slate-500">
          <FiUser />
          Teacher
        </span>

        <input
          type="text"
          value={teacherName || ""}
          onChange={(e) => onTeacherNameChange(e.target.value)}
          placeholder="Teacher name"
          readOnly={teacherLocked}
          aria-readonly={teacherLocked}
          title={teacherLocked ? "Linked to the logged-in teacher" : undefined}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />

        {teacherLocked && (
          <span className="text-xs text-slate-400">
            This is tied to your teacher login.
          </span>
        )}
      </label>

    </div>
  );
};

export default AttendanceFilters;
