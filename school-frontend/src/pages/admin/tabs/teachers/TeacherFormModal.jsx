function TeacherFormModal({
  open,
  editingId,
  form,
  setForm,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {editingId ? "Edit Teacher" : "Add Teacher"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Subject
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Qualification
            <input
              type="text"
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              placeholder="e.g. B.Ed"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editingId}
              placeholder={editingId ? "Leave blank to keep same" : ""}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            Phone
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <label className="space-y-1 text-sm text-gray-700 dark:text-gray-200 md:col-span-2">
            Photo URL
            <input
              type="url"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
              placeholder="https://..."
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-gray-700"
            />
          </label>

          <div className="col-span-full flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
            >
              {editingId ? "Update Teacher" : "Save Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherFormModal;
