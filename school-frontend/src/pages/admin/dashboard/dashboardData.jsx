import {
  FiBookOpen,
  FiBriefcase,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { FaBell, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";

export const dashboardCards = [
  {
    title: "Students",
    value: 520,
    icon: FiUsers,
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Teachers",
    value: 32,
    icon: FiUserCheck,
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Staff",
    value: 15,
    icon: FiBriefcase,
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    title: "Classes",
    value: 12,
    icon: FiBookOpen,
    accent: "from-amber-500 to-orange-400",
  },
];

export const quickActions = [
  {
    label: "Add Student",
    href: "/dashboard/students",
    icon: FaUserGraduate,
    className: "bg-blue-600 hover:bg-blue-700",
  },
  {
    label: "Add Teacher",
    href: "/dashboard/teachers",
    icon: FaChalkboardTeacher,
    className: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    label: "Add Notice",
    href: "/dashboard/announcements",
    icon: FaBell,
    className: "bg-amber-600 hover:bg-amber-700",
  },
  {
    label: "Manage Staff",
    href: "/dashboard/staff",
    icon: FiBriefcase,
    className: "bg-violet-600 hover:bg-violet-700",
  },
  {
    label: "Curriculum",
    href: "/dashboard/curriculum",
    icon: FiBookOpen,
    className: "bg-slate-700 hover:bg-slate-800",
  },
  
];

export const activityItems = [
  "New student added",
  "Teacher Ravi Sharma updated",
  "Fees submitted by Rahul",
  "New notice posted",
];

export const noticeItems = [
  "School closed on Monday",
  "Exam schedule updated",
  "Annual function next week",
];

export function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5 dark:border-gray-700 dark:bg-white/10">
      <h2 className="mb-4 text-base font-semibold sm:text-lg">{title}</h2>
      {children}
    </div>
  );
}

export function StatCard({ card }) {
  const CardIcon = card.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-1 sm:p-5 dark:border-gray-700 dark:bg-white/10">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{card.value}</h3>
        </div>

        <div className="rounded-2xl bg-slate-100 p-2.5 text-slate-500 sm:p-3 dark:bg-white/10 dark:text-white">
          <CardIcon size={28} />
        </div>
      </div>
    </div>
  );
}

export function ActionCard({ action, compact }) {
  const ActionIcon = action.icon;

  return (
    <Link
      to={action.href}
      className={
        compact
          ? `flex min-w-[160px] items-center gap-3 rounded-2xl px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5 sm:min-w-[180px] ${action.className}`
          : "rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-gray-700 dark:bg-white/10"
      }
    >
      {compact ? (
        <>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <ActionIcon className="text-lg" />
          </span>
          <span className="flex min-w-0 flex-col items-start">
            <span className="text-sm font-semibold">{action.label}</span>

          </span>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className={`rounded-2xl p-3 text-white ${action.className}`}>
            <ActionIcon className="text-lg" />
          </div>
          <div>
            <p className="font-semibold">{action.label}</p>

          </div>
        </div>
      )}
    </Link>
  );
}
