
const AttendanceDashboardHeader = ({ statusMessage }) => {
  return (
    <div className="mb-6 flex items-center justify-between">

      <h2 className="flex items-center gap-2 text-sm uppercase font-bold text-slate-900">
        Attendance Dashboard
      </h2>

      {statusMessage && (
        <p className="text-sm text-slate-500 whitespace-nowrap">
          {statusMessage}
        </p>
      )}

    </div>
  );
};

export default AttendanceDashboardHeader;