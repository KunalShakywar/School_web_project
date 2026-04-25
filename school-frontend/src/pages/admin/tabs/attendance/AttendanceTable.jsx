import Table from "../../../../components/table/Table";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

function AttendanceTable({ columns, data, onPresent, onAbsent }) {
  return (
    <Table
      columns={columns}
      data={data}
      showSearch={false}
      actions={(row) => (
        <div className="flex gap-2">
          <button
            onClick={() => onPresent(row.id)}
            className="rounded bg-green-500 px-2 py-1 text-white"
          >
            <FaUserCheck />
          </button>
          <button
            onClick={() => onAbsent(row.id)}
            className="rounded bg-red-500 px-2 py-1 text-white"
          >
            <FaUserTimes />
          </button>
        </div>
      )}
    />
  );
}

export default AttendanceTable;
