import { FaSave, FaTrash, FaUndo } from "react-icons/fa";

function MarksToolbar({ undo, restoreData, submitServer }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={undo}
        className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
      >
        <FaUndo />
        <span className="hidden md:inline">Undo</span>
      </button>

      <button
        onClick={restoreData}
        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        <FaTrash />
        <span className="hidden md:inline">Restore</span>
      </button>

      <button
        onClick={submitServer}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        <FaSave />
        <span className="hidden md:inline">Submit Server</span>
      </button>
    </div>
  );
}

export default MarksToolbar;
