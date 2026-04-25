export const emptyClassForm = {
  id: null,
  className: "",
  session: "2025-26",
  description: "",
  coordinator: "",
  examPattern: "",
  subjects: [],
};

export const emptySubjectForm = {
  name: "",
  units: "",
  assessment: "",
  resources: "",
  notes: "",
};

export const parseList = (value) =>
  value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

export const normalizeSubject = (subject) => ({
  name: subject?.name || subject?.subject || subject?.title || "",
  units: Array.isArray(subject?.units)
    ? subject.units
    : parseList(subject?.units || subject?.topics || subject?.chapters || ""),
  assessment: subject?.assessment || subject?.evaluation || "",
  resources: Array.isArray(subject?.resources)
    ? subject.resources
    : parseList(subject?.resources || ""),
  notes: subject?.notes || subject?.remarks || "",
});

export const normalizeClassItem = (item, index) => ({
  id: item?.id || item?._id || `${item?.className || "class"}-${index}`,
  className: item?.className || item?.class || item?.title || "",
  session: item?.session || item?.academicYear || item?.year || "2025-26",
  description: item?.description || item?.overview || "",
  coordinator: item?.coordinator || item?.teacher || item?.owner || "",
  examPattern: item?.examPattern || item?.pattern || "",
  subjects: Array.isArray(item?.subjects)
    ? item.subjects.map(normalizeSubject)
    : [],
});
