import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Table from "../../components/table/Table";

type Exam = {
  id: number;
  name: string;
  className: string;
  dates: {
    subject: string;
    date: string;
  }[];
};

const examData: Exam[] = [
  {
    id: 1,
    name: "Unit Test 1",
    className: "Class 10",
    dates: [
      { subject: "Maths", date: "10 March 2026" },
      { subject: "Science", date: "12 March 2026" },
      { subject: "English", date: "15 March 2026" },
    ],
  },
  {
    id: 2,
    name: "Half Yearly Exam",
    className: "Class 10",
    dates: [
      { subject: "Maths", date: "10 October 2026" },
      { subject: "Science", date: "13 October 2026" },
      { subject: "English", date: "16 October 2026" },
    ],
  },
];

function Examination() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  //If exam selected show full schedule
  if (selectedExam) {
    return (
      <div className="pt-28">

        <div className="max-w-4xl mx-autobg-white/10 backdrop-blur-md  border border-stone-100
              text-gray-800 dark:text-gray-200
               shadow-xl rounded-2xl p-8 ">

          <button
            onClick={() => setSelectedExam(null)}
            className="mb-6 px-4 py-2 border rounded-lg"
          >
            <IoIosArrowBack />

          </button>

          <h2 className="text-2xl font-bold mb-6">
            {selectedExam.name} - {selectedExam.className}
          </h2>

          <Table
            title="Exam Schedule"
            subtitle={selectedExam.className}
            showSearch={false}
            showPagination={false}
            data={selectedExam.dates}
            columns={[
              { key: "subject", label: "Subject" },
              { key: "date", label: "Date" },
            ]}
          />
        </div>
      </div>
    );
  }

  //  Default view show exam cards
  return (
    <div className="pt-28">

      <h1 className="text-3xl font-bold text-center mb-10 
        text-gray-800 dark:text-gray-200">
        Examination Schedule
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {examData.map((exam) => (
          <div
            key={exam.id}
            onClick={() => setSelectedExam(exam)}
            className="bg-white/10 backdrop-blur-md  border border-stone-100
              text-gray-800 dark:text-gray-200
              p-6 rounded-2xl shadow-xl cursor-pointer 
              hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {exam.name}
            </h2>
            <p>Class: {exam.className}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Examination;
