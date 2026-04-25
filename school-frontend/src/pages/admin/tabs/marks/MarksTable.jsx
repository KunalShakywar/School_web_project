import { FaFilePdf, FaLink, FaTrash } from "react-icons/fa";
import Table from "../../../../components/table/Table";

function MarksTable({
  subjects,
  students,
  currentStudents,
  updateMarks,
  updateLink,
  exportPDF,
  removeSubject,
  deleteStudent,
  totalMarks,
  percentage,
  grade,
}) {
  const columns = [
    { key: "roll", label: "Roll" },
    { key: "name", label: "Name" },
    ...subjects.map((subject) => ({
      key: subject,
      label: subject,
      headerRender: () => (
        <div className="flex items-center justify-center gap-2">
          <span>{subject}</span>
          <button
            onClick={() => removeSubject(subject)}
            className="text-red-500 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
      render: (student) => (
        <input
          type="number"
          min="0"
          max="100"
          value={student.marks[subject] || 0}
          onChange={(e) =>
            updateMarks(student.id, subject, Math.min(100, Math.max(0, e.target.value)))
          }
          className="w-20 rounded border px-2 py-1 text-center dark:bg-gray-800"
        />
      ),
    })),
    { key: "total", label: "Total", render: (student) => totalMarks(student.marks) },
    { key: "percent", label: "%", render: (student) => `${percentage(student.marks)}%` },
    { key: "grade", label: "Grade", render: (student) => grade(percentage(student.marks)) },
    {
      key: "googleLink",
      label: "Link",
      render: (student) => (
        <div>
          <input
            placeholder="Google link"
            value={student.googleLink}
            onChange={(e) => updateLink(student.id, e.target.value)}
            className="w-full rounded border px-2 py-1 dark:bg-gray-800"
          />
          {student.googleLink && (
            <a
              href={student.googleLink}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex justify-center text-blue-500"
            >
              <FaLink />
            </a>
          )}
        </div>
      ),
    },
    {
      key: "pdf",
      label: "PDF",
      render: (student) => (
        <button
          onClick={() => exportPDF(student)}
          className="flex items-center justify-center rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
        >
          <FaFilePdf />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        data={currentStudents}
        showSearch={false}
        showPagination={false}
        actions={(student) => (
          <button
            onClick={() => deleteStudent(student.id)}
            className="flex items-center justify-center rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            <FaTrash />
          </button>
        )}
      />
    </div>
  );
}

export default MarksTable;
