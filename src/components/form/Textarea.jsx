// Coded by Aya Saito

import { twMerge } from "tailwind-merge";
import RequiredChip from "./RequiredChip";

const Textarea = ({
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
  stacked,
  ...props
}) => {
  return (
    <div
      className={`text-left my-4 ${!stacked && label ? "sm:grid items-start sm:grid-cols-[1fr_minmax(0,_2fr)]" : ""}`}
    >
      {label && (
        <div className={`flex justify-start items-center md:flex-wrap md:justify-start`}>
          <label htmlFor={id} className={`my-1 mr-2 ${labelClassName}`}>
            {label}
          </label>
          {required && <RequiredChip />}
        </div>
      )}
      <textarea
        id={id}
        value={value}
        minLength={min}
        maxLength={max}
        className={twMerge(`
        w-full px-4 py-2 
        border-white
        bg-transparent
        rounded-[10px]
        overflow-y-scroll 
        scrollbar-thin
        scrollbar-track-background-3
        scrollbar-thumb-background-4
        scrollbar-track-rounded-full
        scrollbar-thumb-rounded-full
        ${className ?? ""}
      `)}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Textarea;
