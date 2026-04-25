// src/pages/AdminParents.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaUndo, FaPlus, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import Table from "../../../components/table/Table";

const dummyStudents = [
  { id: 1, name: "Rahul Sharma", className: "10-A" },
  { id: 2, name: "Aman Gupta", className: "9-B" },
  { id: 3, name: "Rohit Verma", className: "10-A" },
  { id: 4, name: "Aakash Jain", className: "8-C" }
];

const AdminParents = () => {
  const [parents, setParents] = useState([
    { id: 1, name: "Mr. Sharma", email: "sharma@example.com", students: [1], access: { marks:true, attendance:true, fees:true, notices:true }, status:"Active" },
    { id: 2, name: "Mrs. Gupta", email: "gupta@example.com", students: [2,3], access: { marks:true, attendance:true, fees:false, notices:true }, status:"Active" }
  ]);

  const [deletedParents, setDeletedParents] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", students:[], access:{marks:true,attendance:true,fees:true,notices:true}, status:"Active" });
  const [editParent, setEditParent] = useState(null);
  const [search, setSearch] = useState("");

  // Add / Edit parent
  const handleSubmit = () => {
    if(editParent){
      setParents(parents.map(p=>p.id===editParent.id ? {...form,id:p.id} : p));
      setEditParent(null);
    } else {
      setParents([...parents,{...form,id:Date.now()}]);
    }
    setForm({ name:"", email:"", students:[], access:{marks:true,attendance:true,fees:true,notices:true}, status:"Active" });
  };

  // Delete (soft delete)
  const handleDelete = (id) => {
    const toDelete = parents.find(p=>p.id===id);
    setDeletedParents([...deletedParents,toDelete]);
    setParents(parents.filter(p=>p.id!==id));
  };

  // Undo
  const handleUndo = () => {
    if(deletedParents.length>0){
      const lastDeleted = deletedParents[deletedParents.length-1];
      setParents([...parents,lastDeleted]);
      setDeletedParents(deletedParents.slice(0,-1));
    }
  };

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Parent List",20,20);
    let y=30;
    parents.forEach((p,index)=>{
      doc.setFontSize(12);
      doc.text(`${index+1}. ${p.name} (${p.email})`,20,y);
      const linkedStudents = p.students.map(sid=>dummyStudents.find(s=>s.id===sid)?.name).join(", ");
      y+=10;
      doc.text(`Students: ${linkedStudents}`,30,y);
      y+=10;
      const accessList = Object.entries(p.access).filter(([, value])=>value).map(([key])=>key).join(", ");
      doc.text(`Access: ${accessList}`,30,y);
      y+=10;
      doc.text(`Status: ${p.status}`,30,y);
      y+=15;
    });
    doc.save("parents_list.pdf");
  };

  // Filtered
  const filteredParents = parents.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 min-h-screen  dark:text-white">

      {/* Controls */}
      <div className="flex gap-3 flex-wrap mb-6">
        {/* Buttons */}
        <div className="flex gap-1 ">

        <button onClick={handleUndo} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-tl-lg rounded-bl-lg">
          <FaUndo/>
           <span className="hidden md:inline">Undo Delete</span>
        </button>
        <button onClick={exportPDF} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 ">
          <FaFilePdf/> 
            <span className="hidden md:inline">Export PDF</span>
        </button>
        <button onClick={()=>setEditParent({})} className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-tr-lg rounded-br-lg ">
          <FaPlus/> <span className="hidden md:inline">Add Parent</span>
        </button>
        </div>
      </div>

      {/* Add / Edit Form */}
      {editParent!==null && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">{editParent.id?"Edit Parent":"Add Parent"}</h2>
          <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 w-full mb-2 rounded dark:bg-gray-900"/>
          <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 w-full mb-2 rounded dark:bg-gray-900"/>
          <select multiple value={form.students} onChange={e=>setForm({...form,students:Array.from(e.target.selectedOptions,s=>Number(s.value))})} className="border p-2 w-full mb-2 rounded dark:bg-gray-900">
            {dummyStudents.map(s=><option key={s.id} value={s.id}>{s.name} ({s.className})</option>)}
          </select>
          <div className="flex gap-2 mb-2">
            {["marks","attendance","fees","notices"].map(key=>(
              <label key={key} className="flex items-center gap-1">
                <input type="checkbox" checked={form.access[key]} onChange={e=>setForm({...form,access:{...form.access,[key]:e.target.checked}})}/>
                {key.charAt(0).toUpperCase()+key.slice(1)}
              </label>
            ))}
          </div>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="border p-2 rounded dark:bg-gray-900 mb-2">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button onClick={()=>setEditParent(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}

      {/* Parent Table */}
      <Table
        title="Parents"
        subtitle={`Showing ${filteredParents.length} record${filteredParents.length === 1 ? "" : "s"}`}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search parents..."
        data={filteredParents}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "students",
            label: "Linked Students",
            render: (p) =>
              p.students
                .map((sid) => dummyStudents.find((s) => s.id === sid)?.name)
                .filter(Boolean)
                .join(", "),
          },
          {
            key: "access",
            label: "Access",
            render: (p) =>
              Object.entries(p.access)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(", "),
          },
          { key: "status", label: "Status" },
        ]}
        actions={(p) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => { setEditParent(p); setForm(p); }}
              className="rounded bg-green-500 px-2 py-1 text-white"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="rounded bg-red-500 px-2 py-1 text-white"
            >
              <FaTrash />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default AdminParents;
