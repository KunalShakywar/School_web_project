import {
  FiSave,
  FiRotateCcw,
  FiCornerUpLeft,
  FiDownload,
} from "react-icons/fi";

const AttendanceActionButtons = ({
  saving,
  studentsCount,
  historyLength,
  onSubmit,
  onRestore,
  onUndo,
  onExport,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-3">

      {/* SUBMIT */}
      <button
        onClick={onSubmit}
        disabled={saving || studentsCount === 0}
        className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
      >
        <FiSave />
        {saving ? "Saving..." : "Submit"}
      </button>

      {/* RESTORE */}
      <button
        onClick={onRestore}
        disabled={studentsCount === 0}
        className="flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-2 font-semibold text-yellow-900 shadow-sm transition hover:bg-yellow-500 disabled:opacity-60"
      >
        <FiRotateCcw />
       <span className="hidden sm:inline">
         Restore
       </span>
      </button>

      {/* UNDO */}
      <button
        onClick={onUndo}
        disabled={historyLength === 0}
        className="flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-50"
      >
        <FiCornerUpLeft />
        <span className="hidden sm:inline">

        Undo
        </span>
      </button>

      {/* EXPORT */}
      <button
        onClick={onExport}
        disabled={studentsCount === 0}
        className="flex items-center gap-2 rounded-2xl bg-purple-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:opacity-60"
      >
        <FiDownload />
      <span className="hidden sm:inline">  Export</span>
      </button>

    </div>
  );
};

export default AttendanceActionButtons;