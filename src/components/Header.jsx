// Coded by Michele Carter

import { HiMagnifyingGlass } from "react-icons/hi2"
import { AiOutlineClose } from "react-icons/ai"
import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Logo from "../assets/Leet-Logo.svg"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";

const Header = () => {

  // Hamburger menu state setting for open/close toggle
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Hamburger open/close toggle
  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }; 

  return (
    <div className="absolute top-0 left-0">
      <div className="w-full h-[100px] px-4 bg-background-2 z-[199] fixed flex place-items-center border-b gap-4">

        <div className="flex items-center">
          <div className="h-6 w-[34px] bg-gradient-2" ></div>
          {/* Leet logo */}
          <div className="mr-10 w-[90px] h-[77px]"><img src={Logo} /></div>
          {/* hamburger menu */}
          <div className="flex-col flex-nowrap justify-around w-8 h-8 z-10 text-background-4 cursor-pointer" onClick={handleToggle}>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
            <div className="w-8 h-1 rounded-lg bg-neutral-light origin-top-left mb-2"></div>
          </div>
        </div>

        {/* search bar */}
        <div className="h-8 w-[1008px] rounded-3xl bg-background-2 border border-primary  justify-center"><HiMagnifyingGlass className="className='text-neutral-light float-right mt-2 mx-4"/></div>

        {/* wishlist/notification icons and sign in/account button */}
        <div className="flex ">
          <div className="hidden h-[50px] w-[50px] md:block p-3"><NotificationIcon /></div>
          <div className="hidden h-[50px] w-[50px] md:block p-3"><WishlistIcon /></div>
          <div className="hidden h-[48px] w-[104px] md:block border rounded-lg p-3">Sign in</div>
        </div>
      </div>

      {/* sidebar */}
      <div className={`bg-background-4 w-60 h-[100vh] z-[200] fixed ease-in duration-500 ${!hamburgerOpen && '-translate-x-60'}`}>
        <Sidebar />
        <AiOutlineClose className="float-right cursor-pointer m-2" onClick={handleToggle}/>
      </div>   
      
    </div>
  );
};

export default Header;
