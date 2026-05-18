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
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffdf8] via-[#faf7f1] to-[#eef4fb] dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

      {/* Soft ambient glow instead of grid */}
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/12 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-sky-300/12 blur-3xl dark:bg-sky-500/10" />
      <div className="absolute left-[-5rem] top-1/3 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl dark:bg-transparent" />
 
      {/* Ground line */}
      <div className="absolute bottom-[11%] left-0 w-full h-px bg-blue-100/80 dark:bg-slate-800" />
 
      {children}
    </div>
  );
}
 
export default SchoolBackground;
