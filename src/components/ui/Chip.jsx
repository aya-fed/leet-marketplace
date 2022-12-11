import { twMerge } from "tailwind-merge";

export default function Chip({ className, onClick, children, ...props }) {
  return (
    <div
      className={twMerge(
        `bg-background-4 py-[3px] px-3 text-white font-semibold inline-block rounded-2xl text-sm flex justify-center items-center ${className}`
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
