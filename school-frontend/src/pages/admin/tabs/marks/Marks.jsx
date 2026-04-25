import { useMemo, useState } from "react";
import { FaUsers } from "react-icons/fa";
import MarksInputs from "./MarksInputs.jsx";
import MarksTable from "./MarksTable.jsx";
import MarksToolbar from "./MarksToolbar.jsx";
import { useMarks } from "./useMarks.js";

function MarksManager() {
  const {
    subjects,
    students,
    newStudent,
    setNewStudent,
    newSubject,
    setNewSubject,
    undo,
    restoreData,
    addStudent,
    deleteStudent,
    updateMarks,
    updateLink,
    addSubject,
    removeSubject,
    exportPDF,
    submitServer,
    totalMarks,
    percentage,
    grade,
  } = useMarks();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(
    () =>
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.roll.includes(search)
      ),
    [search, students]
  );

  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = filtered.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  return (
    <div className="w-full min-w-0 space-y-5 overflow-x-hidden">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          <FaUsers className="text-blue-500" />
          <span>Students: {students.length}</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span>Subjects: {subjects.length}</span>
        </div>
      </div>

      <MarksToolbar
        undo={undo}
        restoreData={restoreData}
        submitServer={submitServer}
      />

      <MarksInputs
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        newSubject={newSubject}
        setNewSubject={setNewSubject}
        addStudent={addStudent}
        addSubject={addSubject}
        search={search}
        setSearch={setSearch}
      />

      <MarksTable
        subjects={subjects}
        students={students}
        currentStudents={currentStudents}
        updateMarks={updateMarks}
        updateLink={updateLink}
        exportPDF={exportPDF}
        removeSubject={removeSubject}
        deleteStudent={deleteStudent}
        totalMarks={totalMarks}
        percentage={percentage}
        grade={grade}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`min-w-[2.5rem] rounded-xl px-3 py-2 text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarksManager;
