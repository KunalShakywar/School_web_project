import Select from "../../../../components/inputs/Select";
import { classFormOptions } from "./studentsData.jsx";

function StudentFormModal({
  showModal,
  editStudent,
  form,
  handleChange,
  handleSubmit,
  closeModal,
  setForm,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeModal}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {editStudent ? "Edit Student" : "Add Student"}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Roll Number
            <input
              type="text"
              name="roll"
              value={form.roll}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Student Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <Select
            value={form.className}
            options={classFormOptions}
            onChange={(e) => setForm({ ...form, className: e.target.value })}
            label="Class"
          />

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!editStudent}
              placeholder={editStudent ? "Leave blank to keep same" : ""}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Qualification
            <input
              type="text"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="e.g. 10th Pass"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Total Fees
            <input
              type="number"
              name="totalFees"
              value={form.totalFees}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Paid Fees
            <input
              type="number"
              name="paidFees"
              value={form.paidFees}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <div className="col-span-full flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
            >
              {editStudent ? "Update Student" : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentFormModal;
