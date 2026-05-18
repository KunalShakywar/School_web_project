import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { APP_TOAST_EVENT } from "../../utils/appToast";

const VARIANT_STYLES = {
  info: {
    icon: Info,
    card: "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-400/20 dark:bg-slate-900 dark:text-slate-100",
    badge: "bg-blue-600",
  },
  success: {
    icon: CheckCircle2,
    card: "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/20 dark:bg-slate-900 dark:text-slate-100",
    badge: "bg-emerald-600",
  },
  error: {
    icon: AlertCircle,
    card: "border-red-200 bg-red-50 text-red-950 dark:border-red-400/20 dark:bg-slate-900 dark:text-slate-100",
    badge: "bg-red-600",
  },
};

export default function AppToastHost() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  useEffect(() => {
    const timers = timersRef.current;

    const dismissToast = (id) => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
      const timer = timers.get(id);
      if (timer) {
        clearTimeout(timer);
        timers.delete(id);
      }
    };

    const handleToast = (event) => {
      const detail = event?.detail || {};
      const id = detail.id || `${Date.now()}-${Math.random()}`;

      setToasts((current) => [...current, { ...detail, id }]);

      const timer = setTimeout(() => dismissToast(id), 3500);
      timersRef.current.set(id, timer);
    };

    window.addEventListener(APP_TOAST_EVENT, handleToast);

    return () => {
      window.removeEventListener(APP_TOAST_EVENT, handleToast);
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[120] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
      {toasts.map((toast) => {
        const variant = VARIANT_STYLES[toast.variant] || VARIANT_STYLES.info;
        const Icon = variant.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-2xl border shadow-xl backdrop-blur ${variant.card}`}
          >
            <div className={`h-1 w-full ${variant.badge}`} />

            <div className="flex items-start gap-3 p-4">
              <div className="mt-0.5 rounded-full bg-white/80 p-2 dark:bg-white/10">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message ? (
                  <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => {
                  setToasts((current) => current.filter((item) => item.id !== toast.id));
                  const timer = timersRef.current.get(toast.id);
                  if (timer) {
                    clearTimeout(timer);
                    timersRef.current.delete(toast.id);
                  }
                }}
                className="rounded-full p-1 opacity-70 transition hover:opacity-100"
                aria-label="Dismiss toast"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
