import { FiLayers, FiUsers, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const TeacherSpecialAttendanceView = ({
  totalSessions,
  totalStudentsMarked,
  totalPresentMarked,
  overallPercent,
}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      
      {/* HEADER */}
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <FiTrendingUp />
        Attendance health
      </p>

      <h2 className="mt-2 text-xl font-bold text-slate-900">
        Live sync ready
      </h2>

      {/* STATS */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        {/* Sessions */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wide">
            <FiLayers />
            Sessions
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalSessions}
          </p>
        </div>

        {/* Students */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wide">
            <FiUsers />
            Students
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {totalStudentsMarked}
          </p>
        </div>

        {/* Present */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wide">
            <FiCheckCircle />
            Present
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {totalPresentMarked}
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <FiTrendingUp />
            Overall attendance
          </span>
          <span className="font-semibold text-slate-900">
            {overallPercent}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default TeacherSpecialAttendanceView;