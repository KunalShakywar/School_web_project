import { useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Table from "../../../../components/table/Table";
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";
import TeacherFormModal from "./TeacherFormModal.jsx";
import { initialTeacherForm, initialTeachers } from "./teacherData.jsx";

function Teachers() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [teachers, setTeachers] = useState(initialTeachers);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [form, setForm] = useState(initialTeacherForm);

  const filteredTeachers = useMemo(
    () =>
      teachers.filter((teacher) => {
        const query = search.toLowerCase();
        return (
          teacher.name.toLowerCase().includes(query) ||
          teacher.subject.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query) ||
          teacher.qualification.toLowerCase().includes(query)
        );
      }),
    [search, teachers]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(initialTeacherForm);
    setShowModal(true);
  };

  const openEdit = (teacher) => {
    setEditingId(teacher.id);
    setForm({ ...initialTeacherForm, ...teacher, password: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(initialTeacherForm);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (editingId) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editingId
            ? { ...teacher, ...form, photo: form.photo || teacher.photo }
            : teacher
        )
      );
      closeModal();
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "teacher",
        phone: form.phone,
        subject: form.subject,
        qualification: form.qualification,
      });

      setTeachers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          photo: form.photo || "https://i.pravatar.cc/150",
        },
      ]);
      closeModal();
    } catch (error) {
      console.error("Failed to create teacher", error);
      alert(error.response?.data?.message || "Unable to create teacher");
    }
  };

  const deleteTeacher = (id) => {
    if (window.confirm("Delete this teacher?")) {
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Subject", "Qualification", "Email", "Phone"]],
      body: filteredTeachers.map((teacher) => [
        teacher.name,
        teacher.subject,
        teacher.qualification,
        teacher.email,
        teacher.phone,
      ]),
    });
    doc.save("teachers.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTeachers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");
    XLSX.writeFile(workbook, "teachers.xlsx");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
        
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <FaPlus /> Add Teacher
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
        title="Teachers"
        subtitle={`Showing ${filteredTeachers.length} record${filteredTeachers.length === 1 ? "" : "s"}`}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search teacher..."
        rowsPerPage={rowsPerPage}
        data={teachers}
        columns={[
          {
            key: "photo",
            label: "Photo",
            render: (teacher) => (
              <img
                src={teacher.photo}
                onClick={() => setPreview(teacher.photo)}
                className="mx-auto h-10 w-10 cursor-pointer rounded-full object-cover"
                alt={teacher.name}
              />
            ),
          },
          { key: "name", label: "Name" },
          { key: "subject", label: "Subject" },
          { key: "qualification", label: "Qualification" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
        actions={(teacher) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => openEdit(teacher)}
              className="rounded bg-blue-500 px-2 py-2 text-white"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTeacher(teacher.id)}
              className="rounded bg-red-500 px-2 py-2 text-white"
            >
              <FaTrash />
            </button>
          </div>
        )}
      />

      <TeacherFormModal
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
          <img src={preview} className="max-h-[80%] rounded" alt="Teacher preview" />
        </div>
      )}
    </div>
  );
}

export default Teachers;
