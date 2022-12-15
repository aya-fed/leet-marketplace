// Coded by Aya Saito

export default function MyAccountInput({ id, type, label, value, placeholder, required, disabled, ...props }) {
  return (
    <div className="my-3">
      <label htmlFor={id} className="block mb-1 text-xs text-neutral">
        {label}
      </label>
      <input
        id={id}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
