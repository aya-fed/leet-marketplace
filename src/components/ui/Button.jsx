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
  "hover:scale-105",
];
const defaultClasses = defaultClassNamesArr.map(className => className).join(" ");
const cancelButtonDefaultClasses = "border-white text-white";

const Button = ({ type, id, className, onClick, value, cancel, ...props }) => {
  const cancelDefaultClasses = "initial:border-white initial:text-white";
  return (
    <button
      className={twMerge(`${defaultClasses} ${cancel && cancelButtonDefaultClasses} ${className ?? ""}`)}
      id={id}
      type={type}
      value={value}
      onClick={onClick}
    >
      {props.children ? props.children : cancel ? "Cancel" : ""}
    </button>
  );
};

export default Button;
