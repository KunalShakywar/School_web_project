import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
const teacherApi = `${apiBase}/api/teacher`;
const classApi = `${apiBase}/api/class`;
const sectionApi = `${apiBase}/api/section`;
const subjectApi = `${apiBase}/api/subject`;
const assignmentApi = `${apiBase}/api/teacherassign`;

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
};

const labelFor = (item, fallbacks = []) => {
  for (const key of fallbacks) {
    const value = item?.[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value);
    }
  }
  return item?._id || "Unknown";
};

export default function AssignTeacher() {
  const [form, setForm] = useState({
    teacherId: "",
    classId: "",
    sectionId: "",
    subjectId: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [teachersRes, classesRes, sectionsRes, subjectsRes, assignmentsRes] =
        await Promise.allSettled([
          axios.get(teacherApi),
          axios.get(classApi),
          axios.get(sectionApi),
          axios.get(subjectApi),
          axios.get(`${assignmentApi}/assignments`),
        ]);

      if (teachersRes.status === "fulfilled") {
        setTeachers(normalizeList(teachersRes.value.data));
      }
      if (classesRes.status === "fulfilled") {
        setClasses(normalizeList(classesRes.value.data));
      }
      if (sectionsRes.status === "fulfilled") {
        setSections(normalizeList(sectionsRes.value.data));
      }
      if (subjectsRes.status === "fulfilled") {
        setSubjects(normalizeList(subjectsRes.value.data));
      }
      if (assignmentsRes.status === "fulfilled") {
        setAssignments(normalizeList(assignmentsRes.value.data));
      }
    } catch (loadError) {
      console.error("Failed to load assignment data:", loadError);
      setError("Unable to load dropdown data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSections = useMemo(() => {
    if (!form.classId) return sections;
    return sections.filter((section) => {
      const sectionClassId = section?.classId?._id || section?.classId;
      return String(sectionClassId) === String(form.classId);
    });
  }, [sections, form.classId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "classId" ? { sectionId: "" } : null),
    }));
  };

  const isDuplicateAssignment = () =>
    assignments.some((item) => {
      const teacherId = item?.teacherId?._id || item?.teacherId;
      const classId = item?.classId?._id || item?.classId;
      const sectionId = item?.sectionId?._id || item?.sectionId;
      const subjectId = item?.subjectId?._id || item?.subjectId;

      return (
        String(teacherId) === String(form.teacherId) &&
        String(classId) === String(form.classId) &&
        String(sectionId) === String(form.sectionId) &&
        String(subjectId) === String(form.subjectId)
      );
    });

  const handleSubmit = async () => {
    if (!form.teacherId || !form.classId || !form.sectionId || !form.subjectId) {
      setError("Please select teacher, class, section, and subject.");
      return;
    }

    if (isDuplicateAssignment()) {
      setError("This teacher is already assigned to the same class, section, and subject.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.post(`${assignmentApi}/assign-teacher`, {
        teacherId: form.teacherId,
        classId: form.classId,
        sectionId: form.sectionId,
        subjectId: form.subjectId,
      });

      await loadData();
      setForm({
        teacherId: "",
        classId: "",
        sectionId: "",
        subjectId: "",
      });
    } catch (submitError) {
      console.error("Failed to assign teacher:", submitError);
      setError(submitError.response?.data?.message || "Unable to assign teacher.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await axios.delete(`${assignmentApi}/assign-teacher/${id}`);
      await loadData();
    } catch (deleteError) {
      console.error("Failed to delete assignment:", deleteError);
      setError(deleteError.response?.data?.message || "Unable to delete assignment.");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Assign Teacher</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Link one teacher to a class, section, and subject.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          Teacher
          <select
            name="teacherId"
            value={form.teacherId}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher?._id} value={teacher?._id}>
                {labelFor(teacher, ["name", "fullName", "email"])}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          Class
          <select
            name="classId"
            value={form.classId}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls?._id} value={cls?._id}>
                {labelFor(cls, ["name", "title"])}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          Section
          <select
            name="sectionId"
            value={form.sectionId}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">Select Section</option>
            {filteredSections.map((section) => (
              <option key={section?._id} value={section?._id}>
                {labelFor(section, ["name", "section"])}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          Subject
          <select
            name="subjectId"
            value={form.subjectId}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject?._id} value={subject?._id}>
                {labelFor(subject, ["name", "title"])}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Assigning..." : "Assign Teacher"}
        </button>

        <button
          type="button"
          onClick={loadData}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Assigned Teachers
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {loading ? "Loading..." : `${assignments.length} assignment${assignments.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Teacher Name</th>
                <th className="px-4 py-3 font-semibold">Class Name</th>
                <th className="px-4 py-3 font-semibold">Section</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {assignments.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-slate-500 dark:text-slate-400" colSpan={5}>
                    No assignments found.
                  </td>
                </tr>
              ) : (
                assignments.map((item) => (
                  <tr key={item?._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      {item?.teacherId?.name || item?.teacherId?.userId?.name || "-"}
                    </td>
                    <td className="px-4 py-3">{item?.classId?.name || "-"}</td>
                    <td className="px-4 py-3">{item?.sectionId?.name || "-"}</td>
                    <td className="px-4 py-3">{item?.subjectId?.name || "-"}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(item?._id)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
