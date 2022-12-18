// Coded by Michele Carter

import { HiMagnifyingGlass } from "react-icons/hi2"
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (window.innerWidth > 1280) setHamburgerOpen(true);
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function checkWidth() {
    const width = window.innerWidth;
    if (width > 1280) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
  }


  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="relative flex items-center justify-between h-[100px] bg-background-2 z-[199] border-b gap-4 px-4">

        <div className="flex items-center gap-4">
          {/* Leet logo */}
          <div className=" ">
            <div className="items-center w-[90px] h-[77px]"><img src={Logo} /></div>
          </div>
          {/* hamburger menu */}
          <div className={`${hamburgerOpen && 'xl:hidden'} flex-col flex-nowrap justify-around w-8 h-8 z-10 text-background-4 cursor-pointer`} onClick=         {handleToggle}>
            <div className="w-8 h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="w-8 h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="w-8 h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
          </div>
        </div> 

        {/* search bar */}
        <div className="md:grow">
          <div className="h-8 rounded-3xl bg-background-2 border border-primary"><HiMagnifyingGlass className="text-neutral-light float-right mt-2 mx-4" /></div>
        </div> 

        {/* wishlist/notification icons and sign in/account button */}
        <div className="hidden md:inline-flex items-center gap-6 ">
          <div><NotificationIcon size={20} /></div>
          <div><WishlistIcon size={20}/></div>
          <Button className="border rounded-lg w-max px-4">Sign in</Button>
        </div>
      </div>

      {/* sidebar note - Michelle I have scraped the props for the sidebar and merged them with the Sidebar I developed.  */} 
      <div className={`${!hamburgerOpen && '-translate-x-80'} h-screen ease-in duration-500 fixed z-[100]`}>
        <Sidebar className=""/>
      </div>   
      
    </div>
  );
};

export default Header;
