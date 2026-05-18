import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";

const API_URL = import.meta.env.VITE_API_URL;

function Result() {
  const [results, setResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH RESULTS
  const fetchResults = async () => {
    try {
      const endpoint = API_URL
        ? `${API_URL}/api/results/all`
        : "/api/results/all";
      const res = await axios.get(endpoint);
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setError("Results load nahi ho paaye. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
        <div className="rounded-2xl bg-white/90 px-6 py-4 text-slate-700 shadow-lg dark:bg-gray-900 dark:text-slate-200">
          Loading results...
        </div>
      </div>
    );
  }

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBack = () => {
    setSelectedStudent(null);
  };

  const total =
    selectedStudent?.subjects.reduce(
      (sum, s) => sum + s.marks,
      0
    ) || 0;

  const percentage =
    selectedStudent && selectedStudent.subjects.length > 0
      ? (total / (selectedStudent.subjects.length * 100)) * 100
      : 0;

  const resultColumns = [
    { key: "subject", label: "Subject" },
    { key: "marks", label: "Marks" },
  ];

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br
      from-blue-100 to-purple-200
      dark:from-gray-900 dark:to-gray-800 transition"
    >
      <div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        shadow-2xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Result
        </h1>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {!selectedStudent ? (
          <>
            <p className="mb-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Kisi student ka result dekhne ke liye neeche se select karo.
            </p>

            {results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800/40">
                Abhi koi result available nahi hai.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {results.map((student) => (
                  <button
                    key={student._id ?? student.id ?? student.roll}
                    type="button"
                    onClick={() => handleSelectStudent(student)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                  >
                    <p className="text-lg font-semibold">{student.name}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Class: {student.className}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Roll No: {student.roll}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{selectedStudent.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Class: {selectedStudent.className} | Roll No: {selectedStudent.roll}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Back
              </button>
            </div>

            <Table
              title="Results"
              subtitle={selectedStudent.className}
              showSearch={false}
              showPagination={false}
              data={selectedStudent.subjects}
              columns={resultColumns}
            />

            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-gray-800 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                <p className="text-lg font-semibold">{total}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Percentage</p>
                <p className="text-lg font-semibold">{percentage.toFixed(2)}%</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                <p className={`text-lg font-semibold ${percentage >= 40 ? "text-green-500" : "text-red-500"}`}>
                  {percentage >= 40 ? "Pass" : "Fail"}
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Result;
