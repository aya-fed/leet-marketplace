// Ethan Cullen
import React from "react"
import WebShare from "../ui/WebShare"
import { BsFacebook, BsTwitch, BsTwitter, BsDiscord } from "react-icons/bs";

const SocialIcons = ({ Icons }) => {
  return (
    <div> Connect with us 
    <div className="text-teal-500 text-3xl justify-center flex flex-row">
      <WebShare > </WebShare>
      <BsFacebook className="pt-2" />
      <BsTwitch className="pt-2" />
      <BsTwitter className="pt-2" />
      <BsDiscord className="pt-2" />
      </div>
      
      </div>
  );
};

export default SocialIcons;