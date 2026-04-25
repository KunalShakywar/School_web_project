import { Link } from "react-router-dom";

const NavbarAuthMenu = ({
  authTriggerIcon,
  isDesktopOpen,
  setIsDesktopOpen,
  visibleLoginLinks,
  token,
  onLogout,
  desktopMenuRef,
}) => {
  const TriggerIcon = authTriggerIcon;

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

          {token && (
            <button
              type="button"
              onClick={() => {
                onLogout();
                setIsDesktopOpen(false);
              }}
              className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarAuthMenu;
