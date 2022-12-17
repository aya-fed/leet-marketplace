import React, { useState } from "react";
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { Link, } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";

// Ethan Bottom Nav, Still needs to be linked to buttons
// note to incorporate development of footer element, I have had to adjust the background of this element and will need to sort out the flex box to make sure parts of the bottomnav are not lost on resize / smaller devices
const BottomNav = () => {
  const Menus = [
  
    { name: "Home", icon: <AiFillHome />, dis: "-",  link: <Link to="/Home" /> },
    

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
    
    <div className="bg-[#252A41] h-[5%]  rounded-t-xl fixed bottom-0  pt-4  lg:hidden">
      <ul className="flex ">
        
          <span       
     
          ></span>
       
        <div  className="w-screen justify-evenly flex">
        {Menus.map((menu, i) => (
          <li key={i} className="- " >
            <a
              className=" text-center  "
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  i === active && "  text-[#51D9D9]"
                }`}
              >
              {menu.icon}
              </span>
              <span
                className={` ${
                  active === i
                    ? " opacity-100"
                    : ""
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
export default BottomNav