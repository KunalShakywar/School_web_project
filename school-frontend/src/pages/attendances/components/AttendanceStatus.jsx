const AttendanceStatus = ({ loadingStudents, fetchError }) => {
  if (!loadingStudents && !fetchError) return null;

  return (
    <div className="mb-2 space-y-2">
      {loadingStudents && (
        <p className="text-sm text-slate-500">Loading students…</p>
      )}
      {fetchError && <p className="text-sm text-rose-500">{fetchError}</p>}
    </div>
  );
};

export default AttendanceStatus;
