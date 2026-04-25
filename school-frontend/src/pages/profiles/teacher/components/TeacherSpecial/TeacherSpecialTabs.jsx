import { FiHome, FiClock, FiUserCheck } from "react-icons/fi";

const tabs = [
  { id: "summary", label: "Summary", icon: <FiHome /> },
  { id: "latest", label: "Latest", icon: <FiClock /> },
  { id: "attendance", label: "Attendance", icon: <FiUserCheck /> },
];

const TeacherSpecialTabs = ({ activeView, onChange }) => {
  return (
    <div className="relative grid grid-cols-3 gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-sm">

      {/* Sliding Background */}
      <div
        className={`absolute top-2 left-2 h-[calc(100%-16px)] w-[calc(33.33%-8px)] rounded-2xl bg-slate-900 transition-all duration-300`}
        style={{
          transform:
            activeView === "summary"
              ? "translateX(0%)"
              : activeView === "latest"
              ? "translateX(100%)"
              : "translateX(200%)",
        }}
      />

      {tabs.map((tab) => {
        const isActive = activeView === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition`}
          >
            <span className={`text-lg ${isActive ? "text-white" : "text-slate-600"}`}>
              {tab.icon}
            </span>
            <span className={`${isActive ? "text-white" : "text-slate-600"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TeacherSpecialTabs;