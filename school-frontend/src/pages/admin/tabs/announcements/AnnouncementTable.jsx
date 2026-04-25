import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../../../../components/table/Table";
import { toDisplayDate } from "./announcementUtils.jsx";

function AnnouncementTable({ data, onEdit, onDelete }) {
  return (
    <Table
      title="Announcements"
      subtitle={`Showing ${data.length} record${data.length === 1 ? "" : "s"}`}
      showSearch={false}
      data={data}
      columns={[
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "description", label: "Description" },
        {
          key: "classes",
          label: "Classes",
          render: (announcement) => (announcement.classes || ["All"]).join(", "),
        },
        { key: "date", label: "Date", render: (announcement) => toDisplayDate(announcement.date) },
        {
          key: "popup",
          label: "Popup",
          render: (announcement) => (announcement.popup ? "Yes" : "No"),
        },
        {
          key: "isPublished",
          label: "Published",
          render: (announcement) => (announcement.isPublished ? "Yes" : "No"),
        },
      ]}
      actions={(announcement) => (
        <div className="flex justify-center gap-2">
          <button onClick={() => onEdit(announcement)} className="rounded bg-green-500 px-2 py-1 text-white">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(announcement)} className="rounded bg-red-500 px-2 py-1 text-white">
            <FaTrash />
          </button>
        </div>
      )}
    />
  );
}

export default AnnouncementTable;
