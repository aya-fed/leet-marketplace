// Coded by Aya Saito

import { BiEditAlt } from "react-icons/bi";

function EditIcon({ className, size, showText, onClick }) {
  return (
    <div className={`flex gap-1 cursor-pointer ${className}`} onClick={onClick}>
      <BiEditAlt size={size} />
      {showText && <div className={size ? `text-[${size}px]` : "text-xs"}>Edit</div>}
    </div>
  );
}

export default EditIcon;
