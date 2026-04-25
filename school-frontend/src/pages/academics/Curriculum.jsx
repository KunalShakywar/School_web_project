import { useEffect, useMemo, useState } from "react";
import { FiBookOpen, FiCalendar, FiCheckCircle, FiLayers } from "react-icons/fi";
import {
  CURRICULUM_UPDATED_EVENT,
  readCurriculumData,
} from "../../utils/curriculumStorage";

const safeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeSubject = (subject) => {
  if (typeof subject === "string") {
    return {
      name: subject,
      units: [],
      assessment: "",
      resources: [],
      notes: "",
    };
  }

  return {
    name: subject?.name || subject?.subject || subject?.title || "Untitled Subject",
    units: safeArray(subject?.units || subject?.topics || subject?.chapters),
    assessment: subject?.assessment || subject?.evaluation || "",
    resources: safeArray(subject?.resources),
    notes: subject?.notes || subject?.remarks || "",
  };
};

const normalizeCurriculumItem = (item, index) => {
  const subjects = safeArray(item?.subjects || item?.syllabus || item?.topics).map(
    normalizeSubject
  );

  return {
    id: item?.id || item?._id || `${item?.className || "class"}-${index}`,
    className: item?.className || item?.class || item?.title || `Class ${index + 1}`,
    session: item?.session || item?.academicYear || item?.year || "2025-26",
    description:
      item?.description ||
      item?.overview ||
      "Detailed syllabus plan shared from the dashboard.",
    coordinator: item?.coordinator || item?.teacher || item?.owner || "",
    examPattern: item?.examPattern || item?.pattern || "",
    subjects,
  };
};

const Curriculum = () => {
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const syncCurriculum = async () => {
      setLoading(true);
      setError("");

      try {
        const stored = await readCurriculumData();
        if (cancelled) return;

        setCurriculumData(stored);
      } catch {
        if (cancelled) return;
        setError("Unable to load curriculum from the backend.");
        setCurriculumData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    syncCurriculum();
    window.addEventListener(CURRICULUM_UPDATED_EVENT, syncCurriculum);

    return () => {
      cancelled = true;
      window.removeEventListener(CURRICULUM_UPDATED_EVENT, syncCurriculum);
    };
  }, []);

  const normalizedCurriculum = useMemo(
    () => curriculumData.map(normalizeCurriculumItem),
    [curriculumData]
  );

  const totalClasses = normalizedCurriculum.length;
  const totalSubjects = normalizedCurriculum.reduce(
    (count, item) => count + item.subjects.length,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-28">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
              <FiBookOpen size={14} />
              Curriculum
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              When the dashboard sends a syllabus list, it appears here as detailed class cards with subjects, units, and assessment notes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-slate-800/60">
              <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <FiLayers size={12} />
                Classes
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {totalClasses}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-slate-800/60">
              <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <FiCheckCircle size={12} />
                Subjects
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {totalSubjects}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-10 text-center text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300">
          Loading curriculum...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-600 shadow-sm">
          {error}
        </div>
      ) : normalizedCurriculum.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300">
          No syllabus has been sent from the dashboard yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {normalizedCurriculum.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70"
          >
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-5 text-white dark:border-white/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80">
                    <FiCalendar size={12} />
                    Session {item.session}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    {item.className}
                  </h2>
                </div>
                <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium">
                  {item.subjects.length} subjects
                </span>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>

              <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                {item.coordinator && (
                  <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">
                    <span className="block uppercase tracking-wide text-slate-400">
                      Coordinator
                    </span>
                    <span className="mt-1 block font-medium text-slate-800 dark:text-slate-100">
                      {item.coordinator}
                    </span>
                  </div>
                )}
                {item.examPattern && (
                  <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">
                    <span className="block uppercase tracking-wide text-slate-400">
                      Exam Pattern
                    </span>
                    <span className="mt-1 block font-medium text-slate-800 dark:text-slate-100">
                      {item.examPattern}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {item.subjects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500 dark:border-white/10">
                    No subject list has been sent yet.
                  </div>
                ) : (
                  item.subjects.map((subject) => (
                    <section
                      key={subject.name}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {subject.name}
                        </h3>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                          Subject
                        </span>
                      </div>

                      <div className="mt-3 space-y-3">
                        {subject.units.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Units / Topics
                            </p>
                            <ul className="mt-2 space-y-1.5">
                              {subject.units.map((unit, index) => (
                                <li
                                  key={`${subject.name}-unit-${index}`}
                                  className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                  <span>{unit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {subject.assessment && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Assessment
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                              {subject.assessment}
                            </p>
                          </div>
                        )}

                        {subject.notes && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Notes
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                              {subject.notes}
                            </p>
                          </div>
                        )}

                        {subject.resources.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Resources
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {subject.resources.map((resource) => (
                                <span
                                  key={`${subject.name}-${resource}`}
                                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  ))
                )}
              </div>
            </div>
          </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Curriculum;
