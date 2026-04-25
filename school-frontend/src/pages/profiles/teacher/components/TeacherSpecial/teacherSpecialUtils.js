export const formatDate = (value) => {
  if (!value) return "Unknown date";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getSessionSummary = (record) => {
  const students = Array.isArray(record?.students) ? record.students : [];
  const total = students.length;
  const present = students.filter((student) => student.present).length;
  const absent = total - present;
  const percent = total === 0 ? 0 : Math.round((present / total) * 100);

  return { total, present, absent, percent };
};

export const parseSessionDate = (value) => {
  if (!value) return null;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const isSameDay = (left, right) => {
  if (!left || !right) return false;

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

export const isWithinLastDays = (date, days) => {
  if (!date) return false;

  const now = new Date();
  const threshold = new Date();
  threshold.setDate(now.getDate() - days);
  return date >= threshold;
};

export const filterRecentSavedSessions = (sessions, activeTab) => {
  const sortedSessions = Array.isArray(sessions) ? sessions : [];
  const today = new Date();

  switch (activeTab) {
    case "latest":
      return sortedSessions.slice(0, 1);
    case "today":
      return sortedSessions.filter((session) =>
        isSameDay(parseSessionDate(session?.date), today)
      );
    case "week":
      return sortedSessions.filter((session) =>
        isWithinLastDays(parseSessionDate(session?.date), 7)
      );
    case "older":
      return sortedSessions.filter((session) => {
        const parsedDate = parseSessionDate(session?.date);
        return parsedDate ? !isWithinLastDays(parsedDate, 7) : false;
      });
    case "all":
    default:
      return sortedSessions;
  }
};
