import { useEffect, useState } from "react";
import axios from "axios";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday
} from "date-fns";

const defaultEventsData = [
  { date: "2026-03-10", title: "Unit Test", type: "exam" },
  { date: "2026-03-15", title: "Holi Holiday", type: "holiday" },
  { date: "2026-03-22", title: "Annual Function", type: "event" },
];

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsData, setEventsData] = useState(defaultEventsData);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEventsData(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load calendar events:", err);
      });
  }, []);
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  const getEventsForDate = (date) => {
    return eventsData.filter(
      (event) => event.date === format(date, "yyyy-MM-dd")
    );
  };

  const getEventColor = (type) => {
    if (type === "exam") return "bg-red-500";
    if (type === "holiday") return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div className="pt-28" > 

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-stone-50 rounded-lg"
        >
          ◀
        </button>

        <h2 className="text-2xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-stone-50 rounded-lg"
        >
          ▶
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map(day => {
          const events = getEventsForDate(day);

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(format(day, "yyyy-MM-dd"))}
              className={`p-3 text-center rounded-2xl cursor-pointer transition relative
                ${isToday(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 border border-stone-50 hover:bg-blue-100 dark:hover:bg-gray-700 "}
              `}
            >
              {format(day, "d")}

              {/* Event Dot */}
              {events.length > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {events.map((event, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}
                    ></span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-8 p-5 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            Events on {selectedDate}
          </h3>

          {eventsData.filter(e => e.date === selectedDate).length === 0 ? (
            <p>No events on this day.</p>
          ) : (
            eventsData
              .filter(e => e.date === selectedDate)
              .map((event, index) => (
                <div
                  key={index}
                  className="mb-3 p-4 rounded-lg bg-white dark:bg-gray-700 shadow"
                >
                  <p className="font-medium">{event.title}</p>
                  <span className="text-sm opacity-70">
                    {event.type}
                  </span>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;
