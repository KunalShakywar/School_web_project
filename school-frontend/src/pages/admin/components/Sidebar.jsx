import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiParentLine } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { FiBriefcase, } from "react-icons/fi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BsDatabaseAdd } from "react-icons/bs";
// Back Button
import Backbtn from "../../../components/Backbtn";
// context
import {useAuth} from "../../auth/context/AuthContext"



const adminLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <IoHomeOutline size={18} />,
    className: "bg-blue-600 hover:bg-blue-700",
  },
   
  {
    name: "Students",
    icon: <PiStudentBold size={18} />,
    className: "bg-green-600 hover:bg-green-700",
    dropdown: [
      { name: "All Students", path: "/dashboard/students" },
      { name: "Attendance", path: "/dashboard/attendance" },
      { name: "Marks", path: "/dashboard/marks" },
    ],
  },
  // Faculty
  {
    name: "Faculty",
    icon: <TiGroupOutline size={18} />,
    className: "bg-emerald-600 hover:bg-emerald-700",
    dropdown: [
      { name: "All Teachers", path: "/dashboard/teachers", icon: <LiaChalkboardTeacherSolid size={18} /> },
      
      { name: "All Staff", path: "/dashboard/staff", icon: <FiBriefcase size={18} /> },
    ],
  },
  {
    name: "Parents",
    icon: <RiParentLine size={18} />,
    path: "/dashboard/parents",
    className: "bg-amber-600 hover:bg-amber-700",
  },
  {
    name: "Announcements",
    icon: <TfiAnnouncement size={18} />,
    path: "/dashboard/announcements",
    className: "bg-violet-600 hover:bg-violet-700",
  },
   { 
    name: "Register",
    icon: <BsDatabaseAdd size={18} />,
    path: "/register",
    className: "bg-gray-600 hover:bg-gray-700", },

  {
    name: "Settings",
    icon: <IoSettingsOutline size={18} />,
    className: "bg-gray-600 hover:bg-gray-700",
    path: "/dashboard/settings",
  }
];

function AdminSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const { logout } = useAuth();
  return (
    <div className="w-64 h-screen dark:text-white p-10 dark:bg-white/10 backdrop-blur-md border-r-transparent rounded-tl-lg rounded-bl-lg ">
<div className="flex justify-between  ">
      <h1 className="text-2xl  font-bold mb-8">Admin</h1>

</div>

      <ul className="space-y-3 ">

        {adminLinks.map((link) => (
          <li key={link.name}>
            {link.dropdown ? (
              <>
                <button
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name
                    )
                  }
                >
                  {link.icon}
                  {link.name}

                  <span className="ml-auto">
                    {openDropdown === link.name ? "▲" : "▼"}
                  </span>
                </button>

                {openDropdown === link.name && (
                  <ul className="ml-8 mt-2  space-y-2">
                    {link.dropdown.map((item) => (
                      <li  key={item.name}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `block p-2 rounded hover:bg-gray-800 ${isActive ? "bg-blue-600 flex" : ""
                            }`
                          }
                        >
                          <span className="flex items-center  gap-2">  

                       {item.icon}
                          {item.name}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-gray-800 ${isActive ? "bg-blue-600" : ""
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <button onClick={logout} className="w-full mt-4   text-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-red-500 transition hover:bg-red-50/20 border border-red-500 hover:border-red-600"> 
Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
