import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

import {
    FaUserPlus,
    FaTrash,
    FaUndo,
    FaFilePdf,
    FaLink,
    FaPlus,
    FaSave,
    FaSearch
} from "react-icons/fa";

export default function MarksManager() {

    const defaultSubjects = ["Maths", "Science", "English"]

    const defaultStudents = [

        {
            id: 1,
            roll: "101",
            name: "Rahul Sharma",
            googleLink: "",
            marks: { Maths: 85, Science: 80, English: 75 }
        },

        {
            id: 2,
            roll: "102",
            name: "Aman Verma",
            googleLink: "",
            marks: { Maths: 70, Science: 65, English: 60 }
        },

        {
            id: 3,
            roll: "103",
            name: "Priya Singh",
            googleLink: "",
            marks: { Maths: 92, Science: 88, English: 91 }
        },
        {
            id: 1,
            roll: "101",
            name: "Rahul Sharma",
            googleLink: "",
            marks: { Maths: 85, Science: 80, English: 75 }
        },

        {
            id: 2,
            roll: "102",
            name: "Aman Verma",
            googleLink: "",
            marks: { Maths: 70, Science: 65, English: 60 }
        },

        {
            id: 3,
            roll: "103",
            name: "Priya Singh",
            googleLink: "",
            marks: { Maths: 92, Science: 88, English: 91 }
        }
        ,
        {
            id: 1,
            roll: "101",
            name: "Rahul Sharma",
            googleLink: "",
            marks: { Maths: 85, Science: 80, English: 75 }
        },

        {
            id: 2,
            roll: "102",
            name: "Aman Verma",
            googleLink: "",
            marks: { Maths: 70, Science: 65, English: 60 }
        },

        {
            id: 3,
            roll: "103",
            name: "Priya Singh",
            googleLink: "",
            marks: { Maths: 92, Science: 88, English: 91 }
        }


    ]

    const [subjects, setSubjects] = useState(defaultSubjects)
    const [students, setStudents] = useState(defaultStudents)
    const [history, setHistory] = useState([])

    const [newStudent, setNewStudent] = useState({ roll: "", name: "" })
    const [newSubject, setNewSubject] = useState("")
    const [search, setSearch] = useState("")



    // history
    const saveHistory = () => {
        setHistory(prev => [...prev, students])
    }


    // undo
    const undo = () => {

        if (history.length === 0) return

        const last = history[history.length - 1]

        setStudents(last)

        setHistory(history.slice(0, -1))

    }


    // restore
    const restoreData = () => {
        setStudents(defaultStudents)
        setSubjects(defaultSubjects)
    }


    // add student
    const addStudent = () => {

        if (!newStudent.roll || !newStudent.name) return

        saveHistory()

        const marks = {}
        subjects.forEach(s => marks[s] = 0)

        setStudents([
            ...students,
            {
                id: Date.now(),
                roll: newStudent.roll,
                name: newStudent.name,
                googleLink: "",
                marks
            }
        ])

        setNewStudent({ roll: "", name: "" })

    }


    // delete student
    const deleteStudent = (id) => {

        saveHistory()

        setStudents(students.filter(s => s.id !== id))

    }


    // update marks
    const updateMarks = (id, sub, value) => {

        setStudents(

            students.map(s => {

                if (s.id !== id) return s

                return {
                    ...s,
                    marks: {
                        ...s.marks,
                        [sub]: Number(value)
                    }
                }

            })

        )

    }


    // update link
    const updateLink = (id, value) => {

        setStudents(
            students.map(s =>
                s.id === id
                    ? { ...s, googleLink: value }
                    : s
            )
        )

    }


    // add subject
    const addSubject = () => {

        if (!newSubject) return

        saveHistory()

        setSubjects([...subjects, newSubject])

        setStudents(

            students.map(s => ({

                ...s,
                marks: {
                    ...s.marks,
                    [newSubject]: 0
                }

            }))

        )

        setNewSubject("")

    }


    // remove subject
    const removeSubject = (sub) => {

        saveHistory()

        setSubjects(subjects.filter(s => s !== sub))

        setStudents(

            students.map(stu => {

                const m = { ...stu.marks }

                delete m[sub]

                return { ...stu, marks: m }

            })

        )

    }


    // total
    const totalMarks = (marks) => {
        return Object.values(marks).reduce((a, b) => a + b, 0)
    }


    // percentage
    const percentage = (marks) => {

        const total = totalMarks(marks)

        const max = subjects.length * 100

        return ((total / max) * 100).toFixed(1)

    }


    // grade
    const grade = (p) => {

        if (p >= 90) return "A+"
        if (p >= 80) return "A"
        if (p >= 70) return "B"
        if (p >= 60) return "C"
        if (p >= 50) return "D"

        return "F"

    }


    // pdf
    const exportPDF = (student) => {

        const doc = new jsPDF()

        doc.text("Student Report Card", 20, 20)

        doc.text(`Name: ${student.name}`, 20, 40)
        doc.text(`Roll: ${student.roll}`, 20, 50)

        const rows = Object.entries(student.marks)

        autoTable(doc, {
            startY: 70,
            head: [["Subject", "Marks"]],
            body: rows
        })

        doc.save(student.name + ".pdf")

    }


    // server
    const submitServer = async () => {

        await axios.post(
            "http://localhost:5000/students",
            students
        )

        alert("Saved to server")

    }


    // search
    const filtered = students.filter(s =>

        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.roll.includes(search)

    )


    // pagination logic
    const indexOfLast = currentPage * studentsPerPage
    const indexOfFirst = indexOfLast - studentsPerPage

    const currentStudents = filtered.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filtered.length / studentsPerPage)


    return (

        <div>

            <h1 className="text-2xl font-bold mb-6">
                Marks Management System
            </h1>


            {/* toolbar */}

            <div className="flex gap-2 mb-6 flex-wrap">

                <button
                    onClick={undo}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    <FaUndo />
                </button>

                <button
                    onClick={restoreData}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    <FaTrash />
                </button>

                <button
                    onClick={submitServer}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    <FaSave />
                </button>

            </div>


            {/* add student */}

            <div className="flex gap-2 mb-6">

                <input
                    placeholder="Roll"
                    value={newStudent.roll}
                    onChange={e => setNewStudent({ ...newStudent, roll: e.target.value })}
                    className="border p-2"
                />

                <input
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="border p-2"
                />

                <button
                    onClick={addStudent}
                    className="bg-green-500 text-white px-4"
                >
                    <FaUserPlus />
                </button>

            </div>


            {/* add subject */}

            <div className="flex gap-2 mb-6">

                <input
                    placeholder="New Subject"
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    className="border p-2"
                />

                <button
                    onClick={addSubject}
                    className="bg-blue-500 text-white px-4"
                >
                    <FaPlus />
                </button>

            </div>


            {/* search */}

            <input
                placeholder="Search student"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border p-2 mb-4 w-full"
            />


            <div className="overflow-x-auto">

                <table className="w-full text-center border">

                    <thead className="bg-gray-200">

                        <tr>

                            <th>Roll</th>
                            <th>Name</th>

                            {subjects.map(sub => (

                                <th key={sub}>
                                    {sub}

                                    <button
                                        onClick={() => removeSubject(sub)}
                                        className="ml-2 text-red-500"
                                    >
                                        <FaTrash />
                                    </button>

                                </th>

                            ))}

                            <th>Total</th>
                            <th>%</th>
                            <th>Grade</th>
                            <th>Link</th>
                            <th>PDF</th>
                            <th>Delete</th>

                        </tr>

                    </thead>


                    <tbody>

                        {currentStudents.map(s => {

                            const p = percentage(s.marks)

                            return (

                                <tr key={s.id} className="border-t">

                                    <td>{s.roll}</td>
                                    <td>{s.name}</td>

                                    {subjects.map(sub => (

                                        <td key={sub}>

                                            <input
                                                type="number"
                                                value={s.marks[sub] || 0}
                                                onChange={e => updateMarks(s.id, sub, e.target.value)}
                                                className="border w-16 text-center"
                                            />

                                        </td>

                                    ))}

                                    <td>{totalMarks(s.marks)}</td>
                                    <td>{p}%</td>
                                    <td>{grade(p)}</td>

                                    <td>

                                        <input
                                            value={s.googleLink}
                                            onChange={e => updateLink(s.id, e.target.value)}
                                            className="border p-1"
                                        />

                                        {s.googleLink && (

                                            <a
                                                href={s.googleLink}
                                                target="_blank"
                                                className="text-blue-500"
                                            >
                                                <FaLink />
                                            </a>

                                        )}

                                    </td>

                                    <td>

                                        <button
                                            onClick={() => exportPDF(s)}
                                            className="bg-green-500 text-white px-2 py-1"
                                        >
                                            <FaFilePdf />
                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            onClick={() => deleteStudent(s.id)}
                                            className="bg-red-500 text-white px-2 py-1"
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            )

                        })}

                    </tbody>

                </table>

            </div>


            {/* pagination */}

            <div className="flex justify-center gap-2 mt-4">

                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-300 rounded"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (

                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>

                ))}

                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 rounded"
                >
                    Next
                </button>

            </div>

        </div>

    )

}