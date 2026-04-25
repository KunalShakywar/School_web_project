// src/pages/Parents.jsx
import React, { useState } from "react";
import { FaDownload, FaLink, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import Table from "../../components/table/Table";

const Parents = () => {

  // Dummy student data
  const [student] = useState({
    name: "Rahul Sharma",
    roll: "101",
    className: "10-A",
    admissionNo: "4567",
    photo: "https://via.placeholder.com/100",
    marks: {
      Maths: 85,
      Science: 80,
      English: 75,
      Hindi: 90
    },
    attendance: {
      totalDays: 120,
      present: 110,
      absent: 10
    },
    feeStatus: {
      total: 25000,
      paid: 20000,
      pending: 5000
    },
    teacherRemarks: "Rahul is performing well in mathematics but needs improvement in English writing.",
    notices: [
      "PTM on 15 July",
      "Holiday on 10 June",
      "Sports day next month"
    ],
    googleLink: "https://classroom.google.com/"
  });

  // Generate PDF Report
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Student Report Card`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 30);
    doc.text(`Roll No: ${student.roll}`, 20, 40);
    doc.text(`Class: ${student.className}`, 20, 50);
    doc.text(`Admission No: ${student.admissionNo}`, 20, 60);

    let y = 70;
    doc.text("Marks:", 20, y);
    Object.entries(student.marks).forEach(([subject, marks]) => {
      y += 10;
      doc.text(`${subject}: ${marks}`, 30, y);
    });

    y += 10;
    doc.text(`Total Marks: ${Object.values(student.marks).reduce((a,b)=>a+b,0)}`, 20, y);
    doc.text(`Percentage: ${Math.round(Object.values(student.marks).reduce((a,b)=>a+b,0)/Object.values(student.marks).length)}%`, 20, y+10);

    y += 30;
    doc.text("Attendance:", 20, y);
    doc.text(`Total Days: ${student.attendance.totalDays}`, 30, y+10);
    doc.text(`Present: ${student.attendance.present}`, 30, y+20);
    doc.text(`Absent: ${student.attendance.absent}`, 30, y+30);
    doc.text(`Attendance %: ${Math.round((student.attendance.present/student.attendance.totalDays)*100)}%`, 30, y+40);

    y += 60;
    doc.text("Fee Status:", 20, y);
    doc.text(`Total: ₹${student.feeStatus.total}`, 30, y+10);
    doc.text(`Paid: ₹${student.feeStatus.paid}`, 30, y+20);
    doc.text(`Pending: ₹${student.feeStatus.pending}`, 30, y+30);

    y += 60;
    doc.text("Teacher Remarks:", 20, y);
    doc.text(student.teacherRemarks, 30, y+10);

    y += 30;
    doc.text("Notices:", 20, y);
    student.notices.forEach((notice, index) => {
      doc.text(`- ${notice}`, 30, y + 10*(index+1));
    });

    doc.save(`${student.name}_report.pdf`);
  };

  return (
    <div className="p-6 min-h-screen dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Parent Dashboard</h1>

      {/* Student Profile */}
      <div className="flex items-center gap-4 mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <img src={student.photo} alt="Profile" className="w-20 h-20 rounded-full"/>
        <div>
          <p><span className="font-semibold">Name:</span> {student.name}</p>
          <p><span className="font-semibold">Roll No:</span> {student.roll}</p>
          <p><span className="font-semibold">Class:</span> {student.className}</p>
          <p><span className="font-semibold">Admission No:</span> {student.admissionNo}</p>
        </div>
      </div>

      {/* Marks */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Marks / Report Card</h2>
        <Table
          title="Marks"
          subtitle="Subject wise report"
          showSearch={false}
          showPagination={false}
          data={Object.entries(student.marks).map(([subject, marks]) => ({ subject, marks }))}
          columns={[
            { key: "subject", label: "Subject" },
            { key: "marks", label: "Marks" },
          ]}
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-3 dark:bg-gray-800">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-lg font-semibold">
              {Object.values(student.marks).reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-3 dark:bg-gray-800">
            <p className="text-sm text-slate-500">Percentage</p>
            <p className="text-lg font-semibold">
              {Math.round(
                Object.values(student.marks).reduce((a, b) => a + b, 0) /
                  Object.values(student.marks).length
              )}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Attendance</h2>
        <p>Total Days: {student.attendance.totalDays}</p>
        <p>Present: {student.attendance.present}</p>
        <p>Absent: {student.attendance.absent}</p>
        <p>Attendance %: {Math.round((student.attendance.present/student.attendance.totalDays)*100)}%</p>
      </div>

      {/* Fee Status */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fee Status</h2>
        <p>Total: ₹{student.feeStatus.total}</p>
        <p>Paid: ₹{student.feeStatus.paid}</p>
        <p>Pending: ₹{student.feeStatus.pending}</p>
      </div>

      {/* Teacher Remarks */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Teacher Remarks</h2>
        <p>{student.teacherRemarks}</p>
      </div>

      {/* Notices */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notices</h2>
        <ul className="list-disc list-inside">
          {student.notices.map((n,i)=>(
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>

      {/* Google Link */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Class Resources</h2>
        <a href={student.googleLink} target="_blank" className="text-blue-500 flex items-center gap-2">
          <FaLink/> Open Google Classroom
        </a>
      </div>

      {/* Export PDF Button */}
      <button
        onClick={exportPDF}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        <FaFilePdf/> Download Report Card (PDF)
      </button>

    </div>
  )
}

export default Parents;
