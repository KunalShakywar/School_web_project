import { Link } from "react-router-dom";

const NavbarDesktopLinks = ({ links, currentPath }) => {
  return (
    <ul className="hidden items-center gap-3 md:flex">
      {links.map((link) => (
        <li key={link.path || link.name} className="relative group flex">
          {link.dropdown ? (
            <>
              <button className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-slate-700 hover:text-blue-600">
                {link.icon && <link.icon size={18} />}
                {link.name} ▾
              </button>
              <ul className="absolute left-0 mt-10 w-56 rounded-xl border border-slate-200 bg-white backdrop-blur-md p-2 shadow-lg opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {link.dropdown.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link
              to={link.path}
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold transition-all hover:text-blue-600 ${
                currentPath === link.path
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-700"
              }`}
            >
              {link.icon && <link.icon size={18} />}
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavbarDesktopLinks;
