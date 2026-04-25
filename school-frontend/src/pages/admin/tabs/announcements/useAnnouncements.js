import { useEffect, useMemo, useState } from "react";
import {
  dummyClasses,
  emptyForm,
  normalizeClasses,
  stripFormOnlyFields,
  toInputDate,
} from "./announcementUtils.jsx";
import {
  createAnnouncement,
  readAnnouncements,
  removeAnnouncement,
  updateAnnouncement,
} from "../../../../utils/announcementsApi";
import { exportAnnouncementsPdf } from "./announcementPdf.js";

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [deletedAnnouncements, setDeletedAnnouncements] = useState([]);
  const [editAnnounce, setEditAnnounce] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");
      setAnnouncements(await readAnnouncements());
    } catch (fetchError) {
      console.error("Failed to load announcements:", fetchError);
      setError("Unable to load announcements from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    const handleRefresh = () => loadAnnouncements();
    window.addEventListener("announcements-updated", handleRefresh);
    return () => window.removeEventListener("announcements-updated", handleRefresh);
  }, []);

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();
    return announcements.filter((announcement) => {
      const matchesSearch =
        !query ||
        announcement.title?.toLowerCase().includes(query) ||
        announcement.description?.toLowerCase().includes(query);
      const matchesType = typeFilter === "All" || announcement.type === typeFilter;
      const matchesClass = classFilter === "All" || (announcement.classes || []).includes(classFilter);
      return matchesSearch && matchesType && matchesClass;
    });
  }, [announcements, search, typeFilter, classFilter]);

  const classOptions = useMemo(() => {
    const merged = new Set([
      ...dummyClasses,
      ...announcements.flatMap((announcement) => announcement.classes || []),
    ]);
    return Array.from(merged);
  }, [announcements]);

  const openCreateForm = (type = "notice") => {
    setEditAnnounce({});
    setForm({ ...emptyForm, type });
  };

  const openEditForm = (announcement) => {
    setEditAnnounce(announcement);
    setForm({
      title: announcement.title || "",
      description: announcement.description || "",
      type: announcement.type || "notice",
      classes: announcement.classes?.length ? announcement.classes : ["All"],
      date: toInputDate(announcement.date),
      popup: Boolean(announcement.popup),
      isPublished: announcement.isPublished !== false,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      type: form.type,
      classes: normalizeClasses(form.classes),
      date: form.date || new Date().toISOString(),
      popup: Boolean(form.popup),
      isPublished: Boolean(form.isPublished),
    };

    if (!payload.title || !payload.description) {
      setError("Title and description are required.");
      return;
    }

    try {
      setError("");
      if (editAnnounce?._id || editAnnounce?.id) {
        await updateAnnouncement(editAnnounce._id || editAnnounce.id, payload);
      } else {
        await createAnnouncement(payload);
      }
      setEditAnnounce(null);
      setForm(emptyForm);
      await loadAnnouncements();
    } catch (saveError) {
      console.error("Failed to save announcement:", saveError);
      setError("Unable to save announcement.");
    }
  };

  const handleDelete = async (announcement) => {
    const announcementId = announcement._id || announcement.id;
    if (!announcementId) return;

    try {
      await removeAnnouncement(announcementId);
      setDeletedAnnouncements((current) => [...current, announcement]);
      await loadAnnouncements();
    } catch (deleteError) {
      console.error("Failed to delete announcement:", deleteError);
      setError("Unable to delete announcement.");
    }
  };

  const handleUndo = async () => {
    if (deletedAnnouncements.length === 0) return;
    const lastDeleted = deletedAnnouncements[deletedAnnouncements.length - 1];

    try {
      await createAnnouncement(stripFormOnlyFields(lastDeleted));
      setDeletedAnnouncements((current) => current.slice(0, -1));
      await loadAnnouncements();
    } catch (undoError) {
      console.error("Failed to restore announcement:", undoError);
      setError("Unable to restore announcement.");
    }
  };

  const exportPDF = () => {
    exportAnnouncementsPdf(filteredAnnouncements);
  };

  return {
    announcements,
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
  };
}
