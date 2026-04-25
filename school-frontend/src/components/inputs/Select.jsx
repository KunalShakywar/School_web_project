export default function Select({
  label,
  value,
  onChange,
  options
}) {
  return (
    <div className="flex flex-col gap-1">

      {label && <label className="font-medium">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded dark:bg-gray-800"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

    </div>
  );
}