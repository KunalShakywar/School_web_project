export const dummyClasses = ["All", "8th", "9th", "10th", "11th", "12th"];

export const emptyForm = {
  title: "",
  description: "",
  type: "notice",
  classes: ["All"],
  date: "",
  popup: false,
  isPublished: true,
};

export const toInputDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export const toDisplayDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const normalizeClasses = (value) => {
  if (!Array.isArray(value)) return ["All"];
  const classes = value.map((item) => String(item).trim()).filter(Boolean);
  return classes.length > 0 ? classes : ["All"];
};

export const stripFormOnlyFields = (announcement) => {
  const { _id, id, createdAt, updatedAt, __v, ...payload } = announcement;
  return payload;
};
