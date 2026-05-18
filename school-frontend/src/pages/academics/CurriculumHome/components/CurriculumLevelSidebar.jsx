const CurriculumLevelSidebar = ({ levels = [], selectedLevel, onSelectLevel }) => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3">
        {levels.map((item) => (
          <button
            key={item._id}
            onClick={() => onSelectLevel(item)}
            className={`
              rounded-xl p-4 text-left text-sm font-semibold transition
              ${
                selectedLevel?._id === item._id
                  ? "bg-blue-500 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10"
              }
            `}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurriculumLevelSidebar;
