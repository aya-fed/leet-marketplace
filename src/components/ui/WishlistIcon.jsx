// Coded by Michele Carter

import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";

function WishlistIcon() {
  const [isActive, setIsActive] = useState(false);

  function toggleState() {
    setIsActive(!isActive);
  }

  return (
    <div>
      {!isActive && <HiOutlineHeart className="text-neutral-light" onClick={toggleState} />}
      {isActive && <HiHeart onClick={toggleState} />}
    </div>
  );
}

export default WishlistIcon;
