import { useMemo } from "react";

const CurriculumLevelDetails = ({ selectedLevel, classes = [] }) => {
  const formatTime = (value) => {
    if (!value) return "Time not available";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Time not available";

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const classItems = useMemo(() => {
    return [...classes].sort((a, b) => {
      const orderA = Number(a?.order ?? 0);
      const orderB = Number(b?.order ?? 0);
      return orderA - orderB;
    });
  }, [classes]);

  const resolveActionUrl = (item, actionType) => {
    if (actionType === "resources") {
      return (
        item?.resourcesUrl ||
        item?.resourcesLink ||
        item?.resources ||
        item?.resourceUrl ||
        item?.resourceLink
      );
    }

    return (
      item?.syllabusUrl ||
      item?.syllabusLink ||
      item?.syllabus ||
      item?.syllabusFile ||
      item?.syllabusPdf
    );
  };

  const handleActionClick = (item, actionType, fallbackLabel) => {
    const actionUrl = resolveActionUrl(item, actionType);

    if (typeof window !== "undefined" && actionUrl) {
      window.open(actionUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (typeof window !== "undefined") {
      window.alert(`${fallbackLabel} link is not available yet.`);
    }
  };

  const getSubjectLabel = (subject, subjectIndex) =>
    subject?.name?.trim() || subject?.code?.trim() || `Subject ${subjectIndex + 1}`;

  if (!selectedLevel) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center text-xl text-gray-400 dark:text-slate-500">
        Select a level to view classes
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{selectedLevel.name}</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
              Class list
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Click a class to view its order inside this level.
          </p>
        </div>

        <div className="mt-5 max-h-[65vh] overflow-y-auto pr-2">
          {classItems.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {classItems.map((item, index) => {
                const subjects = Array.isArray(item?.subjects) ? item.subjects : [];

                return (
                  <li
                    key={item?._id || `${selectedLevel._id}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-white/5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {item?.name || `Class ${index + 1}`}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Time: {formatTime(item?.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleActionClick(item, "syllabus", "Class syllabus")
                          }
                          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          Syllabus
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
                      {subjects.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {subjects.map((subject, subjectIndex) => (
                            <li
                              key={
                                subject?._id ||
                                subject?.code ||
                                `${item?._id || index}-subject-${subjectIndex}`
                              }
                              className="flex flex-col gap-3 rounded-xl bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900/70"
                            >
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                  {getSubjectLabel(subject, subjectIndex)}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Time: {formatTime(subject?.createdAt)}
                                </p>
                                {subject?.code && subject?.code !== subject?.name ? (
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Code: {subject.code}
                                  </p>
                                ) : null}
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleActionClick(
                                    subject,
                                    "resources",
                                    "Subject resources",
                                  )
                                }
                                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                              >
                                Resources
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          No subjects available for this class yet.
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              No classes available for this level.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurriculumLevelDetails;
