const tabs = [
  { id: "all", label: "All Saved" },
  { id: "latest", label: "Latest" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
];

const TeacherSpecialRecentSessionTabs = ({ activeTab, onChange }) => {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TeacherSpecialRecentSessionTabs;
