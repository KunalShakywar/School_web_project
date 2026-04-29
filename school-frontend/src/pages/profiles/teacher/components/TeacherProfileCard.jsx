import ProfileImage from "../../components/ProfileImage";
import { Link } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";

const TeacherProfileCard = ({ profile, teacherId }) => {
  const teacherRole = profile.role || "Teacher";
  const teacherSubject = profile.subject || profile.department || "N/A";
  const teacherClass = profile.className || profile.classTeacher || "N/A";
  const teacherEmail = profile.email || "No email available";
  const teacherAttendanceRate = profile.attendanceRate ?? 0;
  const teacherProgressRate = profile.progressRate ?? 0;
  const displayId = profile.employeeId || profile.rollNumber || teacherId || "N/A";
  const avatarSrc =
    profile.image ||
    profile.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.name || "Teacher"
    )}&background=random`;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border  border-slate-200 bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 shadow-sm">
        <div className="relative z-10">
          <div className="flex items-center gap-4 px-5 pb-4 pt-5">
            <ProfileImage
              src={avatarSrc}
              alt={profile.name || "Teacher"}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-blue-100 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {profile.name || "Teacher"}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Role: {teacherRole}
              </p>
              <p className="text-xs text-slate-400">Subject: {teacherSubject}</p>
              <p className="truncate text-xs text-slate-400">{teacherEmail}</p>
            </div>
            <span className="shrink-0 self-start rounded-full   border border-green-400 bg-green-800/40 px-2.5 py-1 text-xs font-medium text-green-500">
              Active
            </span>
          </div>

          <div className="mx-5 h-px bg-slate-100" />

          <div className="grid grid-cols-2 gap-2.5 px-5 py-4">
            <div className="rounded-xl border border-transparent bg-slate-50 p-3.5">
              <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                Attendance
              </p>
              <p className="mb-2 text-xl font-medium text-green-700">
                {teacherAttendanceRate}%
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${teacherAttendanceRate}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">Attendance rate</p>
            </div>
{/* Special option only teacher wait for implementaion*/}
            <div className="rounded-xl border border-transparent bg-slate-50 p-3.5">
              <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                Classroom
              </p>
            
                <Link
                  to="/teacher/teacherspecial"
                  className="text-blue-700 transition hover:text-blue-800"
                >
             <SiGoogleclassroom size={40} />
                </Link>
         
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 px-5 pb-4">
            {[
              { val: teacherSubject, lbl: "Subject" },
              { val: teacherClass, lbl: "Class" },
              { val: profile.department || "N/A", lbl: "Dept" },
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
            <span className="text-xs text-slate-400">ID: {teacherEmail}</span>
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

export default TeacherProfileCard;
