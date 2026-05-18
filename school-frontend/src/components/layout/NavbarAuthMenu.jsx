import { Link } from "react-router-dom";
import { FiMoon, FiMonitor, FiSun } from "react-icons/fi";

const NavbarAuthMenu = ({
  authTriggerIcon,
  isDesktopOpen,
  setIsDesktopOpen,
  visibleLoginLinks,
  token,
  onLogout,
  desktopMenuRef,
  theme,
  setTheme,
}) => {
  const TriggerIcon = authTriggerIcon;
  const themeOptions = [
    { key: "light", label: "Light", icon: FiSun },
    { key: "dark", label: "Dark", icon: FiMoon },
    { key: "system", label: "System", icon: FiMonitor },
  ];

  return (
    <>
      <div ref={desktopMenuRef} className="relative hidden md:block">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-blue-600/50 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          onClick={() => setIsDesktopOpen((prev) => !prev)}
        >
          <TriggerIcon size={22} />
        </button>

        <div
          className={`absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg backdrop-blur-md transition-all duration-200 ${
            isDesktopOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {visibleLoginLinks.map((link) => (
            <Link
              key={link.path || link.name}
              to={link.path}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              onClick={() => setIsDesktopOpen(false)}
            >
              {link.icon && <link.icon />}
              {link.name}
            </Link>
          ))}

          <div className="my-2 border-t border-slate-200 pt-2">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Appearance
            </p>
            <div className="grid grid-cols-3 gap-1">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = theme === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTheme(option.key)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {token && (
            <button
              type="button"
              onClick={() => {
                onLogout();
                setIsDesktopOpen(false);
              }}
              className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
            NA logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarAuthMenu;
