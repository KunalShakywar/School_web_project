import ProfileImage from "../../components/ProfileImage";

const StudentProfileCard = ({
  profile,
  studentRoll,
  studentClass,
  attendancePercent,
  attendancePercentLabel,
  studentId,
  onAttendanceClick,
  onProgressClick,
}) => {
  const displayId = studentRoll !== "N/A" ? studentRoll : studentId || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-500/40 via-blue-800 to-gray-900 shadow-sm">
        <div className="absolute inset-0 z-0 flex select-none items-center justify-center pointer-events-none">
          <span
            className="whitespace-nowrap text-4xl font-medium tracking-widest text-slate-100"
            style={{ transform: "rotate(-30deg)" }}
          >
            Kunal
          </span>
        </div>



        <div className="relative z-10">
          <div className="flex items-center gap-4 px-5 pb-4 pt-5">
            <ProfileImage
              src="https://imgs.search.brave.com/Y2AaSAVYgFZaa80GypqtugaJDEjtIRvDSUV7G43fvDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu..."
              alt="Student"
              className="h-14 w-14 shrink-0 rounded-full border-2 border-blue-100 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {profile.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Roll No: {studentRoll}
              </p>
              <p className="text-xs text-slate-400">Class: {studentClass}</p>
              <p className="truncate text-xs text-slate-400">
                {profile.email || "No email available"}
              </p>
            </div>
            <span className="shrink-0 self-start rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              Active
            </span>
          </div>

          <div className="mx-5 h-px bg-slate-100" />

          <div className="grid grid-cols-2 gap-2.5 px-5 py-4">
            <button
              type="button"
              onClick={onAttendanceClick}
              className="cursor-pointer rounded-xl border border-transparent bg-slate-50 p-3.5 text-left transition-all hover:border-green-200 hover:bg-green-50"
            >
              <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                Attendance
              </p>
              <p className="mb-2 text-xl font-medium text-green-700">
                {attendancePercentLabel}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${attendancePercent}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">Tap to view</p>
            </button>

            <button
              type="button"
              onClick={onProgressClick}
              className="cursor-pointer rounded-xl border border-transparent bg-slate-50 p-3.5 text-left transition-all hover:border-blue-200 hover:bg-blue-50"
            >
              <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                Progress
              </p>
              <p className="mb-2 text-xl font-medium text-blue-700">55.4%</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: "55.4%" }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">Tap to view</p>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 px-5 pb-4">
            {[
              { val: studentClass, lbl: "Class" },
              { val: "2024–25", lbl: "Session" },
              { val: profile.stream || "Science", lbl: "Stream" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="rounded-xl bg-slate-50 px-2 py-3 text-center">
                <p className="truncate text-sm font-medium text-slate-800">
                  {val}
                </p>
                <p className="text-xs text-slate-400">{lbl}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <span className="text-xs text-slate-400">ID: {displayId}</span>
            <div className="flex gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
