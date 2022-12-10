import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import RequiredChip from "./RequiredChip";

const InputField = ({
  type,
  id,
  label,
  labelClassName,
  currency,
  onChange,
  value,
  placeholder,
  required,
  className,
  stacked,
  ...props
}) => {
  let inputType = type ?? "text";
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div
      className={`text-left my-6 ${!stacked && label ? "sm:grid items-center sm:grid-cols-[1fr_minmax(0,_2fr)]" : ""}`}
    >
      {label && (
        <div className="flex justify-start items-center md:flex-wrap md:justify-start">
          <label htmlFor={id} className={`my-1 mr-2 ${labelClassName}`}>
            {label}
          </label>
          {required && <RequiredChip />}
        </div>
      )}
      <div className="relative rounded overflow-hidden">
        {currency && (
          <div
            className="absolute h-full w-7 rounded border-t border-b border-l border-white font-medium text-center left-0 bg-yellow"
            style={{ borderTopLeftRadius: "0.25rem" }}
          >
            <div className="absolute w-full top-[50%] translate-y-[-50%] mx-auto">{currency}</div>
          </div>
        )}
        <input
          type={type !== "password" ? inputType : showPassword ? "text" : "password"}
          id={id}
          value={value}
          className={twMerge(`
            w-full py-2 
            border-white
            bg-transparent
            rounded 
            ${currency ? "pl-9 pr-4" : "px-4"}
            ${className ?? ""}
          `)}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
        {type === "password" && // Toggle display of password chars
          (showPassword ? (
            <AiFillEyeInvisible
              size={28}
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <AiFillEye
              size={28}
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default InputField;
