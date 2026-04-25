import { formatDate } from "./teacherSpecialUtils";
import {
  FiCalendar,
  FiBookOpen,
  FiUser,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const TeacherSpecialRecentSessions = ({ recentSessions }) => {
  if (recentSessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500 shadow-sm">
        No attendance sessions saved yet. Use the save record button to mark
        today&apos;s class and populate this dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentSessions.map((session) => (
        <article
          key={session.key}
          className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          {/* TOP */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                <FiCalendar />
                {formatDate(session.date)}
              </p>

              <p className="flex items-center gap-2 text-xs text-slate-400">
                <FiBookOpen />
                {session.subject}
                <span>·</span>
                <FiUser />
                {session.teacherName}
              </p>
            </div>

            <p className="text-lg font-bold text-emerald-600">
              {session.percent}%
            </p>
          </div>

          {/* PROGRESS */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${session.percent}%` }}
            />
          </div>

          {/* STATS */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">

            {/* Total */}
            <div className="rounded-xl bg-slate-50 px-2 py-2">
              <p className="flex items-center justify-center gap-1 text-slate-400">
                <FiUsers />
                Total
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {session.total}
              </p>
            </div>

            {/* Present */}
            <div className="rounded-xl bg-slate-50 px-2 py-2">
              <p className="flex items-center justify-center gap-1 text-slate-400">
                <FiCheckCircle />
                Present
              </p>
              <p className="mt-1 font-semibold text-emerald-600">
                {session.present}
              </p>
            </div>

            {/* Absent */}
            <div className="rounded-xl bg-slate-50 px-2 py-2">
              <p className="flex items-center justify-center gap-1 text-slate-400">
                <FiXCircle />
                Absent
              </p>
              <p className="mt-1 font-semibold text-rose-600">
                {session.absent}
              </p>
            </div>

          </div>
        </article>
      ))}
    </div>
  );
};

export default TeacherSpecialRecentSessions;