// Coded by Aya Saito

import { twMerge } from "tailwind-merge";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import RequiredChip from "./RequiredChip";

const InputField = ({
  type,
  id,
  label,
  labelClassName,
  min,
  max,
  currency,
  onChange,
  onBlur,
  value,
  placeholder,
  required,
  className,
  stacked,
  showPassword,
  setShowPassword,
  ...props
}) => {
  let inputType = type ?? "text";
  function toggleShowPassword() {
    setShowPassword();
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
      <div className="relative rounded-[10px] overflow-hidden">
        {currency && (
          <div
            className="absolute p-[1px] h-full w-7 left-0 font-medium text-center text-background-4"
            style={{ borderTopLeftRadius: "0.25rem" }}
          >
            <div className="flex w-full h-full rounded-tl-[10px] rounded-bl-[10px] bg-yellow justify-center items-center">
              <span>{currency}</span>
            </div>
          </div>
        )}
        <input
          type={type !== "password" ? inputType : showPassword ? "text" : "password"}
          id={id}
          value={value}
          min={min}
          max={max}
          className={twMerge(`
            w-full py-2 
            border 
            border-neutral-light
            bg-transparent
            rounded-[10px] 
            ${currency ? "pl-9 pr-4" : "px-4"}
            ${className ?? ""}
          `)}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
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
