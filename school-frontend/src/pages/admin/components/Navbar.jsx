import MenuBtn from "./MenuBtn";
import { useLocation, useSearchParams } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const title = (() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      return searchParams.get("tab") === "actions" ? "Quick Actions" : "Overview";
    }

    const segment = location.pathname.split("/").filter(Boolean).pop() || "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  })();

  return (
    <div className="flex w-full items-center justify-between border-b border-white/10 bg-white/10 p-4 text-white backdrop-blur-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <MenuBtn toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Navbar;
