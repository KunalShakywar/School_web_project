import {
  FiLayers,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
  FiXCircle,
  FiActivity,
} from "react-icons/fi";

const TeacherSpecialSummaryView = ({
  totalSessions,
  overallPercent,
  latestSummary,
  latestSession,
}) => {
  const summaryCards = [
    {
      label: "Total sessions",
      value: totalSessions,
      valueClass: "text-slate-900",
      icon: FiLayers,
    },
    {
      label: "Overall present",
      value: `${overallPercent}%`,
      valueClass: "text-emerald-600",
      icon: FiTrendingUp,
    },
    {
      label: "Latest total",
      value: latestSummary.total,
      valueClass: "text-blue-600",
      icon: FiBarChart2,
    },
    {
      label: "Latest present",
      value: latestSummary.present,
      valueClass: "text-emerald-600",
      icon: FiCheckCircle,
    },
  ];

  return (
    <section className="space-y-6">

      {/* TOP CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                <Icon />
                {card.label}
              </p>

              <p className={`mt-2 text-2xl font-bold ${card.valueClass}`}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* SNAPSHOT */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <FiActivity />
          Quick snapshot
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          
          {/* LEFT */}
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {latestSession
                ? "Latest saved session"
                : "No saved session yet"}
            </h2>
          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-3 gap-3">

            {/* Present */}
            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <FiCheckCircle />
                Present
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-600">
                {latestSummary.present}
              </p>
            </div>

            {/* Absent */}
            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <FiXCircle />
                Absent
              </p>
              <p className="mt-2 text-lg font-semibold text-rose-600">
                {latestSummary.absent}
              </p>
            </div>

            {/* Rate */}
            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <FiTrendingUp />
                Rate
              </p>
              <p className="mt-2 text-lg font-semibold text-blue-600">
                {latestSummary.percent}%
              </p>
            </div>

          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${latestSummary.percent}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default TeacherSpecialSummaryView;