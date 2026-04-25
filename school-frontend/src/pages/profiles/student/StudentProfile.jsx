import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import AttendanceDetailsView from "./components/AttendanceDetailsView";
import ProgressDetailsView from "./components/ProgressDetailsView";
import StudentProfileCard from "./components/StudentProfileCard";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [selectedProgress, setSelectedProgress] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState("");
  const [attendanceRefreshKey, setAttendanceRefreshKey] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();
  const authUserId = user?.id || user?._id;
  const studentId = id || profile?._id;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleAttendanceRefresh = () =>
    setAttendanceRefreshKey((prev) => prev + 1);

  const totalAttendanceDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(
    (record) => (record.status ?? "").toLowerCase() === "present"
  ).length;
  const absentDays = totalAttendanceDays - presentDays;
  const attendancePercent =
    totalAttendanceDays === 0
      ? 0
      : Math.round((presentDays / totalAttendanceDays) * 100);
  const recentRecords = attendanceRecords.slice(0, 10);
  const studentRoll = profile?.rollNumber ?? profile?.roll ?? "N/A";
  const studentClass = profile?.className ?? profile?.class ?? "N/A";
  const attendancePercentLabel = `${attendancePercent}%`;
  const groupedAttendance = recentRecords.reduce((groups, record) => {
    const parsedDate = new Date(record.date);
    const dateLabel = Number.isNaN(parsedDate.getTime())
      ? "Unknown date"
      : parsedDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
    const existingGroup = groups.find((group) => group.dateLabel === dateLabel);
    if (existingGroup) {
      existingGroup.records.push(record);
      return groups;
    }
    groups.push({ dateLabel, records: [record] });
    return groups;
  }, []);

  useEffect(() => {
    const requestUrl = id
      ? `${apiUrl}/api/student/${id}`
      : authUserId
      ? `${apiUrl}/api/student/user/${authUserId}`
      : null;

    if (!requestUrl) return;

    axios
      .get(requestUrl)
      .then((res) => {
        const student = res.data?.data ?? res.data;
        if (student) {
          setProfile(student);
        }
        setProfileError("");
      })
      .catch((err) => {
        console.error("Student profile fetch error:", err);
        setProfile(null);
        if (err?.response?.status === 404) {
          setProfileError("No student profile is linked to this login yet.");
          return;
        }
        setProfileError("Unable to load student profile.");
      });
  }, [apiUrl, authUserId, id]);

  useEffect(() => {
    const requestUrl = id
      ? `${apiUrl}/api/student/attendance/${id}`
      : authUserId
      ? `${apiUrl}/api/student/attendance/user/${authUserId}`
      : null;

    if (!requestUrl) {
      return undefined;
    }

    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setAttendanceLoading(true);
      setAttendanceError("");
      setAttendanceRecords([]);

      axios
        .get(requestUrl)
        .then((res) => {
          if (cancelled) return;
          setAttendanceRecords(res.data?.data ?? []);
          setProfile((current) => current ?? res.data?.student ?? current);
        })
        .catch((error) => {
          if (cancelled) return;
          console.error("Student attendance fetch error:", error);
          if (error?.response?.status === 404) {
            setAttendanceError(
              "No attendance record is linked to this login yet."
            );
            return;
          }
          setAttendanceError("Unable to load attendance history.");
        })
        .finally(() => {
          if (!cancelled) {
            setAttendanceLoading(false);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [apiUrl, attendanceRefreshKey, authUserId, id]);

  if (!profile && !profileError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Student Profile Unavailable
          </h2>
          <p className="mt-2 text-sm text-slate-500">{profileError}</p>
        </div>
      </div>
    );
  }

  if (selectedAttendance) {
    return (
      <AttendanceDetailsView
        profile={profile}
        attendanceLoading={attendanceLoading}
        attendanceError={attendanceError}
        recentRecords={recentRecords}
        groupedAttendance={groupedAttendance}
        attendanceRecords={attendanceRecords}
        presentDays={presentDays}
        absentDays={absentDays}
        totalAttendanceDays={totalAttendanceDays}
        attendancePercent={attendancePercent}
        onBack={() => setSelectedAttendance(false)}
        onRefresh={handleAttendanceRefresh}
        refreshDisabled={attendanceLoading}
      />
    );
  }

  if (selectedProgress) {
    return (
      <ProgressDetailsView
        profile={profile}
        onBack={() => setSelectedProgress(false)}
      />
    );
  }

  return (
    <StudentProfileCard
      profile={profile}
      studentRoll={studentRoll}
      studentClass={studentClass}
      attendancePercent={attendancePercent}
      attendancePercentLabel={attendancePercentLabel}
      studentId={studentId}
      onAttendanceClick={() => setSelectedAttendance(true)}
      onProgressClick={() => setSelectedProgress(true)}
    />
  );
};

export default StudentProfile;
