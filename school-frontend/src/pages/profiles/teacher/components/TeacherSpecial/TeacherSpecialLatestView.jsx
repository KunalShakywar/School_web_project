import { Link } from "react-router-dom";
import { formatDate } from "./teacherSpecialUtils";
import {
  FiCalendar,
  FiBookOpen,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiSave,
  FiEye,
  FiArrowLeft,
} from "react-icons/fi";

const TeacherSpecialLatestView = ({
  latestSession,
  latestSummary,
  onShowAttendance,
  onShowSummary,
}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* HEADER */}
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <FiCalendar />
        Latest session
      </p>

      <h2 className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
        {latestSession ? formatDate(latestSession.date) : "No saved session"}
      </h2>

      {/* INFO */}
      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
        <FiBookOpen />
        Subject: {latestSession?.subject || "N/A"}
      </p>

      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
        <FiUser />
        Teacher: {latestSession?.teacherName || "N/A"}
      </p>

      {/* STATS */}
      <div className="mt-5 grid grid-cols-3 gap-3">

        {/* Present */}
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
            <FiCheckCircle />
            Present
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-600">
            {latestSummary.present}
          </p>
        </div>

        {/* Absent */}
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
            <FiXCircle />
            Absent
          </p>
          <p className="mt-2 text-lg font-semibold text-rose-600">
            {latestSummary.absent}
          </p>
        </div>

        {/* Rate */}
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
            <FiBarChart2 />
            Rate
          </p>
          <p className="mt-2 text-lg font-semibold text-blue-600">
            {latestSummary.percent}%
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${latestSummary.percent}%` }}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-5 grid gap-2 sm:grid-cols-3">

        <Link
          to="/students_attendance"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          <FiSave />
          Save
        </Link>

        <button
          onClick={onShowAttendance}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
        >
          <FiEye />
          View
        </button>

        <button
          onClick={onShowSummary}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
        >
          <FiArrowLeft />
          Back
        </button>

      </div>
    </section>
  );
};

export default TeacherSpecialLatestView;