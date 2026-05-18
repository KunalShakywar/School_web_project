import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaBookOpen, FaEnvelope, FaPhone, FaSearch, FaUsers } from "react-icons/fa";

import Table from "../../components/table/Table";

function normalizeTeacher(teacher = {}) {
  return {
    id: teacher._id || teacher.id,
    name: teacher.name || "Unknown Teacher",
    role: teacher.role || "Teacher",
    phone: teacher.phone || "-",
    email: teacher.email || "-",
    subject: teacher.subject || "Not assigned",
    department: teacher.className || teacher.department || "-",
    qualification: teacher.qualification || "-",
    experience: teacher.experience || "-",
    attendanceRate:
      typeof teacher.attendanceRate === "number" ? teacher.attendanceRate : null,
    photo:
      teacher.avatar ||
      teacher.photo ||
      "https://via.placeholder.com/120?text=Teacher",
    classes: Array.isArray(teacher.classes) ? teacher.classes : [],
  };
}

function TeacherCard({ teacher }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={teacher.photo}
          alt={teacher.name}
          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-slate-900">
                {teacher.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{teacher.subject}</p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {teacher.role}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <FaBookOpen className="shrink-0 text-slate-400" />
              <span className="font-medium text-slate-500">Class:</span>
              <span>{teacher.department}</span>
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {teacher.qualification}
            </span>
              <span className="text-sm  py-1 text-blue-600 ">
              Tap to view details
              </span>
       
          </div>
        </div>
      </div>

      {teacher.classes.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Assigned Classes
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {teacher.classes.join(", ")}
          </p>
        </div>
      )}
    </article>
  );
}

function TeacherDetailsModal({ teacher, onClose }) {
  if (!teacher) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl max-h-[calc(100dvh-3rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-900">
                  {teacher.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{teacher.subject}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {teacher.role}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Class / Department</span>
            <span className="text-right">{teacher.department}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Phone</span>
            <span className="text-right">{teacher.phone}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Email</span>
            <span className="break-all text-right">{teacher.email}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Qualification</span>
            <span className="text-right">{teacher.qualification}</span>
          </p>
          {teacher.experience !== "-" && (
            <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-500">Experience</span>
              <span className="text-right">{teacher.experience}</span>
            </p>
          )}
          {teacher.attendanceRate !== null && (
            <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-500">Attendance</span>
              <span className="text-right">{teacher.attendanceRate}%</span>
            </p>
          )}
        </div>

        {teacher.classes.length > 0 && (
          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Assigned Classes
            </p>
            <p className="mt-1 text-sm text-slate-700">{teacher.classes.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TeacherTable() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadTeachers = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${apiUrl}/api/teacher`);
        if (cancelled) return;

        const payload = response.data?.data;
        const list = Array.isArray(payload) ? payload : [];
        setTeachers(list.map(normalizeTeacher));
        setError("");
      } catch (fetchError) {
        if (cancelled) return;
        console.error("Failed to fetch teachers", fetchError);
        setTeachers([]);
        setError("Unable to load teacher details right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTeachers();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return teachers;

    return teachers.filter((teacher) => {
      const searchFields = [
        teacher.name,
        teacher.role,
        teacher.phone,
        teacher.email,
        teacher.subject,
        teacher.department,
        teacher.qualification,
        teacher.experience,
        ...(teacher.classes || []),
      ];

      return searchFields.some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );
    });
  }, [search, teachers]);

  const columns = [
    {
      key: "photo",
      label: "Photo",
      render: (teacher) => (
        <img
          src={teacher.photo}
          alt={teacher.name}
          className="mx-auto h-12 w-12 rounded-full border border-slate-200 object-cover"
        />
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (teacher) => (
        <div>
          <p className="font-semibold text-slate-900">{teacher.name}</p>
          <p className="text-xs text-slate-500">{teacher.role}</p>
        </div>
      ),
    },
    { key: "subject", label: "Subject" },
    { key: "department", label: "Class / Department" },
    { key: "qualification", label: "Qualification" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <div className="min-h-screen px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <LiaChalkboardTeacherSolid size={24} />
                </span>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Teacher Management
                  </h1>
                
                </div>
              </div>
            </div>

            <div className="relative w-full lg:max-w-md">

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=" Search teacher by name, subject, email..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full  px-3 py-1.5">
              <FaUsers className="text-slate-500" />
              {loading ? "Loading teachers..." : `${filteredTeachers.length} teachers`}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Loading teacher details...</p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">No teachers found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or check if the backend has teacher records.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:hidden">
              {filteredTeachers.map((teacher) => (
                  <button
                    type="button"
                    onClick={() => setSelectedTeacher(teacher)}
                    className="text-left"
                  >
                    <TeacherCard teacher={teacher} />
                  </button>
              ))}
            </div>

            <div className="hidden md:block">
              <Table
                title="Teacher List"
                subtitle={`Showing ${filteredTeachers.length} record${
                  filteredTeachers.length === 1 ? "" : "s"
                }`}
                showSearch={false}
                showPagination={false}
                showRowDividers={true}
                data={filteredTeachers}
                columns={columns}
              />
            </div>
          </>
        )}

        {selectedTeacher && (
          <TeacherDetailsModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}

      </div>
    </div>
  );
}

export default TeacherTable;
