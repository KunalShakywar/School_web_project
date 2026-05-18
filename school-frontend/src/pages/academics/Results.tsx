import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";

type Subject = {
  subject: string;
  marks: number;
};

type Student = {
  _id?: string;
  id?: number;
  name: string;
  className: string;
  roll: number;
  subjects: Subject[];
};

const API_URL = import.meta.env.VITE_API_URL;

function Result() {
  const [results, setResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const endpoint = API_URL
          ? `${API_URL}/api/results/all`
          : "/api/results/all";
        const response = await axios.get(endpoint);

        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log(err);
        setError("Results backend se load nahi ho paaye.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const resultColumns: Array<{ key: keyof Subject; label: string }> = [
    { key: "subject", label: "Subject" },
    { key: "marks", label: "Marks" },
  ];

  if (loading) {
    return (
      <div className="">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white/10 p-8 text-center shadow-2xl text-gray-800 dark:text-gray-200">
          Loading results...
        </div>
      </div>
    );
  }

  //If student selected show result
  if (selectedStudent) {
    const total = selectedStudent.subjects.reduce(
      (sum, s) => sum + s.marks,
      0
    );

    const percentage =
      selectedStudent.subjects.length > 0
        ? (total / (selectedStudent.subjects.length * 100)) * 100
        : 0;

    return (
      <div className="">
        <div
          className="max-w-3xl mx-auto bg-white/10 
          text-gray-800 dark:text-gray-200 
          shadow-2xl rounded-2xl p-8"
        >
          <button
            onClick={() => setSelectedStudent(null)}
            className="mb-6 rounded-lg bg-gray-200 px-4 py-2 dark:bg-gray-700"
          >
            Back
          </button>

          <h2 className="mb-4 text-2xl font-bold">{selectedStudent.name}</h2>

          <p><strong>Class:</strong> {selectedStudent.className}</p>
          <p><strong>Roll:</strong> {selectedStudent.roll}</p>

          <Table
            title="Results"
            subtitle={selectedStudent.className}
            showSearch={false}
            showPagination={false}
            data={selectedStudent.subjects}
            columns={resultColumns}
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
    <div className="">
      <h1
        className="text-3xl font-bold text-center mb-10 
        text-gray-800 dark:text-gray-200"
      >
        Student Results
      </h1>

      {error ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      ) : results.length === 0 ? (
        <div className="mx-auto max-w-3xl rounded-2xl bg-white/10 p-6 text-center text-gray-800 shadow-xl dark:text-gray-200">
          Abhi koi result available nahi hai.
        </div>
      ) : (
        <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {results.map((student) => (
            <button
              key={student._id ?? student.id ?? student.roll}
              type="button"
              onClick={() => setSelectedStudent(student)}
              className="rounded-2xl border border-stone-50 bg-white/10 p-6 text-left shadow-xl transition hover:scale-105 text-gray-800 dark:text-gray-200"
            >
              <h2 className="mb-2 text-xl font-semibold">{student.name}</h2>
              <p>Class: {student.className}</p>
              <p>Roll: {student.roll}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;
