import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { showAppToast } from "../../../utils/appToast";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfMonth,
  isToday,
} from "date-fns";

const getEventColor = (type) => {
  if (type === "exam") return "bg-red-500";
  if (type === "holiday") return "bg-green-500";
  if (type === "vacation") return "bg-emerald-500";
  if (type === "meeting") return "bg-violet-500";
  if (type === "result") return "bg-amber-500";
  return "bg-blue-500";
};

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [notification, setNotification] = useState(null);
  const currentMonthRef = useRef(currentMonth);

  useEffect(() => {
    currentMonthRef.current = currentMonth;
  }, [currentMonth]);

  const loadCalendarEvents = useCallback(async (monthDate = currentMonth) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/calendar/events?month=${format(
          monthDate,
          "M",
        )}&year=${format(monthDate, "yyyy")}`,
      );

      const list = Array.isArray(response.data?.data) ? response.data.data : [];
      setEventsData(list);
    } catch (err) {
      console.error("Failed to load calendar events:", err);
    }
  }, [currentMonth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCalendarEvents();
    }, 0);

    return () => clearTimeout(timer);
  }, [currentMonth, loadCalendarEvents]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedDate(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [currentMonth]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
    });

    const handleCalendarUpdate = (payload = {}) => {
      loadCalendarEvents(currentMonthRef.current);

      const message = payload?.message || "Calendar updated";
      showAppToast({
        title: "Calendar update",
        message,
        variant: payload?.action === "deleted" ? "error" : "success",
      });
      setNotification({
        id: `${Date.now()}-${Math.random()}`,
        message,
        type: payload?.action || "updated",
      });
    };

    socket.on("calendar-updated", handleCalendarUpdate);

    return () => {
      socket.off("calendar-updated", handleCalendarUpdate);
      socket.disconnect();
    };
  }, [loadCalendarEvents]);

  useEffect(() => {
    if (!notification) return undefined;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification]);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  }, [currentMonth]);

  const eventsForDate = (date) => {
    return eventsData.filter((event) => {
      const start = event?.startDate ? parseISO(event.startDate) : null;
      const end = event?.endDate ? parseISO(event.endDate) : start;

      if (!start || Number.isNaN(start.getTime())) return false;
      if (!end || Number.isNaN(end.getTime())) return isSameDay(start, date);

      return isWithinInterval(date, { start, end });
    });
  };

  const selectedDayEvents = selectedDate
    ? eventsData.filter((event) => {
        const start = event?.startDate ? parseISO(event.startDate) : null;
        const end = event?.endDate ? parseISO(event.endDate) : start;

        if (!start || Number.isNaN(start.getTime())) return false;
        if (!end || Number.isNaN(end.getTime())) return isSameDay(start, selectedDate);

        return isWithinInterval(selectedDate, { start, end });
      })
    : [];

  return (
    <div className="">
      <div className="mx-auto max-w-6xl px-4 pb-10">
        {notification ? (
          <div className="fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-blue-200 bg-white p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Calendar update</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentMonth((value) => addMonths(value, -1))}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
          >
            ◀
          </button>

          <h2 className="text-2xl font-bold text-white">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <button
            onClick={() => setCurrentMonth((value) => addMonths(value, 1))}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-600">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className={`py-2  ${day === "Sun" ? "text-red-600" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const events = eventsForDate(day);
            const isSelected = selectedDate && isSameDay(selectedDate, day);
            const today = isToday(day);

            return (
        <button
  key={day.toISOString()}
  type="button"
  onClick={() => setSelectedDate(day)}
  className={`relative 
    min-h-[70px] sm:min-h-[80px] md:min-h-[90px]
    rounded-xl md:rounded-2xl
    border 
    p-2 sm:p-3 md:p-4
    text-sm sm:text-base
    text-left 
    transition-all duration-200
    w-full
    ${
  isSelected
    ? "border-blue-500 bg-blue-50"
    : today
    ? "border-blue-600 bg-blue-400/50"
    : "border-gray-200 bg-white hover:bg-gray-50"
}`}
>
                <span
                  className={`text-sm font-semibold ${
                    day.getDay() === 0 ? " " : " "
                  }`}
                >
                  {format(day, "d")}
                </span>

                {events.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
                    {events.slice(0, 3).map((event, index) => (
                      <span
                        key={`${event._id || event.title}-${index}`}
                        className={`h-1 w-1 rounded-full ${getEventColor(event.type)}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-white">
            {selectedDate ? format(selectedDate, "dd MMMM yyyy") : "Select a date"}
          </h3>

          <div className="mt-4 space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((event) => {
                const rangeText =
                  event?.startDate && event?.endDate
                    ? `${format(parseISO(event.startDate), "dd MMM yyyy")} - ${format(
                        parseISO(event.endDate),
                        "dd MMM yyyy",
                      )}`
                    : event?.startDate
                    ? format(parseISO(event.startDate), "dd MMM yyyy")
                    : "Date unavailable";

                return (
                  <div
                    key={event._id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.description || "No description"}</p>
                      </div>

                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold text-white ${getEventColor(
                          event.type,
                        )}`}
                      >
                        {event.type}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                      <span>Range: {rangeText}</span>
                      {event?.session?.name ? <span>Session: {event.session.name}</span> : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No events on this day.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
