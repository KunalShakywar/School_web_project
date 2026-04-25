import { FiEdit3, FiPlus, FiSave, FiTrash2 } from "react-icons/fi";

function CurriculumSubjectManager({
  classForm,
  subjectForm,
  setSubjectForm,
  editingSubjectIndex,
  onSaveSubject,
  onEditSubject,
  onDeleteSubject,
}) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Subjects</h3>
          <p className="text-xs text-slate-500">
            Add each subject with topics, assessment and resources.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          {classForm.subjects.length} added
        </span>
      </div>

      <div className="mt-4 grid gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Subject Name
          </span>
          <input
            value={subjectForm.name}
            onChange={(e) => setSubjectForm((current) => ({ ...current, name: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="Mathematics"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Units / Topics
            </span>
            <textarea
              value={subjectForm.units}
              onChange={(e) => setSubjectForm((current) => ({ ...current, units: e.target.value }))}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
              placeholder="Algebra, Geometry, Trigonometry"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Assessment
            </span>
            <textarea
              value={subjectForm.assessment}
              onChange={(e) => setSubjectForm((current) => ({ ...current, assessment: e.target.value }))}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
              placeholder="Chapter test and workbook"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Resources</span>
            <input
              value={subjectForm.resources}
              onChange={(e) => setSubjectForm((current) => ({ ...current, resources: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
              placeholder="Textbook, Worksheet"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Notes</span>
            <input
              value={subjectForm.notes}
              onChange={(e) => setSubjectForm((current) => ({ ...current, notes: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
              placeholder="Focus on problem solving"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSaveSubject}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {editingSubjectIndex !== null ? <FiSave /> : <FiPlus />}
            {editingSubjectIndex !== null ? "Update Subject" : "Add Subject"}
          </button>
        </div>
      </div>

      {classForm.subjects.length > 0 && (
        <div className="mt-6 space-y-3">
          {classForm.subjects.map((subject, index) => (
            <div
              key={`${subject.name}-${index}`}
              className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{subject.name}</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {subject.units.join(", ") || "No units added"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEditSubject(index)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <FiEdit3 />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteSubject(index)}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurriculumSubjectManager;
