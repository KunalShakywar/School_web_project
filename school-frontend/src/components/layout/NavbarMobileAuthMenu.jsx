import { Link } from "react-router-dom";

const NavbarMobileAuthMenu = ({
  visibleLoginLinks,
  token,
  onLogout,
  setIsMobileOpen,
  setIsMenuOpen,
}) => {
  return (
    
    
    <div className="mb-4 rounded-xl border border-yellow-200 border-spacing-2 bg-white p-3 shadow-sm">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Account
      </p>

      <div className=" flex border border-spacing-0 shadow-sm flex-row flex-wrap items-center gap-2 justify-between bg-slate-500/20 p-2 rounded-lg">
        {visibleLoginLinks.map((link) => (
          <Link
            key={link.path || link.name}
            to={link.path}
            className="flex items-center  gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 "
            onClick={() => {
              setIsMobileOpen(false);
              setIsMenuOpen(false);
            }}
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
              setIsMobileOpen(false);
              setIsMenuOpen(false);
            }}
            className=" w-fit text-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-red-500 transition hover:bg-red-50/20 border border-red-500 hover:border-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileAuthMenu;
