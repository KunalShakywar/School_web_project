// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles/app.css"
import { useAuth } from "./pages/auth/context/AuthContext";

// Layout components
import SchoolBackground from "./components/SchoolBackground"
import Navbar from './components/layout/Navbar'
import FloatingWhatsapp from './components/flotingBtn/FloatingWhatsapp'
import ScrollingSmooth from "./components/scrollpage/ScrollingSmooth"
import PageWrapper from "./components/layout/PageWrapper"
import AppToastHost from "./components/notifications/AppToastHost"
import RealtimeToastBridge from "./components/notifications/RealtimeToastBridge"

// Public pages
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import NoticeandNews from "./pages/noticenews/NoticeandNews"
import Result from "./pages/result/Result"
import Gallery from "./pages/gallery/Gallery"
import Contact from "./pages/contact/Contact"
import Teacher from "./pages/teacher/Teachers"
import Staff from "./pages/staff/Staff"
import NotFound from "./pages/NotFound"

// Accdemics from HOME
import Curriculum from "./pages/academics/CurriculumHome/index"
import Calender from "./pages/academics/Academic_calendar"
import Results from "./pages/academics/Results"
import TimeTable from './pages/academics/Timetable'
import Examination from "./pages/academics/Examinations"

// Attendance pages
import Attforteacher from "./pages/attendances/collectStudentsAttendance"
import Attshow from "./pages/attendances/showAttendance"

// Admin pages
import AdminLayout from './pages/admin/layout/AdminLayout'
import Dashboard from "./pages/admin/dashboard/Dashboard"
import Students from "./pages/admin/tabs/students/Students"
import Teachers from "./pages/admin/tabs/Teachers"
import AdminStaff from "./pages/admin/tabs/Staff"
import Parents from "./pages/admin/tabs/Parents"
import Attendance from "./pages/admin/tabs/attendance/Attendance"
import Marks from "./pages/admin/tabs/marks/Marks"
import Settings from "./pages/admin/tabs/Settings"
import Announcements from "./pages/admin/tabs/announcements/Announcements"

// Auth
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotView from "./pages/auth/components/forgot/ForgotView"
import VerifyOtpView from "./pages/auth/components/forgot/VerifyOtpView"
import ProtectedRoute from "./pages/auth/protect/ProtectedRoute"

// Profiles
import ProfileStudent from "./pages/profiles/student/StudentProfile"
import ProfileTeacher from "./pages/profiles/teacher/TeacherProfile"
import TeacherSpecial from "./pages/profiles/teacher/components/TeacherSpecial"
import ProfileParent from "./pages/profiles/parent/ParentProfile"


//Layout 
function Layout() {
  const location = useLocation();
  const { isLoggedIn, authLoading } = useAuth();
  const isAdminPage = location.pathname.startsWith("/dashboard");
  const showGuestWidgets = !authLoading && !isAdminPage && !isLoggedIn;
  const [isFloatingVisible, setIsFloatingVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
    return "system";
  });

  // Page transition
  useEffect(() => {
    let cancelled = false;
    let timer = null;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setIsPageVisible(false);
      timer = setTimeout(() => {
        if (cancelled) return;
        setIsPageVisible(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 60);
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname]);

  // Apply theme
  useEffect(() => {
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    localStorage.setItem("theme", theme);

    if (theme !== "system") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      document.documentElement.classList.toggle("dark", getSystemTheme() === "dark");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const handleNavbarOverlayChange = (event) => {
      const isOpen = Boolean(event.detail?.open);
      setIsFloatingVisible(!isOpen);
    };

    window.addEventListener("navbar-overlay-change", handleNavbarOverlayChange);
    return () =>
      window.removeEventListener("navbar-overlay-change", handleNavbarOverlayChange);
  }, []);

  return (
    <div className="app-shell">
      <SchoolBackground />
      {!isAdminPage && <Navbar theme={theme} setTheme={setTheme} />}
      <AppToastHost />
      <RealtimeToastBridge />

      <main className={`app-main ${isPageVisible ? "app-main--visible" : "app-main--hidden"}`}>
        <PageWrapper className="w-full" contentClassName="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <Routes>

          {/* ── Public Routes ── */}
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/news"       element={<NoticeandNews />} />
          <Route path="/result"     element={<Result />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/teacher"    element={<Teacher />} />
          <Route path="/staff"      element={<Staff />} />

          {/* ── Academic Routes ── */}
          <Route path="/curriculum"          element={<Curriculum/>} />
          <Route path="/calender"            element={<Calender />} />
          <Route path="/results"             element={<Results />} />
          <Route path="/timetable"           element={<TimeTable />} />
          <Route path="/examination"         element={<Examination />} />

          {/* ── Auth Routes ── */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<ForgotView />} />
          <Route path="/verify-otp" element={<VerifyOtpView />} />

          {/* ── Protected Routes ── */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/studentprofile" element={<ProfileStudent />} />
            <Route path="/student/profile" element={<ProfileStudent />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacherprofile" element={<ProfileTeacher/>}/>
            <Route path="/teacher/profile" element={<ProfileTeacher />} />
            <Route path="/teacher/teacherspecial" element={<TeacherSpecial />} />
            <Route path="/students_attendance" element={<Attforteacher />} />
            <Route path="/show_attendance"     element={<Attshow />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
            <Route path="/parentprofile" element={<ProfileParent />} />
            <Route path="/parent/profile" element={<ProfileParent />} />
          </Route>

          {/* ── Admin Routes (nested) ── */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="dashboard" element={<AdminLayout />}>
            <Route index             element={<Dashboard />} />
            <Route path="students"   element={<Students />} />
            <Route path="teachers"   element={<Teachers />} />
            <Route path="parents"    element={<Parents />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="marks"      element={<Marks />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="settings"   element={<Settings />} />
            <Route path="staff"      element={<AdminStaff />} />
            </Route>
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

          </Routes>
        </PageWrapper>
      </main>
      {showGuestWidgets && isFloatingVisible && <FloatingWhatsapp />}
    </div>
  );
}

// ---- App -----
function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ScrollingSmooth />
    </BrowserRouter>
  );
}

export default App;
