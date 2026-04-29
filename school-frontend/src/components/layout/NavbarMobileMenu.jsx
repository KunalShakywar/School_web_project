import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiUser,
  FiBook,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const NavbarMobileMenu = ({
  links,
  openDropdown,
  setOpenDropdown,
  setIsOpen,
}) => {
  return (
    <ul className="space-y-2">
      {links.map((link) => {
        const isOpen = openDropdown === link.name;

        const MainIcon = link.icon;

        return (
          <li key={link.name}>
            {/* MAIN ITEM */}
            {link.dropdown ? (
              <button
                onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  {MainIcon ? (
                    <MainIcon size={18} className="text-slate-600" />
                  ) : (
                    <FiHome size={18} className="text-slate-600" />
                  )}

                  <span>{link.name}</span>
                </div>

                {isOpen ? (
                  <FiChevronUp size={16} />
                ) : (
                  <FiChevronDown size={16} />
                )}
              </button>
            ) : (
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {MainIcon ? (
                  <MainIcon size={18} className="text-slate-600" />
                ) : (
                  <FiHome size={18} className="text-slate-600" />
                )}

                <span>{link.name}</span>
              </Link>
            )}

            {/* DROPDOWN */}
            {link.dropdown && isOpen && (
              <ul className="mt-1 ml-4 space-y-1 border-l border-white pl-3">
                {link.dropdown.map((item, index) => {
                  const icons = [FiUser, FiUsers, FiBook, FiSettings];
                  const SubIcon = item.icon || icons[index % icons.length];

                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          setOpenDropdown(null);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <SubIcon size={16} className="text-slate-500" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarMobileMenu;
