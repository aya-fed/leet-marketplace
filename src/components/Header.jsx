// Coded by Michele Carter

import { HiMagnifyingGlass } from "react-icons/hi2"
import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Logo from "../assets/Leet-Logo.svg"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";
// import Button from "./ui/Button"
import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth";
import Button from "../components/ui/Button";
import Modal from "../components/Modal";



const Header = () => {

  // Set Modal state
  const [modalOpen, setIsModalOpen] = useState(false);

  // Modal state toggler
  const toggleModal = () => {
    setIsModalOpen(!modalOpen);
  }

  // Define variable state using useState hook
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Hamburger state toggler
  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }; 

 // Hook for cheking viewport and adds an event listener for resize event
  useEffect(() => {
    if (window.innerWidth > 1280) setHamburgerOpen(true);
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

   // Function for checking breakpoint and setting hamburger state
  function checkWidth() {
    const width = window.innerWidth;
    if (width > 1280) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full ">
      <div className="flex items-center justify-between h-[100px] bg-background-2 z-[199] border-b px-4">

        <div className="flex items-center gap-4">
          {/* hamburger menu */}
          <div className={`${hamburgerOpen && 'xl:hidden'} flex-col flex-nowrap justify-around w-[36px] h-[23px] z-10 text-background-4 cursor-pointer`} onClick={handleToggle}>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
          </div>
          {/* Leet logo */}
          <div className="items-center w-[90px] h-[77px]">
            <img className="w-[90px] h-[77px]" src={Logo} />
          </div>
        </div> 

        {/* search bar */}
        <div className="">
          <div className="flex w-[50px] md:w-full justify-between h-10 rounded-3xl bg-background-2 border border-primary p-2">
            <input type="text" />
            <HiMagnifyingGlass className="text-neutral-light md:float-right mx-4 cursor-pointer" />
          </div>
        </div> 

        {/* wishlist/notification icons and sign in/account button */}
        <div className="hidden md:inline-flex items-center gap-6 ">
          <div><NotificationIcon size={20} /></div>
          <Link to="/wishlist"><WishlistIcon size={20}/></Link>
          <Button className="px-4" onClick={() => setIsModalOpen(true)}>Sign in</Button>
        </div>
        {/* {auth.currentUser && (
            <Button onClick={onLogout} className="sm:w-[400px] mx-auto">
              Sign out
            </Button>
          )}

          {!auth.currentUser && <Button onClick={() => setIsModalOpenContentCheck(true)}>Sign in</Button>} */}

      </div>

      {/* sidebar */} 
      <div className={`${!hamburgerOpen && '-translate-x-80'} h-screen ease-in duration-500 fixed `}>
        <Sidebar className=""/>
      </div>   
      
    </div>
  );
};

export default Header;
