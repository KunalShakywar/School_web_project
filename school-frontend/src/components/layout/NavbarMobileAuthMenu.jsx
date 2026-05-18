import { Link } from "react-router-dom";
import { useAuth } from "../../pages/auth/context/AuthContext";

const NavbarMobileAuthMenu = ({
  visibleLoginLinks,
  token,
  setIsMobileOpen,
  setIsMenuOpen,
}) => {
  const { logout } = useAuth();

  return (
    <div className="mb-4 rounded-2xl border border-white/15 bg-blue-950/95 p-3 shadow-sm backdrop-blur-sm">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        Account
      </p>

      <div className="flex flex-row flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-2 shadow-sm">
        {visibleLoginLinks.map((link) => (
          <Link
            key={link.path || link.name}
            to={link.path}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
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
            onClick={logout}
            className="w-fit rounded-lg border border-red-300/30 px-3 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileAuthMenu;
