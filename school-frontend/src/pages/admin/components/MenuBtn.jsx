import { RiMenuFold4Line } from "react-icons/ri";

function MenuBtn({ toggleSidebar }) {
  return (
    <div>
      <button onClick={toggleSidebar} className="text-2xl md:hidden" type="button">
        <RiMenuFold4Line />
      </button>
    </div>
  );
}

export default MenuBtn;
