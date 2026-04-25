import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Table from "../../components/table/Table";

type Subject = {
  subject: string;
  marks: number;
};

type Student = {
  id: number;
  name: string;
  className: string;
  roll: number;
  subjects: Subject[];
};

const studentsData: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    className: "Class 10",
    roll: 12,
    subjects: [
      { subject: "Maths", marks: 88 },
      { subject: "Science", marks: 91 },
      { subject: "English", marks: 79 },
    ],
  },
  {
    id: 2,
    name: "Priya Verma",
    className: "Class 10",
    roll: 15,
    subjects: [
      { subject: "Maths", marks: 95 },
      { subject: "Science", marks: 89 },
      { subject: "English", marks: 92 },
    ],
  },
];

function Result() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  //If student selected show result
  if (selectedStudent) {
    const total = selectedStudent.subjects.reduce(
      (sum, s) => sum + s.marks,
      0
    );

    const percentage =
      (total / (selectedStudent.subjects.length * 100)) * 100;

    return (
      <div className="pt-28">

        <div className="max-w-3xl mx-auto bg-white/10 
          text-gray-800 dark:text-gray-200 
          shadow-2xl rounded-2xl p-8 pt-28">

          <button
            onClick={() => setSelectedStudent(null)}
            className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            <IoIosArrowBack />

          </button>

          <h2 className="text-2xl font-bold mb-4">
            {selectedStudent.name}
          </h2>

          <p><strong>Class:</strong> {selectedStudent.className}</p>
          <p><strong>Roll:</strong> {selectedStudent.roll}</p>

          <Table
            title="Results"
            subtitle={selectedStudent.className}
            showSearch={false}
            showPagination={false}
            data={selectedStudent.subjects}
            columns={[
              { key: "subject", label: "Subject" },
              { key: "marks", label: "Marks" },
            ]}
          />

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <p><strong>Total:</strong> {total}</p>
            <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
            <p>
              <strong>Status:</strong>{" "}
              {percentage >= 40 ? (
                <span className="text-green-500">Pass</span>
              ) : (
                <span className="text-red-500">Fail</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default view show student cards
  return (
    <div className="pt-28">

      <h1 className="text-3xl font-bold text-center mb-10 
        text-gray-800 dark:text-gray-200">
        Student Results
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {studentsData.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="bg-white/10 
              text-gray-800 dark:text-gray-200 border border-stone-50
              p-6 rounded-2xl shadow-xl cursor-pointer 
              hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {student.name}
            </h2>
            <p>Class: {student.className}</p>
            <p>Roll: {student.roll}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
