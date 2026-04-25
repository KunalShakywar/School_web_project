const ProgressDetailsView = ({ profile, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Profile
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-medium text-slate-800">
                Progress Details
              </h2>
              <p className="text-xs text-slate-400">{profile.name}</p>
            </div>
          </div>

          <div className="mb-3 flex items-end gap-2">
            <span className="text-4xl font-medium text-blue-600">55.4%</span>
            <span className="mb-1 text-sm text-slate-400">completed</span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: "55.4%" }}
            />
          </div>

          <p className="text-center text-sm text-slate-400">
            Detailed progress data will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressDetailsView;
