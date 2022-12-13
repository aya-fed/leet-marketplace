// Coded by Michele Carter

import { HiMagnifyingGlass } from "react-icons/hi2"
import { AiOutlineClose } from "react-icons/ai"
import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Logo from "../assets/Leet-Logo.svg"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";
import Button from "./ui/Button"

const Header = () => {

  // Hamburger menu state setting for open/close toggle
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Hamburger open/close toggle
  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }; 

  return (
    <div className="absolute top-0 left-0">
      <div className="w-full h-[100px] px-4 bg-background-2 z-[199] fixed flex items-center border-b gap-4">

        <div className="flex items-center">
          <div className="h-6 w-[34px] bg-gradient-2" ></div>
          {/* hamburger menu */}
          <div className="flex-col flex-nowrap justify-around w-8 h-8 z-10 mr-10 text-background-4 cursor-pointer" onClick={handleToggle}>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
          </div>
          {/* Leet logo */}
          <div className="mr-10 w-[90px] h-[77px]"><img src={Logo} /></div>
        </div>

        {/* search bar */}
        <div className="h-8 w-full rounded-3xl mr-10 bg-background-2 border border-primary justify-center"><HiMagnifyingGlass className="className='text-neutral-light float-right mt-2 mx-4"/></div>

        {/* wishlist/notification icons and sign in/account button */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block"><NotificationIcon size={20} /></div>
          <div className="hidden md:block"><WishlistIcon size={20}/></div>
          <div className="hidden md:block border items-center rounded-lg w-max p-2"><Button /></div>
        </div>
      </div>

      {/* sidebar note - Michelle I have scraped the props for the sidebar and merged them with the Sidebar I developed.  */} 
      <div className={`${!hamburgerOpen && '-translate-x-60'}`}>
        <Sidebar />
        <AiOutlineClose className="float-right cursor-pointer m-2" onClick={handleToggle}/>
      </div>   
      
    </div>
  );
};

export default Header;
