import { Link } from "react-router-dom";

const NavbarDesktopLinks = ({ links, currentPath }) => {
  return (
    <ul className="hidden items-center gap-3 md:flex">
      {links.map((link) => (
        <li key={link.path || link.name} className="relative group flex">
          {link.dropdown ? (
            <>
              <button className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-white/90 hover:text-white">
                {link.icon && <link.icon size={18} />}
                {link.name} ▾
              </button>
              <ul className="absolute left-0 mt-10 w-56 rounded-xl border border-white/15 bg-blue-950/95 backdrop-blur-md p-2 shadow-lg opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {link.dropdown.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-white"
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
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold transition-all hover:text-white ${
                currentPath === link.path
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/85 hover:text-white"
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
