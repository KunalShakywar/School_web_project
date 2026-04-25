import {
  FaPlus,
  FaUndo,
  FaFilePdf,
  FaBell,
} from "react-icons/fa";

export function AnnouncementHeader() {
  return (
    <h1 className="flex items-center gap-2 text-xl font-bold md:text-3xl">
 
    </h1>
  );
}

export function AnnouncementToolbar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  classFilter,
  setClassFilter,
  classOptions,
  onUndo,
  onExportPdf,
  onCreateNotice,
  onCreateNews,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded border px-3 py-2 dark:bg-gray-800"
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="rounded border px-3 py-2 dark:bg-gray-800"
      >
        <option value="All">All Types</option>
        <option value="notice">Notice</option>
        <option value="news">News</option>
      </select>

      <select
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
        className="rounded border px-3 py-2 dark:bg-gray-800"
      >
        {classOptions.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>

      <button onClick={onUndo} className="flex items-center gap-2 rounded bg-yellow-500 px-4 py-2 text-white">
        <FaUndo />
        <span className="hidden md:inline">Undo Delete</span>
      </button>

      <button onClick={onExportPdf} className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white">
        <FaFilePdf />
        <span className="hidden md:inline">Export PDF</span>
      </button>

      <button onClick={onCreateNotice} className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white">
        <FaPlus />
        <span className="hidden md:inline">Add Notice</span>
      </button>

      <button onClick={onCreateNews} className="flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-white">
        <FaPlus />
        <span className="hidden md:inline">Add News</span>
      </button>
    </div>
  );
}

export function AnnouncementEditor({
  editAnnounce,
  form,
  setForm,
  onSave,
  onCancel,
  classOptions,
}) {
  if (editAnnounce === null) return null;

  return (
    <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
      <h2 className="mb-3 text-xl font-semibold">
        {editAnnounce._id || editAnnounce.id ? "Edit Announcement" : "Add Announcement"}
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded border p-2 dark:bg-gray-900"
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="rounded border p-2 dark:bg-gray-900"
        >
          <option value="notice">Notice</option>
          <option value="news">News</option>
        </select>
      </div>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="mt-3 w-full rounded border p-2 dark:bg-gray-900"
        rows={4}
      />

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <select
          multiple
          value={form.classes}
          onChange={(e) =>
            setForm({
              ...form,
              classes: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          className="rounded border p-2 dark:bg-gray-900"
        >
          {classOptions.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="rounded border p-2 dark:bg-gray-900"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.popup}
            onChange={(e) => setForm({ ...form, popup: e.target.checked })}
          />
          Show as popup
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
          />
          Published
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onSave} className="rounded bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
        <button onClick={onCancel} className="rounded bg-gray-400 px-4 py-2 text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}
