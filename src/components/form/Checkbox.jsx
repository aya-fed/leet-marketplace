import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import RequiredChip from "./RequiredChip";

const Checkbox = ({ id, label, labelClassName, value, checked, onChange, className, required, reverse }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      className={`
        my-4
        ${
          reverse
            ? "flex gap-2 sm:gap-0 sm:grid sm:grid-cols-[1fr_minmax(0,_2fr)]"
            : "text-left flex items-center space-x-2 mr-5"
        }
        `}
    >
      <input
        type="checkbox"
        id={id}
        value={value ?? value}
        className={twMerge(`
          px-2 py-2 mt-[6px]
          text-sm text-primary
          bg-white
         rounded 
          ${className ?? ""}
        `)}
        onChange={e => {
          setIsChecked(!isChecked);
          onChange(e);
        }}
        checked={isChecked}
        style={reverse && { order: 2 }}
      />
      {label && (
        <div
          className={`flex justify-start items-center md:flex-wrap md:justify-start`}
          style={reverse && { order: 1 }}
        >
          <label htmlFor={id} className={twMerge(`my-1 mr-2 ${labelClassName}`)}>
            {label}
          </label>
          {required && <RequiredChip />}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
