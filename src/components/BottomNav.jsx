import React, { useState } from "react";
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";

// Ethan Bottom Nav, Still needs to be linked to buttons
// note to incorporate development of footer element, I have had to adjust the background of this element and will need to sort out the flex box to make sure parts of the bottomnav are not lost on resize / smaller devices
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
    <div className="bg-[#252A41]  max-h-[20rem] object-center  flex justify-center flex-shrink  rounded-t-xl  md:invisible">
      <ul className="flex  fixed bottom-1  " >
        <span

        >
          <span
            className="w-3.5 h-3.5   top-4 
          rounded-tr-[11px] "
          ></span>
          <span
            className="w-3.5 h-3.5  top-4 
          rounded-tl-[11px] "
          ></span>
        </span>
        <div className="flex flex-row "> 
        {Menus.map((menu, i) => (
          <li key={i} className="w-24   bg-[#252a41] ">
            <a
              className="flex flex-col text-center pt-12 pl-8 pb-8"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  i === active && " text-[#51D9D9] z-40 mb-2 "
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
           </div>
      </ul>
    </div>
    
  );
};

export default BottomNav;