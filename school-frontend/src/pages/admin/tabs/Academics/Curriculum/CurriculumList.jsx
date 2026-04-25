import { FiCalendar, FiEdit3, FiTrash2 } from "react-icons/fi";

function CurriculumList({ curriculum, onEditClass, onDeleteClass }) {
  return (
    <div className="space-y-4">
      {curriculum.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <FiCalendar size={12} />
                {item.session}
              </p>
              <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                {item.className}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                {item.description || "No description added."}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-white">Coordinator:</span>{" "}
                {item.coordinator || "Not set"}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-white">Exam Pattern:</span>{" "}
                {item.examPattern || "Not set"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEditClass(item)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <FiEdit3 />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteClass(item.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {item.subjects.map((subject, index) => (
              <div
                key={`${item.id}-${subject.name}-${index}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/60"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white">{subject.name}</h4>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                  {subject.units.join(", ") || "No units added"}
                </p>
                {subject.assessment && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-white">Assessment:</span>{" "}
                    {subject.assessment}
                  </p>
                )}
                {subject.resources.length > 0 && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-white">Resources:</span>{" "}
                    {subject.resources.join(", ")}
                  </p>
                )}
                {subject.notes && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-white">Notes:</span>{" "}
                    {subject.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CurriculumList;
