import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  getTeacherAttendanceContext,
  listAttendanceRecords,
} from "../../../../utils/attendanceStorage";
import TeacherSpecialTabs from "./TeacherSpecial/TeacherSpecialTabs";
import TeacherSpecialSummaryView from "./TeacherSpecial/TeacherSpecialSummaryView";
import TeacherSpecialLatestView from "./TeacherSpecial/TeacherSpecialLatestView";
import TeacherSpecialAttendanceView from "./TeacherSpecial/TeacherSpecialAttendanceView";
import TeacherSpecialSidebar from "./TeacherSpecial/TeacherSpecialSidebar";
import { getSessionSummary } from "./TeacherSpecial/teacherSpecialUtils";
import { FiRefreshCw, FiCheckCircle } from "react-icons/fi";
const TeacherSpecial = () => {
  const { user } = useAuth();
  const { teacherIdentifier, teacherName } = useMemo(
    () => getTeacherAttendanceContext(user),
    [user]
  );
  const [attendanceSessions, setAttendanceSessions] = useState(() =>
    listAttendanceRecords({ teacherIdentifier, teacherName })
  );
  const [activeView, setActiveView] = useState("summary");

  useEffect(() => {
    setAttendanceSessions(
      listAttendanceRecords({ teacherIdentifier, teacherName })
    );
  }, [teacherIdentifier, teacherName]);

  const latestSession = attendanceSessions[0]?.record ?? null;
  const latestSummary = getSessionSummary(latestSession);
  const savedSessions = attendanceSessions.map(({ key, record }) => ({
    key,
    ...getSessionSummary(record),
    date: record?.date,
    subject: record?.subject || "N/A",
    teacherName: record?.teacherName || "N/A",
  }));

  const totalSessions = attendanceSessions.length;
  const totalStudentsMarked = attendanceSessions.reduce(
    (sum, { record }) => sum + getSessionSummary(record).total,
    0
  );
  const totalPresentMarked = attendanceSessions.reduce(
    (sum, { record }) => sum + getSessionSummary(record).present,
    0
  );
  const overallPercent =
    totalStudentsMarked === 0
      ? 0
      : Math.round((totalPresentMarked / totalStudentsMarked) * 100);

  const refreshSessions = () => {
    setAttendanceSessions(
      listAttendanceRecords({ teacherIdentifier, teacherName })
    );
  };

  const handleViewLatest = () => {
    setActiveView("latest");
  };

  const handleViewSummary = () => {
    setActiveView("summary");
  };

  const handleViewAttendance = () => {
    setActiveView("attendance");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-6xl space-y-6 ">
        <div className="grid gap-4  rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:gap-6">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Classroom Command
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Link
              to="/students_attendance"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              <FiCheckCircle className="text-lg" />
              <span className="uppercase">Mark</span>
            </Link>
            <button
              type="button"
              onClick={refreshSessions}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            >
              <FiRefreshCw className="text-lg" />
              <span className="uppercase">Refresh</span>
            </button>
          </div>
        </div>
        <TeacherSpecialTabs activeView={activeView} onChange={setActiveView} />

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="space-y-6">
            {activeView === "summary" && (
              <TeacherSpecialSummaryView
                totalSessions={totalSessions}
                overallPercent={overallPercent}
                latestSummary={latestSummary}
                latestSession={latestSession}
              />
            )}

            {activeView === "latest" && (
              <TeacherSpecialLatestView
                latestSession={latestSession}
                latestSummary={latestSummary}
                onShowAttendance={handleViewAttendance}
                onShowSummary={handleViewSummary}
              />
            )}

            {activeView === "attendance" && (
              <TeacherSpecialAttendanceView
                totalSessions={totalSessions}
                totalStudentsMarked={totalStudentsMarked}
                totalPresentMarked={totalPresentMarked}
                overallPercent={overallPercent}
              />
            )}
          </div>

          <TeacherSpecialSidebar
            recentSessions={savedSessions}
            onRefresh={refreshSessions}
            onShowLatest={handleViewLatest}
            onShowSummary={handleViewSummary}
            onShowAttendance={handleViewAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherSpecial;
