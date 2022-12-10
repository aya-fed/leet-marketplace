import { twMerge } from "tailwind-merge";
import RequiredChip from "./RequiredChip";

const Textarea = ({ id, label, labelClassName, onChange, value, placeholder, className, required, stacked }) => {
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
        className={twMerge(`
        w-full px-4 py-2 
        border-white
        bg-transparent
        rounded 
        ${className ?? ""}
      `)}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
