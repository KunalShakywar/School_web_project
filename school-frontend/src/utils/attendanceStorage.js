export const ATTENDANCE_PREFIX = "attendance-";
export const ATTENDANCE_DRAFT_PREFIX = "attendance-draft-";
export const ATTENDANCE_SESSION_PREFIX = "attendance-session-";

const getTeacherScope = (teacherIdentifier, teacherName) =>
  teacherIdentifier || teacherName || "default";

export const getTeacherAttendanceContext = (user) => {
  const teacherIdentifier =
    user?._id || user?.id || user?.email || user?.username || "";
  const teacherName =
    user?.name || user?.fullName || user?.displayName || user?.username || user?.email || "Teacher";

  return { teacherIdentifier, teacherName };
};

export const getAttendanceKey = (
  date,
  teacherIdentifier = null,
  teacherName = null,
  { draft = false, sessionId = null } = {}
) => {
  if (!date) return null;
  const scope = getTeacherScope(teacherIdentifier, teacherName);
  if (sessionId) {
    return `${ATTENDANCE_SESSION_PREFIX}${date}-${encodeURIComponent(sessionId)}`;
  }
  if (draft) {
    return teacherIdentifier || teacherName
      ? `${ATTENDANCE_DRAFT_PREFIX}${encodeURIComponent(scope)}-${date}`
      : `${ATTENDANCE_DRAFT_PREFIX}${date}`;
  }
  return teacherIdentifier || teacherName
    ? `${ATTENDANCE_PREFIX}${encodeURIComponent(scope)}-${date}`
    : `${ATTENDANCE_PREFIX}${date}`;
};

export const readAttendanceRecord = (date, teacherIdentifier = null, teacherName = null) => {
  if (!date) return null;

  const keysToTry = [
    getAttendanceKey(date, teacherIdentifier, teacherName, { draft: true }),
    getAttendanceKey(date, teacherIdentifier, teacherName),
    getAttendanceKey(date),
  ].filter(Boolean);

  try {
    for (const key of keysToTry) {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    }
    return null;
  } catch (error) {
    console.warn("Failed to read attendance record", date, error);
    return null;
  }
};

export const readAttendanceRecordFromKey = (key) => {
  if (!key || !key.startsWith(ATTENDANCE_PREFIX)) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Failed to parse attendance key", key, error);
    return null;
  }
};

const isSameAttendanceDate = (left, right) => {
  if (!left || !right) return false;
  const leftDate = new Date(left);
  const rightDate = new Date(right);

  if (Number.isNaN(leftDate.getTime()) || Number.isNaN(rightDate.getTime())) {
    return String(left) === String(right);
  }

  return (
    leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate()
  );
};

export const listAttendanceRecords = ({ teacherIdentifier = null, teacherName = null } = {}) => {
  try {
    return Object.keys(localStorage)
      .filter(
        (key) =>
          (key.startsWith(ATTENDANCE_SESSION_PREFIX) ||
            (key.startsWith(ATTENDANCE_PREFIX) &&
              !key.startsWith(ATTENDANCE_DRAFT_PREFIX))) &&
          key !== ATTENDANCE_DRAFT_PREFIX
      )
      .map((key) => ({
        key,
        record: readAttendanceRecordFromKey(key),
      }))
      .filter(({ record }) => Boolean(record))
      .filter(({ record }) => record?.recordType !== "draft")
      .filter(({ key, record }) => {
        if (!teacherIdentifier && !teacherName) return true;

        const recordTeacherIdentifier =
          record?.teacherIdentifier || record?.teacherId || record?.teacherEmail || "";
        const recordTeacherName = record?.teacherName || "";

        const matchesTeacher =
          (teacherIdentifier && recordTeacherIdentifier === teacherIdentifier) ||
          (teacherIdentifier && record?.teacherScope === teacherIdentifier) ||
          (teacherName && recordTeacherName === teacherName);

        if (matchesTeacher) return true;

        const isLegacyKey = key === getAttendanceKey(record?.date);
        return isLegacyKey && teacherName && recordTeacherName === teacherName;
      })
      .sort((a, b) => {
        const aDate = a.record?.submittedAt
          ? new Date(a.record.submittedAt).getTime()
          : a.record?.createdAt
          ? new Date(a.record.createdAt).getTime()
          : a.record?.date
          ? new Date(a.record.date).getTime()
          : 0;
        const bDate = b.record?.submittedAt
          ? new Date(b.record.submittedAt).getTime()
          : b.record?.createdAt
          ? new Date(b.record.createdAt).getTime()
          : b.record?.date
          ? new Date(b.record.date).getTime()
          : 0;
        return bDate - aDate;
      });
  } catch (error) {
    console.warn("Failed to list attendance records", error);
    return [];
  }
};

export const clearAttendanceDraftRecord = (
  date,
  teacherIdentifier = null,
  teacherName = null
) => {
  if (!date) return;

  try {
    const draftKey = getAttendanceKey(date, teacherIdentifier, teacherName, {
      draft: true,
    });
    const legacyKey = getAttendanceKey(date, teacherIdentifier, teacherName);

    if (draftKey) localStorage.removeItem(draftKey);
    if (legacyKey) localStorage.removeItem(legacyKey);
  } catch (error) {
    console.warn("Failed to clear attendance draft record", date, error);
  }
};

export const writeAttendanceRecord = (date, payload, options = {}) => {
  if (!date || !payload) return;
  try {
    const { submitted = false } = options;
    const teacherIdentifier =
      payload.teacherIdentifier || payload.teacherId || payload.teacherEmail || "";
    const teacherName = payload.teacherName || "";
    const sessionId =
      payload.sessionId ||
      (submitted ? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` : null);
    const scopedPayload = {
      ...payload,
      teacherIdentifier,
      teacherName,
      teacherScope: getTeacherScope(teacherIdentifier, teacherName),
      recordType: submitted ? "submitted" : "draft",
      submittedAt: submitted ? payload.submittedAt || new Date().toISOString() : payload.submittedAt || null,
      sessionId,
    };

    const key = getAttendanceKey(date, teacherIdentifier, teacherName, {
      draft: !submitted,
      sessionId: submitted ? sessionId : null,
    });

    localStorage.setItem(
      key,
      JSON.stringify(scopedPayload)
    );

    return key;
  } catch (error) {
    console.warn("Failed to write attendance record", date, error);
    return null;
  }
};

export const getLatestSubmittedAttendanceRecord = (
  date,
  teacherIdentifier = null,
  teacherName = null
) => {
  if (!date) return null;

  const records = listAttendanceRecords({ teacherIdentifier, teacherName });
  const match = records.find(({ record }) => isSameAttendanceDate(record?.date, date));
  return match?.record ?? null;
};

export const extractStudentList = (data) => {
  if (!data) return null;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.students)) return data.students;
  return null;
};

export const normalizeStudentList = (storedStudents, baseStudents) => {
  const normalized = baseStudents.map((base) => {
    const match =
      storedStudents &&
      storedStudents.find(
        (entry) =>
          entry &&
          (entry.id === base.id || entry.userId === base.userId)
      );
    return {
      ...base,
      present: match?.present ?? base.present ?? false,
    };
  });
  return normalized;
};
