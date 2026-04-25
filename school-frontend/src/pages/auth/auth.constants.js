import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GrUserAdmin } from "react-icons/gr";

export const roles = [
  { key: "student", label: "Student", path: "/student", hint: "Access classes and results", icon: PiStudent },
  { key: "teacher", label: "Teacher", path: "/teacher", hint: "Manage classroom updates", icon: LiaChalkboardTeacherSolid },
  { key: "parent", label: "Parent", path: "/parent", hint: "Track student progress", icon: RiParentLine },
  { key: "admin", label: "Admin", path: "/admin", hint: "School management access", icon: GrUserAdmin },
];

export const roleRedirects = {
  student: "/studentprofile",
  teacher: "/teacherprofile",
  parent: "/parentprofile",
  admin: "/dashboard",
};

export const getRedirectPath = (role) => roleRedirects[role] || "/";

export const getRoleLabel = (activeRole) => {
  const selected = roles.find((role) => role.key === activeRole);
  return selected ? selected.label : "User";
};
