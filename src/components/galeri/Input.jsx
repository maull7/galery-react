const Input = ({
  type = "text",
  label,
  name,
  id,
  placeholder = "",
  value,
  onChange,
  className = "",
  options = [], // untuk select
}) => {
  return (
    <div className="flex items-center gap-1 mb-3">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 ${className}`}
        >
          <option value="">Pilih kategori</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white ${className}`}
        />
      )}
    </div>
  );
};

export default Input;
