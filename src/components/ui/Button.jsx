const Button = ({ type, id, className, onClick, value, ...props }) => {
  const extraClasses = className ?? "";
  return (
    <button
      className={`
        w-full h-[48px] rounded-[10px] border border-primary text-primary flex gap-2
        py-3 flex justify-center items-center leading-none
        transition duration-500 ease-in-out hover:scale-105 
        ${extraClasses}`}
      id={id}
      type={type}
      value={value}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
