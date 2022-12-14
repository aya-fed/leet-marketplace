// Coded by Aya Saito

import { twMerge } from "tailwind-merge";
const defaultClassNamesArr = [
  "w-full",
  "h-[48px]",
  "rounded-[10px]",
  "border",
  "border-primary",
  "text-primary",
  "flex",
  "gap-2",
  "py-3",
  "flex",
  "justify-center",
  "items-center",
  "leading-none",
  "transition",
  "duration-500",
  "ease-in-out",
<<<<<<< HEAD
  "hover:scale-100",
=======
>>>>>>> dev
];
const defaultClasses = defaultClassNamesArr.map(className => className).join(" ");
const cancelButtonDefaultClasses = "border-white text-white";

const Button = ({ type, id, className, onClick, value, cancel, disabled, ...props }) => {
  const cancelDefaultClasses = "initial:border-white initial:text-white";
  return (
    <button
      className={twMerge(
        `${defaultClasses} ${cancel && cancelButtonDefaultClasses} ${!disabled && "hover:scale-105"} ${className ?? ""}`
      )}
      id={id}
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children ? props.children : cancel ? "Cancel" : ""}
    </button>
  );
};

export default Button;
