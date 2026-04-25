import { useState, useEffect } from "react";

function ThemeToggle() {
  useEffect(() => {
 

  // dark mode state
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })
  


    const isDark = theme === "dark"
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", theme)
  }, [theme])
  return(
    <>
       <button
        type="button"
        aria-label="Toggle dark mode"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full  bg-slate-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 dark:bg-white/10 dark:text-slate-900 backdrop-blur-md "
      >
        {theme === "dark" ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.41-1.41M7.05 7.05 5.64 5.64m12.72 0-1.41 1.41M7.05 16.95l-1.41 1.41M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
          </svg>
        )}

      </button>
    </>
  )
}
export default ThemeToggle;
