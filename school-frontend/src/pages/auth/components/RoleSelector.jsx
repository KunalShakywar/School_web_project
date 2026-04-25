const RoleSelector = ({ roles, activeRole, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {roles.map(({ key, icon: Icon, label, hint }) => {
        const isActive = activeRole === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            aria-pressed={isActive}
            className={`group rounded-2xl border p-0 text-left transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-blue-200 dark:focus-visible:ring-blue-500/30 ${
              isActive
                ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-200/40 dark:border-blue-400 dark:bg-blue-500/10"
                : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70"
            }`}
          >
            <div
              className={`flex items-center gap-3 rounded-2xl p-4 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "bg-white text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-blue-600 dark:text-blue-400"
                }`}
              />

              <div className="text-left">
                <p className="text-sm font-medium leading-none">
                  {label}
                </p>
                <p className={`mt-1 text-xs ${isActive ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                  {hint}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
