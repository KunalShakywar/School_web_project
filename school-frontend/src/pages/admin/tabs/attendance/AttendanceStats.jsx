import { FaFilePdf, FaSave, FaUserCheck, FaUserTimes } from "react-icons/fa";

function AttendanceStats({ presentCount, absentCount, onSave, onExport, saving }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <div className="flex gap-2 rounded-l-lg border border-green-400 bg-green-500/40 p-3 font-bold text-green-500">
        <span className="hidden md:inline">Present :</span>
        <FaUserCheck size={20} />
        {presentCount}
      </div>

      <div className="flex gap-2 rounded-r-lg border border-red-400 bg-red-500/40 p-3 font-bold text-red-500">
        <span className="hidden md:inline">Absent :</span>
        <FaUserTimes size={20} />
        {absentCount}
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-l-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-60"
      >
        <FaSave />
        <span className="hidden md:inline">{saving ? "Saving..." : "Save"}</span>
      </button>

      <button
        onClick={onExport}
        className="flex items-center gap-2 rounded-r-lg bg-red-500 px-4 py-2 text-white"
      >
        <FaFilePdf size={20} />
        <span className="hidden md:inline">PDF</span>
      </button>
    </div>
  );
}

export default AttendanceStats;
