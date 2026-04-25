import React, { useEffect, useMemo, useState } from "react";
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

  const renderSection = (items, icon, title, emptyMessage) => (
    <div className="border border-stone-100 bg-white/10 p-4 shadow backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <span className="font-bold text-xl">{title}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      ) : (
        items.map((item) => (
          <div key={item._id || item.id} className="border-b py-3 last:border-b-0">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{toDisplayDate(item.date)}</p>
            <p className="mt-1">{item.description}</p>
            {item.classes?.length ? (
              <p className="mt-2 text-xs text-gray-500">
                Classes: {item.classes.join(", ")}
              </p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="grid gap-6 pt-28 md:grid-cols-2">
      {loading ? (
        <div className="md:col-span-2 rounded border border-stone-100 bg-white/10 p-6 text-center shadow backdrop-blur-md">
          Loading news and notices...
        </div>
      ) : error ? (
        <div className="md:col-span-2 rounded border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow">
          {error}
        </div>
      ) : (
        <>
          {renderSection(
            notices,
            <TiPinOutline size={25} />,
            "Notices",
            "No notices have been posted yet."
          )}
          {renderSection(
            news,
            <GiNewspaper size={25} />,
            "News",
            "No news has been posted yet."
          )}
        </>
      )}
    </div>
  );
}

export default NoticeandNews;
