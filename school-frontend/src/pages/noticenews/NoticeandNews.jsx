import { useEffect, useMemo, useState } from "react";
import { GiNewspaper } from "react-icons/gi";
import { TiPinOutline } from "react-icons/ti";
import { readAnnouncements } from "../../utils/announcementsApi";

const toDisplayDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function NoticeandNews() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("notices");

  useEffect(() => {
    let active = true;

    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await readAnnouncements({ published: "true" });
        if (active) {
          setAnnouncements(data);
        }
      } catch (fetchError) {
        console.error("Failed to load public announcements:", fetchError);
        if (active) {
          setError("Unable to load news and notices right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAnnouncements();

    const handleRefresh = () => loadAnnouncements();
    window.addEventListener("announcements-updated", handleRefresh);

    return () => {
      active = false;
      window.removeEventListener("announcements-updated", handleRefresh);
    };
  }, []);

  const notices = useMemo(
    () => announcements.filter((item) => item.type === "notice"),
    [announcements]
  );

  const news = useMemo(
    () => announcements.filter((item) => item.type === "news"),
    [announcements]
  );

  const activeItems = activeTab === "notices" ? notices : news;
  const ActiveIcon = activeTab === "notices" ? TiPinOutline : GiNewspaper;
  const activeTitle = activeTab === "notices" ? "Notices" : "News";
  const activeEmptyMessage =
    activeTab === "notices"
      ? "No notices have been posted yet."
      : "No news has been posted yet.";

  const renderSection = (items, icon, title, emptyMessage) => (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/85">
      <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
        {icon}
        <span className="text-xl font-bold">{title}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id || item.id}
            className="border-b border-slate-200 py-3 last:border-b-0 dark:border-slate-700"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                {toDisplayDate(item.date)}
              </p>
            </div>
            <p className="mt-1 text-slate-700 dark:text-slate-300">
              {item.description}
            </p>
            {item.classes?.length ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Classes: {item.classes.join(", ")}
              </p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex justify-center">
        <div className="relative flex w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
          <div
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 shadow-md transition-transform duration-300 ease-out ${
              activeTab === "news" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setActiveTab("notices")}
            className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
              activeTab === "notices"
                ? "text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <TiPinOutline size={18} />
              Notice
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("news")}
            className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
              activeTab === "news"
                ? "text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <GiNewspaper size={18} />
              News
            </span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center text-slate-700 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-300">
          Loading news and notices...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-100">
            <ActiveIcon size={22} />
            <span className="text-xl font-bold">{activeTitle}</span>
          </div>

          {renderSection(
            activeItems,
            <ActiveIcon size={22} />,
            activeTitle,
            activeEmptyMessage
          )}
        </div>
      )}
    </div>
  );
}

export default NoticeandNews;
