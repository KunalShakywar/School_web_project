import { useMemo, useState } from "react";
import TeacherSpecialRecentSessionTabs from "./TeacherSpecialRecentSessionTabs";
import TeacherSpecialRecentSessions from "./TeacherSpecialRecentSessions";
import { filterRecentSavedSessions } from "./teacherSpecialUtils";
import { FiClock, FiDatabase } from "react-icons/fi";

const TeacherSpecialSidebar = ({
  recentSessions,
  onRefresh,
  onShowLatest,
  onShowSummary,
  onShowAttendance,
}) => {
  const [activeRecentTab, setActiveRecentTab] = useState("all");

  const visibleRecentSessions = useMemo(
    () =>
      filterRecentSavedSessions(recentSessions, activeRecentTab).slice(0, 4),
    [activeRecentTab, recentSessions]
  );

  return (
    <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

      {/* HEADER */}
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <FiClock />
          Recent sessions
        </p>

        <h2 className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
          <FiDatabase />
          Saved records
        </h2>
      </div>

      {/* TABS + LIST */}
      <div className="space-y-3">
        <TeacherSpecialRecentSessionTabs
          activeTab={activeRecentTab}
          onChange={setActiveRecentTab}
        />

        <TeacherSpecialRecentSessions
          recentSessions={visibleRecentSessions}
        />
      </div>

    </aside>
  );
};

export default TeacherSpecialSidebar;