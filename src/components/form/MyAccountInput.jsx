// Coded by Aya Saito

import { twMerge } from "tailwind-merge";

export default function MyAccountInput({
  id,
  type,
  label,
  labelClassName,
  min,
  max,
  value,
  minlength,
  maxlength,
  placeholder,
  required,
  disabled,
  onChange: propOnChange,
  onBlurpropOnBlur,
  className,
  stacked,
  ...props
}) {
  return (
    <div className="my-3">
      <label htmlFor={id} className="block text-xs text-neutral">
        {label}
      </label>
      <input
        id={id}
        type={type ?? "text"}
        value={value}
        min={min}
        max={max}
        minlength={minlength}
        maxlength={maxlength}
        className={twMerge(`
          w-full
          bg-transparent
          ${className ?? ""}
          ${!disabled && "border border-neutral-light rounded-[10px] mt-1 py-1 px-3"} 
        `)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
