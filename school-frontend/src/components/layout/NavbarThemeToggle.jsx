import { FiMoon, FiSun, FiMonitor } from "react-icons/fi";

const NavbarThemeToggle = ({ theme, setTheme }) => {
  const nextTheme =
    theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const activeIcon =
    theme === "system" ? (
      <FiMonitor className="h-5 w-5" />
    ) : theme === "dark" ? (
      <FiMoon className="h-5 w-5" />
    ) : (
      <FiSun className="h-5 w-5" />
    );
  const title =
    theme === "system"
      ? "System theme"
      : theme === "dark"
      ? "Dark theme"
      : "Light theme";

  return (
    <button
      type="button"
      aria-label="Toggle theme mode"
      title={`${title}. Click to switch to ${nextTheme}.`}
      onClick={() => setTheme(nextTheme)}
      className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      {activeIcon}
    </button>
  );
};

export default NavbarThemeToggle;
