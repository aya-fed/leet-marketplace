import React, { useState } from "react";
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";

// Ethan Bottom Nav, Still needs to be linked to buttons 
const BottomNav = () => {
  const Menus = [
    { name: "Home", icon: <AiFillHome />, dis: "-" },
    

    {
      name: "Search", icon: <HiMagnifyingGlass  />
      , dis: "-"
    },
    { name: "Wishlist", icon: <WishlistIcon  />, dis: "-" },
    
    { name: "Profile", icon: <FaUser />, dis: "-" },
    
    { name: "Notifications", icon:<AiFillBell />,  dis: "-" }
  ];
 const [active, setActive] = useState(0);
  return (
    <div className="bg-[#252A41] max-h-[12rem] object-center  flex justify-center flex-shrink  rounded-t-xl  md:invisible">
      <ul className="flex  fixed bottom-8  pl-8">
        <span

        >
          <span
            className="w-3.5 h-3.5 bg-transparent  top-4 
          rounded-tr-[11px] "
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent top-4  
          rounded-tl-[11px] "
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  i === active && " text-[#51D9D9] z-40"
                }`}
              >
              {menu.icon}
              </span>
              <span
                className={` ${
                  active === i
                    ? " duration-700 opacity-100"
                    : "opacity-100 "
                } `}
              >
            
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNav;