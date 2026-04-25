import { GrUserAdmin } from "react-icons/gr";
import { VscGitStashApply } from "react-icons/vsc";
import { GiNewspaper } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { MdOutlineContactMail } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { CgDanger } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

export const NAV_LINKS = [
  { name: "Home", path: "/", icon: IoHomeOutline },
  {
    name: "Academics",
    icon: HiOutlineAcademicCap,
    dropdown: [
      { name: "Curriculum", path: "/curriculum" },
      { name: "Academic Calendar", path: "/calender" },
      { name: "Examinations", path: "/examination" },
      { name: "Results", path: "/results" },
      { name: "Timetable", path: "/timetable" },
    ],
  },
  {
    name: "Faculty",
    icon: TiGroupOutline,
    dropdown: [
      { name: "Teacher's", path: "/teacher" },
      { name: "Staff", path: "/staff" },
    ],
  },
  { name: "News & Notices", path: "/news", icon: GiNewspaper },
  { name: "Gallery", path: "/gallery", icon: GrGallery },
  { name: "Contact", path: "/contact", icon: MdOutlineContactMail },
  { name: "About", path: "/about", icon: CgDanger },
];

export const AUTH_LINKS = [
  { name: "Login", path: "/login", icon: GrUserAdmin },
  { name: "Apply Now", path: "/contact", icon: VscGitStashApply },
  { name: "Register", path: "/register" },
  { name: "studentprofile", path: "/studentprofile" },
];

export const LOGIN_TRIGGER_ICON = CiLogin;
