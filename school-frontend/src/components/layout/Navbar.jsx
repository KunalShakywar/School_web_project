import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "wc-menu-button";
import Logo from "../../assets/rlogo.png";
import { useAuth } from "../../pages/auth/context/AuthContext";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileAuthMenu from "./NavbarMobileAuthMenu";
import { AUTH_LINKS, LOGIN_TRIGGER_ICON, NAV_LINKS } from "./navbarConfig";
import {
  FiHome,
  FiBookOpen,
  FiImage,
  FiMenu,
  FiChevronDown,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiMoon,
  FiMonitor,
  FiSun,
} from "react-icons/fi";

const Navbar = ({ currentPath: currentPathProp, theme, setTheme }) => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = currentPathProp || location.pathname;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const loginMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const touchStartYRef = useRef(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const hasOverlayOpen = isLoginOpen || isOpen || isMobileLoginOpen;
    window.dispatchEvent(
      new CustomEvent("navbar-overlay-change", {
        detail: { open: hasOverlayOpen },
      })
    );

    return undefined;
  }, [isLoginOpen, isOpen, isMobileLoginOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMobileMenuVisible(true);
      return undefined;
    }

    if (!isMobileMenuVisible) return undefined;

    const timer = window.setTimeout(() => {
      setIsMobileMenuVisible(false);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [isOpen, isMobileMenuVisible]);

  useEffect(() => {
    if (!isMobileMenuVisible) return undefined;

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    const previousBody = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
      paddingRight: bodyStyle.paddingRight,
    };

    const previousHtml = {
      overflow: htmlStyle.overflow,
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    if (scrollbarWidth > 0) {
      bodyStyle.paddingRight = `${scrollbarWidth}px`;
    }

    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.position = previousBody.position;
      bodyStyle.top = previousBody.top;
      bodyStyle.left = previousBody.left;
      bodyStyle.right = previousBody.right;
      bodyStyle.width = previousBody.width;
      bodyStyle.overflow = previousBody.overflow;
      bodyStyle.paddingRight = previousBody.paddingRight;
      htmlStyle.overflow = previousHtml.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuVisible]);

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

  const quickLinks = [
    { name: "Home", path: "/", icon: FiHome },
    ...(role === "admin"
      ? [{ name: "Settings", path: "/dashboard/settings", icon: FiSettings }]
      : [{ name: "News", path: "/news", icon: FiMessageCircle }]),
    { name: "Academics", path: "/curriculum", icon: FiBookOpen },
  ];

  const themeOptions = [
    { key: "light", label: "Light", icon: FiSun },
    { key: "dark", label: "Dark", icon: FiMoon },
    { key: "system", label: "System", icon: FiMonitor },
  ];

  const handleLogout = () => {
    logout();
    setIsLoginOpen(false);
    setIsMobileLoginOpen(false);
    setIsOpen(false);
    navigate("/login");
  };

  const handleOpenAccount = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setIsMobileLoginOpen((prev) => !prev);
  };

  const handleOpenMenu = () => {
    setIsMobileLoginOpen(false);
    setIsOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setIsMobileLoginOpen(false);
  };

  const handleMobileTouchStart = (event) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleMobileTouchMove = (event) => {
    if (!mobileMenuRef.current || touchStartYRef.current == null) return;

    const currentY = event.touches[0]?.clientY;
    if (currentY == null) return;

    const deltaY = currentY - touchStartYRef.current;
    const menuTop = mobileMenuRef.current.scrollTop <= 12;

    if (menuTop && deltaY > 70) {
      closeMobileMenu();
    }
  };

  const handleMobileTouchEnd = () => {
    touchStartYRef.current = null;
  };

  const handleMobileWheel = (event) => {
    if (!mobileMenuRef.current) return;

    const menuTop = mobileMenuRef.current.scrollTop <= 12;
    if (menuTop && event.deltaY > 60) {
      closeMobileMenu();
    }
  };

  return (
    <>
      <header
        className={`fixed hidden md:block z-50 transition-all duration-300 ease-in-out bg-gradient-to-b from-blue-700 via-blue-800 to-blue-500/50 shadow-lg backdrop-blur-md ${
          sticky
            ? "left-0 top-0 w-full rounded-none"
            : "left-1/2 top-5 w-[90%] -translate-x-1/2 rounded-2xl"
        }`}
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
            className={`absolute right-0 mt-2 w-48 rounded-xl border border-white/15 bg-blue-950 p-2 shadow-lg backdrop-blur-md transition-all duration-200 ${
              isLoginOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            }`}
          >
            {visibleLoginLinks.map((link) => (
              <NavLink
                key={link.path || link.name}
                to={link.path}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
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
                className="mt-2 w-full rounded-lg border border-red-300/30 px-3 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        </nav>
      </header>

      {isMobileMenuVisible && (
        <div
          className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ease-out ${
            isOpen ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeMobileMenu}
        >
          <div
            ref={mobileMenuRef}
            className={`absolute inset-x-0 bottom-0 max-h-[78vh] overflow-y-auto overscroll-contain rounded-t-3xl bg-blue-950 px-4 pb-6 pt-4 shadow-2xl will-change-transform transition-[transform,opacity] duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            onTouchStart={handleMobileTouchStart}
            onTouchMove={handleMobileTouchMove}
            onTouchEnd={handleMobileTouchEnd}
            onWheel={handleMobileWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-center">
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="rounded-full p-2"
              >
                <div className="h-1.5 w-14 rounded-full bg-slate-200" />
              </button>
            </div>

            <NavbarMobileMenu
              links={NAV_LINKS}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              setIsOpen={setIsOpen}
            />

            <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-3 shadow-sm">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Appearance
              </p>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const active = theme === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setTheme(option.key)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-white/75 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      <Icon size={14} />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <FiChevronDown size={16} />
              Hide Menu
            </button>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-3 z-[70] px-3 md:hidden">
        <div className="mx-auto max-w-md rounded-2xl border border-white/15 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-500/90 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_20px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="grid grid-cols-5 gap-1">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="mt-1">{link.name}</span>
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={handleOpenAccount}
            className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
              isMobileLoginOpen
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
            aria-label="Open account menu"
          >
            <FiUser size={18} />
            <span className="mt-1">Account</span>
          </button>

          <button
            type="button"
            onClick={handleOpenMenu}
            className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
              isOpen
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
            aria-label="Open menu"
          >
            <FiMenu size={18} />
            <span className="mt-1">Menu</span>
          </button>
          </div>
        </div>

        {isMobileLoginOpen && (
          <div className="absolute inset-x-3 bottom-[calc(100%+0.75rem)]">
            <NavbarMobileAuthMenu
              visibleLoginLinks={visibleLoginLinks}
              token={token}
              setIsMobileOpen={setIsMobileLoginOpen}
              setIsMenuOpen={setIsOpen}
            />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
