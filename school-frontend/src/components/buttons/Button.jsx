export default function Button({
  text,
  onClick,
  color = "blue",
  icon,
}) {

  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
    gray: "bg-gray-500 hover:bg-gray-600"
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-white px-3 py-1 rounded ${colors[color]}`}
    >
      {icon}
      {text}
    </button>
  );
}