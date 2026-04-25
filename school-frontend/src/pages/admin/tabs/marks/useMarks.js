import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { defaultStudents, defaultSubjects, grade, percentage, totalMarks } from "./marksData.jsx";

export function useMarks() {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [students, setStudents] = useState(defaultStudents);
  const [history, setHistory] = useState([]);
  const [newStudent, setNewStudent] = useState({ roll: "", name: "" });
  const [newSubject, setNewSubject] = useState("");

  const saveHistory = () => setHistory((prev) => [...prev, students]);

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setStudents(last);
    setHistory(history.slice(0, -1));
  };

  const restoreData = () => {
    setStudents(defaultStudents);
    setSubjects(defaultSubjects);
  };

  const addStudent = () => {
    if (!newStudent.roll || !newStudent.name) return;
    saveHistory();

    const marks = {};
    subjects.forEach((subject) => {
      marks[subject] = 0;
    });

    setStudents([
      ...students,
      {
        id: Date.now(),
        roll: newStudent.roll,
        name: newStudent.name,
        googleLink: "",
        marks,
      },
    ]);

    setNewStudent({ roll: "", name: "" });
  };

  const deleteStudent = (id) => {
    saveHistory();
    setStudents(students.filter((student) => student.id !== id));
  };

  const updateMarks = (id, sub, value) => {
    setStudents(
      students.map((student) =>
        student.id !== id
          ? student
          : {
              ...student,
              marks: {
                ...student.marks,
                [sub]: Number(value),
              },
            }
      )
    );
  };

  const updateLink = (id, value) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, googleLink: value } : student
      )
    );
  };

  const addSubject = () => {
    if (!newSubject) return;
    saveHistory();
    setSubjects([...subjects, newSubject]);
    setStudents(
      students.map((student) => ({
        ...student,
        marks: {
          ...student.marks,
          [newSubject]: 0,
        },
      }))
    );
    setNewSubject("");
  };

  const removeSubject = (sub) => {
    saveHistory();
    setSubjects(subjects.filter((subject) => subject !== sub));
    setStudents(
      students.map((student) => {
        const marks = { ...student.marks };
        delete marks[sub];
        return { ...student, marks };
      })
    );
  };

  const exportPDF = (student) => {
    const doc = new jsPDF();
    doc.text("Student Report Card", 20, 20);
    doc.text(`Name: ${student.name}`, 20, 40);
    doc.text(`Roll: ${student.roll}`, 20, 50);

    autoTable(doc, {
      startY: 70,
      head: [["Subject", "Marks"]],
      body: Object.entries(student.marks),
    });

    doc.save(`${student.name}.pdf`);
  };

  const submitServer = async () => {
    await axios.post("http://localhost:5000/students", students);
    alert("Saved to server");
  };

  return {
    subjects,
    students,
    history,
    newStudent,
    setNewStudent,
    newSubject,
    setNewSubject,
    undo,
    restoreData,
    addStudent,
    deleteStudent,
    updateMarks,
    updateLink,
    addSubject,
    removeSubject,
    exportPDF,
    submitServer,
    totalMarks: (marks) => totalMarks(marks),
    percentage: (marks) => percentage(marks, subjects),
    grade,
  };
}
