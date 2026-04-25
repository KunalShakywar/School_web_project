import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";

const AttendanceStats = ({
  totalStudents,
  totalPresent,
  totalAbsent,
  percentage,
}) => {
  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      color: "text-blue-700",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100 text-blue-600",
      icon: FiUsers,
    },
    {
      label: "Present",
      value: totalPresent,
      color: "text-emerald-700",
      bg: "bg-green-50",
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: FiCheckCircle,
    },
    {
      label: "Absent",
      value: totalAbsent,
      color: "text-rose-700",
      bg: "bg-red-50",
      iconBg: "bg-rose-100 text-rose-600",
      icon: FiXCircle,
    },
    {
      label: "Attendance",
      value: `${percentage}%`,
      color:
        percentage < 50
          ? "text-rose-600"
          : percentage < 75
          ? "text-yellow-600"
          : "text-emerald-600",
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100 text-yellow-600",
      icon: FiTrendingUp,
    },
  ];

  return (
    <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
  {stats.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.label}
        className={`rounded-xl ${item.bg} p-3 shadow-sm transition hover:shadow`}
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          
          {/* ICON */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.iconBg}`}
          >
            <Icon size={14} />
          </div>

          {/* LABEL */}
          <p className="text-[10px] font-medium text-slate-500">
            {item.label}
          </p>
        </div>

        {/* VALUE */}
        <p
          className={`mt-2 text-lg font-semibold ${item.color}`}
        >
          {item.value}
        </p>

        {/* PROGRESS */}
        {item.label === "Attendance" && (
          <div className="mt-2 h-1 w-full rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    );
  })}
</div>
  );
};

export default AttendanceStats;