// Coded by Aya Saito

import { twMerge } from "tailwind-merge";
import RequiredChip from "./RequiredChip";

const MyAccountTextArea = ({
  id,
  label,
  labelClassName,
  min,
  max,
  onChange,
  onBlur,
  value,
  placeholder,
  className,
  required,
  disabled,
  stacked,
  ...props
}) => {
  return (
    <div className="my-3">
      <label htmlFor={id} className="block text-xs text-neutral">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        minLength={min}
        maxLength={max}
        className={twMerge(`
        w-full 
        ${className ?? ""}
        ${!disabled && "border border-neutral-light rounded-[10px] mt-1 py-1 px-3"}
      `)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MyAccountTextArea;
