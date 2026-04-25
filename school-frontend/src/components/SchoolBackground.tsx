import { useEffect } from "react";
 
const keyframes = `
@keyframes walkLTR {
  0%   { transform: translateX(-120px); opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { transform: translateX(calc(100vw + 120px)); opacity: 0; }
}
@keyframes walkRTL {
  0%   { transform: translateX(calc(100vw + 120px)) scaleX(-1); opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { transform: translateX(-120px) scaleX(-1); opacity: 0; }
}
@keyframes legF {
  0%,100% { transform: rotate(-22deg); }
  50%      { transform: rotate(22deg); }
}
@keyframes legB {
  0%,100% { transform: rotate(22deg); }
  50%      { transform: rotate(-22deg); }
}
@keyframes armF {
  0%,100% { transform: rotate(-24deg); }
  50%      { transform: rotate(24deg); }
}
@keyframes armB {
  0%,100% { transform: rotate(24deg); }
  50%      { transform: rotate(-24deg); }
}
@keyframes headBob {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-2px); }
}
@keyframes bagSwing {
  0%,100% { transform: rotate(-5deg); }
  50%      { transform: rotate(5deg); }
}
`;
 
 
export function SchoolBackground({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!document.getElementById("sbg-kf")) {
      const el = document.createElement("style");
      el.id = "sbg-kf";
      el.textContent = keyframes;
      document.head.appendChild(el);
    }
  }, []);
 
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden w-full h-full">
 
      {/* Base */}
      <div className="absolute inset-0 bg-white dark:bg-slate-950" />
 
      {/* Grid only */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-slate-200 dark:text-slate-800"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sgrid)" />
      </svg>
 
      {/* Ground line */}
      <div className="absolute bottom-[11%] left-0 w-full h-px bg-slate-200 dark:bg-slate-800" />
 
      {children}
    </div>
  );
}
 
export default SchoolBackground;