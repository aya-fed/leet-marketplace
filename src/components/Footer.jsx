// Coded by Ethan Cullen
import React from "react";
import ItemsContainer from "./footer/ItemsContainer";
import SocialIcons from "./footer/SocialIcons";
import { Icons } from "./footer/Menus";

const Footer = () => {
  return (
    <footer className=" text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4   py-">
        <h1
          className="lg:text-4xl text-3xl  md:mb-0 mb-0 lg:leading-normal font-semibold
         md:w-2/5 "
        >
          </h1>
          </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2  text-gray-400 text-sm"
      >
        <span>© 2022 LEET. All rights reserved.</span>
        <span>Terms,  Privacy Policy</span>
        <SocialIcons Icons={Icons}  />
      </div>
    </footer>
  );
};

export default Footer;