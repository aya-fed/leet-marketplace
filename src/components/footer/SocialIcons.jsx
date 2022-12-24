// Ethan Cullen

import { BsDiscord, BsFacebook, BsTwitch, BsTwitter } from "react-icons/bs";
import WebShare from "../ui/WebShare";

function SocialIcons({ }) {
  return (
    <div> Connect with us
      <div className="flex flex-row justify-center text-3xl text-teal-500">
        <WebShare> </WebShare>
        <BsFacebook className="pt-2" />
        <BsTwitch className="pt-2" />
        <BsTwitter className="pt-2" />
        <BsDiscord className="pt-2" />
      </div>
    </div>
  );
}

export { SocialIcons };
