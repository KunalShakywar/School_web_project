import { FiSave, FiX } from "react-icons/fi";
import CurriculumSubjectManager from "./CurriculumSubjectManager.jsx";
import { useState } from "react";
function CurriculumClassForm({
  classForm,
  setClassForm,
  subjectForm,
  setSubjectForm,
  editingClassId,
  editingSubjectIndex,
  onResetForms,
  onSaveClass,
  onSaveSubject,
  onEditSubject,
  onDeleteSubject,
}) {
  const [open, setOpen] = useState(false);
  return (
    <form
      onSubmit={onSaveClass}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingClassId ? "Edit Class" : "Add Class"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create the class card and attach subject-level details.
          </p>
        </div>

        {editingClassId && (
          <button
            type="button"
            onClick={onResetForms}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <FiX />
            Cancel
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Class Name
          </span>
          <input
            value={classForm.className}
            onChange={(e) => setClassForm((current) => ({ ...current, className: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="Class 10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Session</span>
          <input
            value={classForm.session}
            onChange={(e) => setClassForm((current) => ({ ...current, session: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="2025-26"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Coordinator</span>
          <input
            value={classForm.coordinator}
            onChange={(e) => setClassForm((current) => ({ ...current, coordinator: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="Class teacher / coordinator"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </span>
          <textarea
            value={classForm.description}
            onChange={(e) => setClassForm((current) => ({ ...current, description: e.target.value }))}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="Write a short overview of this class syllabus."
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Exam Pattern
          </span>
          <input
            value={classForm.examPattern}
            onChange={(e) => setClassForm((current) => ({ ...current, examPattern: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-white"
            placeholder="Unit test + term exam"
          />
        </label>
      </div>

{/* Subject */}
<div className=" rounded cursor-pointer">

        {open && ( <div className=" rounded mt-3">
      <CurriculumSubjectManager
        classForm={classForm}
        subjectForm={subjectForm}
        setSubjectForm={setSubjectForm}
        editingSubjectIndex={editingSubjectIndex}
        onSaveSubject={onSaveSubject}
        onEditSubject={onEditSubject}
        onDeleteSubject={onDeleteSubject}
        />
        </div>  )} 
        </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <FiSave />
          {editingClassId ? "Update Class" : "Save Class"}
        </button>
        <button
          type="button"
          onClick={onResetForms}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Reset
        </button>
    <button
  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
  onClick={() => setOpen(!open)}
>
  {open ? "Close" : "Add Subject"}
</button>

      </div>
    </form>
  );
}

export default CurriculumClassForm;
