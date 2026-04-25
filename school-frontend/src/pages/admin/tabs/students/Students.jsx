import { FaEdit, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import Select from "../../../../components/inputs/Select";
import Table from "../../../../components/table/Table";
import StudentFormModal from "./StudentFormModal.jsx";
import StudentStats from "./StudentStats.jsx";
import { useStudents } from "./useStudents.js";

function AllStudents() {
  const {
    students,
    loading,
    fetchError,
    showModal,
    editStudent,
    form,
    classFilter,
    classOptions,
    filteredStudents,
    totalPaid,
    totalRemaining,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    openModalForCreate,
    closeModal,
    setClassFilter,
    setForm,
  } = useStudents();

  const columns = ["roll", "name", "className", "qualification", "phone", "email", "totalFees", "paidFees"];

  return (
    <div>
  
      <StudentStats
        totalStudents={students.length}
        totalPaid={totalPaid}
        totalRemaining={totalRemaining}
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Select
          value={classFilter}
          options={classOptions}
          onChange={(e) => setClassFilter(e.target.value)}
        />

        <button
          onClick={openModalForCreate}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <FaPlus /> Add Student
        </button>
      </div>

      {loading && <p className="mb-2 text-sm text-slate-500">Loading students…</p>}
      {fetchError && <p className="mb-2 text-sm text-rose-500">{fetchError}</p>}

      <div className="w-full overflow-x-auto">
        <Table
          columns={columns}
          data={filteredStudents}
          actions={(row) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(row)}
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          )}
        />
      </div>

      <StudentFormModal
        showModal={showModal}
        editStudent={editStudent}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        setForm={setForm}
      />
    </div>
  );
}

export default AllStudents;
