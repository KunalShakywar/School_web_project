import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";

import Table from "../../components/table/Table";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

function Examination() {
  const [selectedExam, setSelectedExam] = useState(null);

  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH EXAMS
  const fetchExams = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/exams/all`
      );

      setExams(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // REALTIME
  useEffect(() => {
    fetchExams();

    socket.on("newExam", (newExam) => {
      setExams((prev) => {
        const exists = prev.find(
          (exam) => exam._id === newExam._id
        );

        if (exists) return prev;

        return [newExam, ...prev];
      });
    });

    return () => {
      socket.off("newExam");
    };
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className=" text-center text-xl">
        Loading...
      </div>
    );
  }

  // SINGLE EXAM VIEW
  if (selectedExam) {
    return (
      <div className=" px-4">
        <div
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md
          border border-stone-200 dark:border-stone-700
          text-gray-800 dark:text-gray-200
          shadow-xl rounded-2xl p-8"
        >
          <button
            onClick={() => setSelectedExam(null)}
            className="mb-6 p-2 border rounded-lg hover:bg-white/10"
          >
            <IoIosArrowBack size={22} />
          </button>

          <h2 className="text-3xl font-bold mb-2">
            {selectedExam.name}
          </h2>

          <p className="mb-6 text-lg">
            {selectedExam.className}
          </p>

          <Table
            title="Exam Schedule"
            subtitle={selectedExam.className}
            showSearch={false}
            showPagination={false}
            data={selectedExam.dates}
            columns={[
              {
                key: "subject",
                label: "Subject",
              },
              {
                key: "date",
                label: "Date",
              },
            ]}
          />
        </div>
      </div>
    );
  }

  // ALL EXAMS VIEW
  return (
    <div className=" px-4">
      <h1
        className="text-4xl font-bold text-center mb-10
        text-gray-800 dark:text-gray-200"
      >
        Examination Schedule
      </h1>

      {exams.length === 0 ? (
        <div className="text-center text-lg">
          No Exams Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {exams.map((exam) => (
            <div
              key={exam._id}
              onClick={() => setSelectedExam(exam)}
              className="bg-white/10 backdrop-blur-md
              border border-stone-200 dark:border-stone-700
              text-gray-800 dark:text-gray-200
              p-6 rounded-2xl shadow-xl cursor-pointer
              hover:scale-105 transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {exam.name}
              </h2>

              <p className="text-lg mb-4">
                {exam.className}
              </p>

              <div className="space-y-2">
                {exam.dates.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>{item.subject}</span>

                    <span>{item.date}</span>
                  </div>
                ))}
              </div>

              {exam.dates.length > 2 && (
                <p className="mt-4 text-sm opacity-70">
                  + {exam.dates.length - 2} more subjects
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Examination;