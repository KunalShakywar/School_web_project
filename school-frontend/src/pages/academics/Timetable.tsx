import { useState } from "react";
import Table from "../../components/table/Table";

type Period = {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
};

const timetableData: Record<string, Period[]> = {
  "Class 10": [
    {
      time: "9:00 - 10:00",
      monday: "Maths (Mr. Sharma)",
      tuesday: "Science (Mrs. Rao)",
      wednesday: "English",
      thursday: "Maths",
      friday: "Computer",
      saturday: "Sports",
    },
    {
      time: "10:00 - 11:00",
      monday: "Science",
      tuesday: "Maths",
      wednesday: "Social Science",
      thursday: "English",
      friday: "Science",
      saturday: "Library",
    },
  ],
};

function TimeTable() {
  const [selectedClass, setSelectedClass] = useState("Class 10");

  const periods = timetableData[selectedClass];

  return (
    <div className="pt-28">

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
          >
            {Object.keys(timetableData).map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
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

      </div>
    </div>
  );
}

export default TimeTable;
