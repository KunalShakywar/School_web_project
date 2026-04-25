import { FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";

const AttendanceStudentGrid = ({ students, loadingStudents, onToggle }) => {
  return (
    <div className="mb-6">

      {/* EMPTY STATE */}
      {students.length === 0 && !loadingStudents && (
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <FiUser />
          No students found
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {students.map((student) => {
          const isPresent = student.present;

          return (
            <div
              key={student.id}
              onClick={() => onToggle(student.id)}
              className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-3 shadow-sm transition-all duration-200
              
              ${
                isPresent
                  ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-white"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }
              
              hover:shadow-md active:scale-[0.98]
              `}
            >
              {/* LEFT */}
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full
                  ${
                    isPresent
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <FiUser size={16} />
                </div>

                <div className="flex flex-col min-w-0">
                  {/* NAME */}
                  <span
                    className={`truncate text-sm font-semibold
                    ${
                      isPresent
                        ? "text-emerald-800"
                        : "text-slate-800"
                    }`}
                  >
                    {student.name}
                  </span>

                  {/* ROLL */}
                  {student.roll && (
                    <span className="text-xs text-slate-400">
                      Roll #{student.roll}
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">

                {/* STATUS BADGE */}
                <span
                  className={`hidden sm:inline text-[10px] px-2 py-1 rounded-full font-medium
                  ${
                    isPresent
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isPresent ? "Present" : "Absent"}
                </span>

                {/* ICON */}
                {isPresent ? (
                  <FiCheckCircle className="text-emerald-600" />
                ) : (
                  <FiXCircle className="text-slate-400" />
                )}

                {/* CHECKBOX */}
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isPresent}
                  onChange={() => onToggle(student.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceStudentGrid;