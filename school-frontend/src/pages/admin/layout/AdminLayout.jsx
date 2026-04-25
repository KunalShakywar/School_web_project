import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import PageWrapper from "../../../components/layout/PageWrapper";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen pt-4">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static z-40
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300 
        `}
      >
        <Sidebar closeSidebar={() => setOpen(false)}  />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col w-full">

        {/* Navbar */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* Page Content */}
        <PageWrapper className="min-w-0 flex-1 overflow-x-hidden rounded-br-lg bg-white/10 p-4 md:p-6" contentClassName="page-content">
          <Outlet />
        </PageWrapper>
      </div>
    </div>
  );
}

export default AdminLayout;
