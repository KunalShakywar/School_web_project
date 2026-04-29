import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "wc-menu-button";
import Logo from "../../assets/rlogo.png";
import { useAuth } from "../../pages/auth/context/AuthContext";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarAuthMenu from "./NavbarAuthMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileAuthMenu from "./NavbarMobileAuthMenu";
import { AUTH_LINKS, LOGIN_TRIGGER_ICON, NAV_LINKS } from "./navbarConfig";

const Navbar = ({ currentPath: currentPathProp, theme, setTheme }) => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = currentPathProp || location.pathname;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const loginMenuRef = useRef(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSticky(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    const checkTokenExpiry = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;

      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
          navigate("/login");
        }
      } catch {
        logout();
        navigate("/login");
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 30000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [logout, navigate]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoginOpen(false);
      setIsOpen(false);
      setIsMobileLoginOpen(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [currentPath]);

  const profilePath =
    role === "admin"
      ? "/dashboard"
      : role === "teacher"
      ? "/teacherprofile"
      : role === "parent"
      ? "/parentprofile"
      : "/studentprofile";
  const profileLabel =
    role === "admin"
      ? "Admin Dashboard"
      : role === "teacher"
      ? "Teacher Profile"
      : role === "parent"
      ? "Parent Profile"
      : "Student Profile";

  const visibleLoginLinks = token
    ? [{ name: profileLabel, path: profilePath, icon: AUTH_LINKS[0].icon }]
    : AUTH_LINKS.filter((link) => link.name !== "studentprofile");

  const handleLogout = () => {
    logout();
    setIsLoginOpen(false);
    setIsMobileLoginOpen(false);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 ${
        sticky ? "top-0 w-full rounded-none" : "top-5 w-[90%] rounded-2xl"
      } transition-all duration-300 ease-in-out bg-gradient-to-b   from-blue-700 via-blue-800 to-blue-500/50 backdrop-blur-md shadow-lg z-50`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <img src={Logo} alt="logo" width={50} height={50} />
        </NavLink>

        <NavbarDesktopLinks links={NAV_LINKS} currentPath={currentPath} />

        <div ref={loginMenuRef} className="relative hidden md:block">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-blue-600/50 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            onClick={() => setIsLoginOpen((prev) => !prev)}
          >
            <LOGIN_TRIGGER_ICON size={22} />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg backdrop-blur-md transition-all duration-200 ${
              isLoginOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            }`}
          >
            {visibleLoginLinks.map((link) => (
              <NavLink
                key={link.path || link.name}
                to={link.path}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                onClick={() => setIsLoginOpen(false)}
              >
                {link.icon && <link.icon />}
                {link.name}
              </NavLink>
            ))}
            {token && (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsLoginOpen(false);
                }}
                className="mt-2 w-full rounded-lg border border-red-500 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-600/40"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 text-slate-700 transition duration-700 hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 px-4 pb-5 pt-3 md:hidden">
          <NavbarMobileAuthMenu
            visibleLoginLinks={visibleLoginLinks}
            token={token}
            onLogout={handleLogout}
            setIsMobileOpen={setIsMobileLoginOpen}
            setIsMenuOpen={setIsOpen}
          />

          <NavbarMobileMenu
            links={NAV_LINKS}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setIsOpen={setIsOpen}
          />

          <div className="mt-4 space-y-3">
            <NavbarAuthMenu
              authTriggerIcon={LOGIN_TRIGGER_ICON}
              isDesktopOpen={isLoginOpen}
              isMobileOpen={isMobileLoginOpen}
              setIsDesktopOpen={setIsLoginOpen}
              setIsMobileOpen={setIsMobileLoginOpen}
              setIsMenuOpen={setIsOpen}
              visibleLoginLinks={visibleLoginLinks}
              token={token}
              onLogout={handleLogout}
              desktopMenuRef={loginMenuRef}
              theme={theme}
              setTheme={setTheme}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
