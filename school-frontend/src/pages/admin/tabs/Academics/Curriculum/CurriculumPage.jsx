import CurriculumHeader from "./CurriculumHeader.jsx";
import CurriculumClassForm from "./CurriculumClassForm.jsx";
import CurriculumList from "./CurriculumList.jsx";
import { useCurriculumEditor } from "./useCurriculumEditor.js";

function CurriculumPage() {
  const {
    normalizedCurriculum,
    totalSubjects,
    loading,
    error,
    classForm,
    setClassForm,
    subjectForm,
    setSubjectForm,
    editingClassId,
    editingSubjectIndex,
    resetForms,
    handleEditClass,
    handleDeleteClass,
    handleSaveClass,
    handleSaveSubject,
    handleEditSubject,
    handleDeleteSubject,
  } = useCurriculumEditor();

  return (
    <div className="mx-auto max-w-7xl">
      <CurriculumHeader
        classesCount={normalizedCurriculum.length}
        totalSubjects={totalSubjects}
      />

      {loading && <p className="mb-4 text-sm text-slate-500">Loading curriculum...</p>}
      {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <CurriculumClassForm
          classForm={classForm}
          setClassForm={setClassForm}
          subjectForm={subjectForm}
          setSubjectForm={setSubjectForm}
          editingClassId={editingClassId}
          editingSubjectIndex={editingSubjectIndex}
          onResetForms={resetForms}
          onSaveClass={handleSaveClass}
          onSaveSubject={handleSaveSubject}
          onEditSubject={handleEditSubject}
          onDeleteSubject={handleDeleteSubject}
        />

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Notes</h3>
            <p className="mt-2 text-sm text-slate-500">
              Keep the class list updated whenever subjects or exam pattern changes.
            </p>
          </div>

          <CurriculumList
            curriculum={normalizedCurriculum}
            onEditClass={handleEditClass}
            onDeleteClass={handleDeleteClass}
          />
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
