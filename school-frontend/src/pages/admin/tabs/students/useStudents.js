import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  classOptions,
  initialFormState,
  normalizeStudents,
} from "./studentsData.jsx";

export function useStudents() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [classFilter, setClassFilter] = useState("All");

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${apiUrl}/api/student`);
      setStudents(normalizeStudents(res.data?.data ?? []));
      setFetchError("");
    } catch (error) {
      console.error("Failed to fetch students", error);
      setFetchError("Unable to load student list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [apiUrl]);

  const totalFees = students.reduce((sum, student) => sum + Number(student.totalFees ?? 0), 0);
  const totalPaid = students.reduce((sum, student) => sum + Number(student.paidFees ?? 0), 0);
  const totalRemaining = totalFees - totalPaid;

  const classCounts = students.reduce((acc, student) => {
    acc[student.className] = (acc[student.className] || 0) + 1;
    return acc;
  }, {});

  const filteredStudents = useMemo(
    () =>
      classFilter === "All"
        ? students
        : students.filter((student) => student.className === classFilter),
    [students, classFilter]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModalForCreate = () => {
    setEditStudent(null);
    setForm(initialFormState);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditStudent(null);
    setForm(initialFormState);
  };

  const handleSubmit = () => {
    if (!form.className) {
      alert("Please select class");
      return;
    }

    if (!editStudent && !form.password) {
      alert("Please set password");
      return;
    }

    const rollExists = students.some(
      (student) => student.roll === form.roll && student.id !== editStudent?.id
    );

    if (rollExists) {
      alert("Roll number already exists");
      return;
    }

    if (editStudent) {
      setStudents(
        students.map((student) =>
          student.id === editStudent.id ? { ...form, id: student.id } : student
        )
      );
      closeModal();
    } else {
      axios
        .post(`${apiUrl}/api/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "student",
          rollNumber: form.roll,
          className: form.className,
          qualification: form.qualification,
          phone: form.phone,
          totalFees: form.totalFees,
          paidFees: form.paidFees,
        })
        .then(() => {
          fetchStudents();
          closeModal();
        })
        .catch((error) => {
          console.error("Failed to create student", error);
          alert(error.response?.data?.message || "Unable to create student");
        });
    }
  };

  const handleEdit = (student) => {
    setForm({ ...initialFormState, ...student, password: "" });
    setEditStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return {
    students,
    loading,
    fetchError,
    showModal,
    editStudent,
    form,
    classFilter,
    classOptions,
    filteredStudents,
    totalFees,
    totalPaid,
    totalRemaining,
    classCounts,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    openModalForCreate,
    closeModal,
    setClassFilter,
    fetchStudents,
  };
}
