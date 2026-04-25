import { FiBookOpen, FiCalendar, FiLayers } from "react-icons/fi";

function CurriculumHeader({ classesCount, totalSubjects }) {
  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
            <FiBookOpen size={14} />
            Dashboard Update
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Add or edit syllabus details here. Saving will update the public curriculum page immediately.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-slate-800/60">
            <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
              <FiLayers size={12} />
              Classes
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{classesCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-slate-800/60">
            <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
              <FiCalendar size={12} />
              Subjects
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{totalSubjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurriculumHeader;
