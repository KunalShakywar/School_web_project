import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import Home from "../pages/home/Home"


function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
      <IoHomeOutline size={22} />
    </button>
  );
}

export default BackButton;