import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Table from "../../../../components/table/Table";
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";
import StaffFormModal from "./StaffFormModal.jsx";
import { initialStaffForm } from "./staffData.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function normalizeStaff(item = {}) {
  return {
    id: item._id || item.id,
    name: item.name || "Unknown Staff",
    role: item.role || "Staff",
    qualification: item.qualification || "",
    email: item.email || "",
    phone: item.phone || "",
    photo: item.photo || "https://via.placeholder.com/150?text=Staff",
    department: item.department || item.role || "",
  };
}

function Staff() {
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [form, setForm] = useState(initialStaffForm);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadStaff = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/staff`);
        if (cancelled) return;

        const list = Array.isArray(response.data?.data) ? response.data.data : [];
        setStaff(list.map(normalizeStaff));
        setFetchError("");
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to fetch staff", error);
        setStaff([]);
        setFetchError("Unable to load staff records.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadStaff();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshStaff = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/staff`);
      const list = Array.isArray(response.data?.data) ? response.data.data : [];
      setStaff(list.map(normalizeStaff));
      setFetchError("");
    } catch (error) {
      console.error("Failed to refresh staff", error);
      setFetchError("Unable to load staff records.");
    }
  };

  const filteredStaff = useMemo(
    () =>
      staff.filter((item) => {
        const query = search.toLowerCase();
        return (
          String(item.name || "").toLowerCase().includes(query) ||
          String(item.role || "").toLowerCase().includes(query) ||
          String(item.email || "").toLowerCase().includes(query) ||
          String(item.qualification || "").toLowerCase().includes(query)
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

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      role: form.role,
      qualification: form.qualification,
      email: form.email,
      phone: form.phone,
      photo: form.photo,
      department: form.department || form.role,
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/staff/${editingId}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/api/staff`, payload);
      }

      await refreshStaff();
      closeModal();
    } catch (error) {
      console.error("Failed to save staff", error);
      alert(error.response?.data?.message || "Unable to save staff");
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/staff/${id}`);
      await refreshStaff();
    } catch (error) {
      console.error("Failed to delete staff", error);
      alert(error.response?.data?.message || "Unable to delete staff");
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
          <p className="text-sm text-slate-500">
            {loading ? "Loading staff..." : fetchError || `Showing ${filteredStaff.length} record${filteredStaff.length === 1 ? "" : "s"}`}
          </p>
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

      {fetchError && !loading ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {fetchError}
        </div>
      ) : null}

      <Table
        title="Staff"
        subtitle={`Showing ${filteredStaff.length} record${filteredStaff.length === 1 ? "" : "s"}`}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search staff..."
        rowsPerPage={rowsPerPage}
        data={filteredStaff}
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
