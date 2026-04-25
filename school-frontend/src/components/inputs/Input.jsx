export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder
}) {
  return (
    <div className="flex flex-col gap-1">

      {label && <label className="font-medium">{label}</label>}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border p-2 rounded focus:outline-blue-500"
      />

    </div>
  );
}