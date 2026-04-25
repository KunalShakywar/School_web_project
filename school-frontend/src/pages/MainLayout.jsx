import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "./auth/context/AuthContext";

import Footer from "../components/layout/Footer"
function MainLayout() {
  const { isLoggedIn, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/"; // home par back nahi
  const showGuestWidgets = !authLoading && !isLoggedIn;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar showBack={showBack} navigate={navigate} />
      {showGuestWidgets && <Footer />}
      {/* Mobile Back Header */}
      {showBack && (
        <div className="md:hidden flex items-center gap-3 p-3 border-b">
          <button onClick={() => navigate(-1)}>
            <IoArrowBack size={22} />
          </button>

          <h2 className="font-semibold">Page</h2>
        </div>
      )}

      {/* Page Content */}
      <PageWrapper className="flex-1 p-4" contentClassName="page-content">
        <Outlet />
      </PageWrapper>

    </div>
  );
}

export default MainLayout;
