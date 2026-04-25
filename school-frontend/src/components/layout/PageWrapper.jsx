import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_REVEAL_SELECTOR = "[data-page-reveal]";

function PageWrapper({
  children,
  className = "",
  contentClassName = "",
  observeSelector = DEFAULT_REVEAL_SELECTOR,
}) {
  const rootRef = useRef(null);
  const [pageReady, setPageReady] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    rafId = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) return undefined;

    const targets = root.querySelectorAll(observeSelector);
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [observeSelector, prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      className={`page-wrapper min-w-0 ${className}`}
    >
      <div
        data-page-reveal
        className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
          pageReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export default PageWrapper;
