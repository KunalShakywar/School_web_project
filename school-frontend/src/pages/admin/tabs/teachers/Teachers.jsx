import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Table from "../../../../components/table/Table";
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";
import TeacherFormModal from "./TeacherFormModal.jsx";
import { initialTeacherForm } from "./teacherData.jsx";

function Teachers() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [form, setForm] = useState(initialTeacherForm);
  const [assignmentForm, setAssignmentForm] = useState({
    classId: "",
    sectionId: "",
    subjectId: "",
    streamId: "",
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadTeachers = async () => {
      setLoading(true);

      try {
        const teachersRes = await axios.get(`${apiUrl}/api/teacher`);
        if (cancelled) return;

        setTeachers(Array.isArray(teachersRes.data?.data) ? teachersRes.data.data : []);
        setFetchError("");
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to fetch teachers", error);
        setFetchError("Unable to load teacher list.");
        setTeachers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTeachers();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const refreshTeachers = async () => {
    try {
      const teachersRes = await axios.get(`${apiUrl}/api/teacher`);
      setTeachers(Array.isArray(teachersRes.data?.data) ? teachersRes.data.data : []);
      setFetchError("");
    } catch (error) {
      console.error("Failed to refresh teachers", error);
      setFetchError("Unable to load teacher list.");
    }
  };

  const filteredTeachers = useMemo(
    () =>
      teachers.filter((teacher) => {
        const query = search.toLowerCase();
        return (
          String(teacher.name || "").toLowerCase().includes(query) ||
          String(teacher.subject || "").toLowerCase().includes(query) ||
          String(teacher.email || "").toLowerCase().includes(query) ||
          String(teacher.qualification || "").toLowerCase().includes(query)
        );
      }),
    [search, teachers]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(initialTeacherForm);
    setAssignmentForm({
      classId: "",
      sectionId: "",
      subjectId: "",
      streamId: "",
    });
    setShowModal(true);
  };

  const openEdit = (teacher) => {
    setEditingId(teacher._id);
    setForm({
        ...initialTeacherForm,
        name: teacher.name || "",
        subject: teacher.subject || "",
        qualification: teacher.qualification || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        className: teacher.className || "",
        experience: teacher.experience || "",
        photo: teacher.avatar || teacher.photo || "",
        password: "",
      });
    setAssignmentForm({
      classId: "",
      sectionId: "",
      subjectId: "",
      streamId: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(initialTeacherForm);
    setAssignmentForm({
      classId: "",
      sectionId: "",
      subjectId: "",
      streamId: "",
    });
    setEditingId(null);
  };

  const submitForm = async (e, assignmentPayload = assignmentForm) => {
    e.preventDefault();

    try {
      let teacherId = editingId;

      if (editingId) {
        await axios.put(`${apiUrl}/api/teacher/${editingId}`, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          qualification: form.qualification,
          className: form.className,
          experience: form.experience,
          photo: form.photo,
        });
      } else {
        const response = await axios.post(`${apiUrl}/api/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "teacher",
          phone: form.phone,
          subject: form.subject,
          qualification: form.qualification,
          className: form.className,
          experience: form.experience,
        });
        teacherId = response.data?.profile?.id || response.data?.teacherId || editingId;
      }

      const hasAssignment =
        assignmentPayload?.classId &&
        assignmentPayload?.sectionId &&
        assignmentPayload?.subjectId;

      if (teacherId && hasAssignment) {
        await axios.post(`${apiUrl}/api/teacherassign/assign-teacher`, {
          teacherId,
          classId: assignmentPayload.classId,
          sectionId: assignmentPayload.sectionId,
          subjectId: assignmentPayload.subjectId,
          streamId: assignmentPayload.streamId || null,
        });
      }

      await refreshTeachers();
      closeModal();
    } catch (error) {
      console.error("Failed to create teacher", error);
      alert(error.response?.data?.message || "Unable to create teacher");
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
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading real teacher records..."
              : fetchError || `Showing ${filteredTeachers.length} record${filteredTeachers.length === 1 ? "" : "s"}`}
          </p>
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
        showRowDividers={false}
        rowsPerPage={rowsPerPage}
        data={filteredTeachers}
        columns={[
          {
            key: "photo",
            label: "Photo",
            render: (teacher) => (
              <img
                src={teacher.avatar || teacher.photo || "https://imgs.search.brave.com/4-5Hgc_N7hyZWLsYN_77lAAIv7wIxrlN-NiD2il21UE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y5Lzg4/LzQ2L2Y5ODg0NjMx/YjRiMjAxZGFjY2Qw/NTk1M2Q2NGNmZjIw/LmpwZw"}
                onClick={() => setPreview(teacher.avatar || teacher.photo || "https://imgs.search.brave.com/4-5Hgc_N7hyZWLsYN_77lAAIv7wIxrlN-NiD2il21UE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y5Lzg4/LzQ2L2Y5ODg0NjMx/YjRiMjAxZGFjY2Qw/NTk1M2Q2NGNmZjIw/LmpwZw")}
                className="mx-auto h-10 w-10 cursor-pointer rounded-full object-cover"
                alt={teacher.name}
              />
            ),
          },
          { key: "name", label: "Name" },
          { key: "subject", label: "Subject" },
          { key: "qualification", label: "Qualification" },
          { key: "className", label: "Class" },
          { key: "experience", label: "Experience" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
        actions={(teacher) => (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => openEdit(teacher)}
              className="rounded bg-blue-500 px-2 py-2 text-white transition hover:bg-blue-600"
            >
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm("Delete this teacher?")) return;

                try {
                  await axios.delete(`${apiUrl}/api/teacher/${teacher._id}`);
                  await refreshTeachers();
                } catch (error) {
                  console.error("Failed to delete teacher", error);
                  alert(error.response?.data?.message || "Unable to delete teacher");
                }
              }}
              className="rounded bg-red-500 px-2 py-2 text-white transition hover:bg-red-600"
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
        assignmentForm={assignmentForm}
        setAssignmentForm={setAssignmentForm}
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
