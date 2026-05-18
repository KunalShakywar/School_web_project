import { useEffect, useMemo, useState } from "react";

const CurriculumMobileLevelSelect = ({ levels = [], selectedLevel, classes = [], onSelectLevel }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const formatTime = (value) => {
    if (!value) return "Time not available";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Time not available";

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    setOpenIndex(0);
  }, [selectedLevel?._id]);

  const classItems = useMemo(() => {
    return [...classes].sort((a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0));
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

  return (
    <div className="mx-auto w-full max-w-md px-4 md:hidden">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Curriculum
      </h1>

      <select
        className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
        value={selectedLevel?._id || ""}
        onChange={(e) => {
          const found = levels.find((item) => item._id === e.target.value);
          onSelectLevel(found || null);
        }}
      >
        <option className="bg-white dark:bg-slate-800" value="">
          Select a level
        </option>
        {levels.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="mt-6 max-h-[58vh] overflow-y-auto pr-1">
        {classItems.length > 0 ? (
          <div className="flex flex-col gap-3">
            {classItems.map((item, index) => {
              const isOpen = openIndex === index;
              const subjects = Array.isArray(item?.subjects) ? item.subjects : [];

              return (
                <div
                  key={item?._id || `${selectedLevel?._id || "level"}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/85"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-4">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {item?.name || `Class ${index + 1}`}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Tap to view subjects
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          Time: {formatTime(item?.createdAt)}
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleActionClick(item, "syllabus", "Class syllabus")
                      }
                      className="shrink-0 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Syllabus
                    </button>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-700">
                      {subjects.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {subjects.map((subject, subjectIndex) => (
                            <li
                              key={
                                subject?._id ||
                                subject?.code ||
                                `${item?._id || index}-subject-${subjectIndex}`
                              }
                              className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-3 dark:bg-white/5"
                            >
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                  {getSubjectLabel(subject, subjectIndex)}
                                </h4>
                              
                                {subject?.code && subject?.code !== subject?.name ? (
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Code: {subject.code}
                                  </p>
                                ) : null}
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Time: {formatTime(subject?.createdAt)}
                                </p>
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
                                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                              >
                                Resources
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          No subjects available for this class yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">
            No classes available for this level.
          </p>
        )}
      </div>
    </div>
  );
};

export default CurriculumMobileLevelSelect;
