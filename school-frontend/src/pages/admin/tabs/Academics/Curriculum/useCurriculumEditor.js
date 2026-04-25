import { useEffect, useMemo, useState } from "react";
import {
  CURRICULUM_UPDATED_EVENT,
  readCurriculumData,
  saveCurriculumData,
} from "../../../../../utils/curriculumStorage";
import {
  emptyClassForm,
  emptySubjectForm,
  normalizeClassItem,
  normalizeSubject,
  parseList,
} from "./curriculumData.jsx";

export function useCurriculumEditor() {
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classForm, setClassForm] = useState(emptyClassForm);
  const [subjectForm, setSubjectForm] = useState(emptySubjectForm);
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingSubjectIndex, setEditingSubjectIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await readCurriculumData();
        if (!cancelled) setCurriculum(data);
      } catch {
        if (!cancelled) {
          setError("Unable to load curriculum from the backend.");
          setCurriculum([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    sync();
    window.addEventListener(CURRICULUM_UPDATED_EVENT, sync);

    return () => {
      cancelled = true;
      window.removeEventListener(CURRICULUM_UPDATED_EVENT, sync);
    };
  }, []);

  const normalizedCurriculum = useMemo(
    () => curriculum.map(normalizeClassItem),
    [curriculum]
  );

  const totalSubjects = normalizedCurriculum.reduce(
    (count, item) => count + item.subjects.length,
    0
  );

  const resetForms = () => {
    setClassForm(emptyClassForm);
    setSubjectForm(emptySubjectForm);
    setEditingClassId(null);
    setEditingSubjectIndex(null);
  };

  const handleEditClass = (item) => {
    setEditingClassId(item.id);
    setClassForm({
      id: item.id,
      className: item.className,
      session: item.session,
      description: item.description,
      coordinator: item.coordinator,
      examPattern: item.examPattern,
      subjects: item.subjects,
    });
    setSubjectForm(emptySubjectForm);
    setEditingSubjectIndex(null);
  };

  const handleDeleteClass = async (id) => {
    const next = curriculum.filter((item, index) => normalizeClassItem(item, index).id !== id);
    setCurriculum(next);
    try {
      await saveCurriculumData(next);
      if (editingClassId === id) resetForms();
    } catch {
      setError("Unable to delete curriculum item on the backend.");
    }
  };

  const handleSaveClass = (event) => {
    event.preventDefault();
    if (!classForm.className.trim()) return;

    const payload = {
      ...classForm,
      className: classForm.className.trim(),
      session: classForm.session.trim(),
      description: classForm.description.trim(),
      coordinator: classForm.coordinator.trim(),
      examPattern: classForm.examPattern.trim(),
      subjects: classForm.subjects.map(normalizeSubject),
      id: classForm.id || Date.now().toString(),
    };

    const next = editingClassId
      ? curriculum.map((item, index) => {
          const normalized = normalizeClassItem(item, index);
          return normalized.id === editingClassId ? payload : item;
        })
      : [...curriculum, payload];

    setCurriculum(next);
    saveCurriculumData(next)
      .then(() => resetForms())
      .catch(() => setError("Unable to save curriculum to the backend."));
  };

  const handleSaveSubject = (event) => {
    event.preventDefault();
    if (!subjectForm.name.trim()) return;

    const subjectPayload = {
      name: subjectForm.name.trim(),
      units: parseList(subjectForm.units),
      assessment: subjectForm.assessment.trim(),
      resources: parseList(subjectForm.resources),
      notes: subjectForm.notes.trim(),
    };

    setClassForm((current) => {
      const subjects = [...current.subjects];
      if (editingSubjectIndex !== null) {
        subjects[editingSubjectIndex] = subjectPayload;
      } else {
        subjects.push(subjectPayload);
      }
      return { ...current, subjects };
    });

    setSubjectForm(emptySubjectForm);
    setEditingSubjectIndex(null);
  };

  const handleEditSubject = (index) => {
    const subject = classForm.subjects[index];
    if (!subject) return;

    setEditingSubjectIndex(index);
    setSubjectForm({
      name: subject.name || "",
      units: Array.isArray(subject.units) ? subject.units.join(", ") : "",
      assessment: subject.assessment || "",
      resources: Array.isArray(subject.resources) ? subject.resources.join(", ") : "",
      notes: subject.notes || "",
    });
  };

  const handleDeleteSubject = (index) => {
    setClassForm((current) => ({
      ...current,
      subjects: current.subjects.filter((_, subjectIndex) => subjectIndex !== index),
    }));
    if (editingSubjectIndex === index) {
      setSubjectForm(emptySubjectForm);
      setEditingSubjectIndex(null);
    }
  };

  return {
    normalizedCurriculum,
    totalSubjects,
    loading,
    error,
    classForm,
    setClassForm,
    subjectForm,
    setSubjectForm,
    editingClassId,
    editingSubjectIndex,
    resetForms,
    handleEditClass,
    handleDeleteClass,
    handleSaveClass,
    handleSaveSubject,
    handleEditSubject,
    handleDeleteSubject,
  };
}
