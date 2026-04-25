import { AnnouncementEditor, AnnouncementHeader, AnnouncementToolbar } from "./announcementHelpers.jsx";
import AnnouncementTable from "./AnnouncementTable.jsx";
import { emptyForm } from "./announcementUtils.jsx";
import { useAnnouncements } from "./useAnnouncements.js";

function AdminAnnouncements() {
  const {
    filteredAnnouncements,
    classOptions,
    editAnnounce,
    form,
    setForm,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    classFilter,
    setClassFilter,
    loading,
    error,
    setEditAnnounce,
    openCreateForm,
    openEditForm,
    handleSubmit,
    handleDelete,
    handleUndo,
    exportPDF,
  } = useAnnouncements();

  return (
    <div className="space-y-6">
      <AnnouncementHeader />

      <AnnouncementToolbar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        classOptions={classOptions}
        onUndo={handleUndo}
        onExportPdf={exportPDF}
        onCreateNotice={() => openCreateForm("notice")}
        onCreateNews={() => openCreateForm("news")}
      />

      {error && <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <AnnouncementEditor
        editAnnounce={editAnnounce}
        form={form}
        setForm={setForm}
        onSave={handleSubmit}
        onCancel={() => {
          setEditAnnounce(null);
          setForm(emptyForm);
        }}
        classOptions={classOptions}
      />

      <AnnouncementTable
        data={filteredAnnouncements}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />

      {loading && (
        <p className="text-sm text-slate-500">Loading announcements from the server...</p>
      )}
    </div>
  );
}

export default AdminAnnouncements;
