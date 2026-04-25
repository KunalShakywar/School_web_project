import Select from "../../../../components/inputs/Select";
import AttendanceStats from "./AttendanceStats.jsx";
import AttendanceTable from "./AttendanceTable.jsx";
import { useAttendance } from "./useAttendance.js";

function Attendance() {
  const {
    classOptions,
    loading,
    fetchError,
    subject,
    setSubject,
    teacherName,
    setTeacherName,
    saveMessage,
    date,
    setDate,
    classFilter,
    setClassFilter,
    filteredStudents,
    presentCount,
    absentCount,
    markAttendance,
    saveAttendance,
    exportPDF,
  } = useAttendance();

  const columns = ["roll", "name", "className", "attendance"];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border p-2 dark:bg-gray-800"
        />

        <Select
          value={classFilter}
          options={classOptions}
          onChange={(e) => setClassFilter(e.target.value)}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject name"
          className="min-w-[180px] rounded border p-2 dark:bg-gray-800"
        />
        <input
          type="text"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Teacher name"
          className="min-w-[180px] rounded border p-2 dark:bg-gray-800"
        />
      </div>

      {loading && <p className="mb-2 text-sm text-slate-500">Loading students…</p>}
      {fetchError && <p className="mb-2 text-sm text-rose-500">{fetchError}</p>}

      <AttendanceStats
        presentCount={presentCount}
        absentCount={absentCount}
        onSave={saveAttendance}
        onExport={exportPDF}
      />

      {saveMessage && <p className="mb-4 text-sm text-slate-600">{saveMessage}</p>}

      <AttendanceTable
        columns={columns}
        data={filteredStudents}
        onPresent={(id) => markAttendance(id, "Present")}
        onAbsent={(id) => markAttendance(id, "Absent")}
      />
    </div>
  );
}

export default Attendance;
