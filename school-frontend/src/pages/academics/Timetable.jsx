import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";

/**
 * @typedef {Object} Period
 * @property {string} time
 * @property {string} monday
 * @property {string} tuesday
 * @property {string} wednesday
 * @property {string} thursday
 * @property {string} friday
 * @property {string} saturday
 */

/**
 * @typedef {Object} Timetable
 * @property {string=} _id
 * @property {string} className
 * @property {Period[]} periods
 */

const API_URL = import.meta.env.VITE_API_URL;

function TimeTable() {
  /** @type {[Timetable[], React.Dispatch<React.SetStateAction<Timetable[]>>]} */
  const [timetableData, setTimetableData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const endpoint = API_URL
          ? `${API_URL}/api/timetable/all`
          : "/api/timetable/all";
        const response = await axios.get(endpoint);
        const rows = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setTimetableData(rows);
        setSelectedClass((current) => current || rows[0]?.className || "");
      } catch (err) {
        console.log(err);
        setError("Timetable backend se load nahi ho paaya.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const selectedTimetable = timetableData.find(
    (item) => item.className === selectedClass
  );
  const periods = selectedTimetable?.periods ?? [];

  if (loading) {
    return (
      <div className="">
        <div className="max-w-6xl mx-auto rounded-2xl bg-white/10 p-8 text-center text-gray-800 shadow-2xl dark:text-gray-200">
          Loading timetable...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <div className="max-w-6xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-stone-100 dark:bg-gray-900  
        text-gray-800 dark:text-gray-200 
        shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          School Time Table
        </h1>

        {/* Class Selector */}
        <div className="mb-6 text-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            disabled={timetableData.length === 0}
          >
            {timetableData.map((item) => (
              <option key={item._id ?? item.className} value={item.className}>
                {item.className}
              </option>
            ))}
          </select>
        </div>

        {timetableData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800/40">
            Abhi koi timetable available nahi hai.
          </div>
        ) : (
          <Table
            title="Time Table"
            subtitle={selectedClass}
            showSearch={false}
            showPagination={false}
            data={periods}
            columns={[
              { key: "time", label: "Time" },
              { key: "monday", label: "Mon" },
              { key: "tuesday", label: "Tue" },
              { key: "wednesday", label: "Wed" },
              { key: "thursday", label: "Thu" },
              { key: "friday", label: "Fri" },
              { key: "saturday", label: "Sat" },
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default TimeTable;
