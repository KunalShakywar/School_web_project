import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Table from "../../../../components/table/Table";
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";
import StaffFormModal from "./StaffFormModal.jsx";
import { initialStaff, initialStaffForm } from "./staffData.jsx";

function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [form, setForm] = useState(initialStaffForm);

  const filteredStaff = useMemo(
    () =>
      staff.filter((item) => {
        const query = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.qualification.toLowerCase().includes(query)
        );
      }),
    [search, staff]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(initialStaffForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...initialStaffForm, ...item, password: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(initialStaffForm);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editingId) {
      setStaff((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form, photo: form.photo || item.photo } : item
        )
      );
      closeModal();
      return;
    }

    setStaff((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        photo: form.photo || "https://i.pravatar.cc/150",
      },
    ]);
    closeModal();
  };

  const deleteStaff = (id) => {
    if (window.confirm("Delete this staff member?")) {
      setStaff((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Role", "Qualification", "Email", "Phone"]],
      body: filteredStaff.map((item) => [
        item.name,
        item.role,
        item.qualification,
        item.email,
        item.phone,
      ]),
    });
    doc.save("staff.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStaff);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    XLSX.writeFile(workbook, "staff.xlsx");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
      
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <FaPlus /> Add Staff
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="rounded border bg-white p-2 dark:bg-gray-800"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-white hover:bg-red-500"
        >
          <FaFilePdf /> PDF
        </button>

        <button
          onClick={exportExcel}
          className="flex items-center gap-2 rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
        >
          <FaFileExcel /> Excel
        </button>
      </div>

      <Table
        title="Staff"
        subtitle={`Showing ${filteredStaff.length} record${filteredStaff.length === 1 ? "" : "s"}`}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search staff..."
        rowsPerPage={rowsPerPage}
        data={staff}
        columns={[
          {
            key: "photo",
            label: "Photo",
            render: (item) => (
              <img
                src={item.photo}
                onClick={() => setPreview(item.photo)}
                className="mx-auto h-10 w-10 cursor-pointer rounded-full object-cover"
                alt={item.name}
              />
            ),
          },
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "qualification", label: "Qualification" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
        actions={(item) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => openEdit(item)}
              className="rounded bg-blue-500 px-2 py-2 text-white"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteStaff(item.id)}
              className="rounded bg-red-500 px-2 py-2 text-white"
            >
              <FaTrash />
            </button>
          </div>
        )}
      />

      <StaffFormModal
        open={showModal}
        editingId={editingId}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSubmit={submitForm}
      />

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-h-[80%] rounded" alt="Staff preview" />
        </div>
      )}
    </div>
  );
}

export default Staff;
