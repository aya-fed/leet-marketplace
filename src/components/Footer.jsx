// Ethan Cullen

import { ItemsContainer } from "./footer/ItemsContainer";
import { SocialIcons } from "./footer/SocialIcons";

function Footer() {
  return (
    <footer className="text-white ">
      <div className="px-4 md:flex md:justify-between md:items-center sm:px-12 ">
        <h1
          className="mb-0 text-3xl font-semibold lg:text-4xl md:mb-0 lg:leading-normal md:w-2/5 "
        >
        </h1>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 gap-10 pt-4 text-sm text-center text-gray-400 sm:grid-cols-2 lg:grid-cols-3"
      >
        <span>© 2022 LEET. All rights reserved.</span>
        <span>Terms,  Privacy Policy</span>
        <SocialIcons />
      </div>
    </footer>
  );
}

export { Footer };
