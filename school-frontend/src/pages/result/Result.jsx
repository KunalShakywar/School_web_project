import { useState } from "react";


function Result() {
  const [selectedStudent] = useState<StudentResult | null>(resultsData[0]);

  const total =
    selectedStudent?.subjects.reduce((sum, s) => sum + s.marks, 0) || 0;

  const percentage =
    selectedStudent && selectedStudent.subjects.length > 0
      ? (total / (selectedStudent.subjects.length * 100)) * 100
      : 0;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br 
      from-blue-100 to-purple-200 
      dark:from-gray-900 dark:to-gray-800 transition">

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 
        text-gray-800 dark:text-gray-200 
        shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Result
        </h1>

        {selectedStudent && (
          <>
            <div className="mb-6">
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Class:</strong> {selectedStudent.className}</p>
              <p><strong>Roll No:</strong> {selectedStudent.roll}</p>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Marks</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.subjects.map((sub, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="p-3">{sub.subject}</td>
                    <td className="p-3">{sub.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
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
          </>
        )}
      </div>
    </div>
  );
}

export default Result;
