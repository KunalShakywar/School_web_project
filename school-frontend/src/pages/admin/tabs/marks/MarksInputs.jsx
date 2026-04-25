import { FaPlus, FaSearch, FaUserPlus } from "react-icons/fa";
import { nameInputId, rollInputId, subjectInputId } from "./marksData.jsx";

function MarksInputs({
  newStudent,
  setNewStudent,
  newSubject,
  setNewSubject,
  addStudent,
  addSubject,
  search,
  setSearch,
}) {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          id={rollInputId}
          type="text"
          value={newStudent.roll}
          onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
          placeholder="Roll No."
          className="min-w-[180px] flex-1 rounded border px-3 py-2 dark:bg-gray-800"
        />

        <input
          id={nameInputId}
          type="text"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          placeholder="Student Name"
          className="min-w-[220px] flex-1 rounded border px-3 py-2 dark:bg-gray-800"
        />

        <button
          onClick={addStudent}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <FaUserPlus />
          <span className="hidden md:inline">Add Student</span>
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          id={subjectInputId}
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="New Subject"
          className="min-w-[200px] flex-1 rounded border px-3 py-2 dark:bg-gray-800"
        />

        <button
          onClick={addSubject}
          className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <FaPlus />
          <span className="hidden md:inline">Add Subject</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="w-full rounded border px-3 py-2 pl-10 dark:bg-gray-800"
          />
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </>
  );
}

export default MarksInputs;
