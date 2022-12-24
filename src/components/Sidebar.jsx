// Ethan Cullen
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import items from "../data/SideNav.json";
import {SidebarItem }from "./SidebarItem.jsx";
import Button from "./ui/Button.jsx";
export function Sidebar() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const auth = getAuth();
  function onLogout() {
    auth.signOut();
    setIsLoggedIn();
    toast.success("Successfully logged out");
  }
  function onSignin() {

  }
  return (

    <div className="sidebar bg-[#252A41] h-[90vh]  left-0  overflow-scroll  flex-col  top-24  w-80  ease-in duration-500 scrollbar-thin z-[199] "
    >
      <div className="z-50 flex justify-center" >
        <Button

          label="New listing"
          className=" mt-12 mb-4 w-[75%] ">
          <Link to='/create-listing'>New Listing</Link>

        </Button>
      </div>

      {items.map((item, index) => <SidebarItem key={index} item={item} />)}

      <div
        className="bg-[#fff] h-0.5  w-[90%] self-center align-bottom mt-12 mb-4 " >
      </div>
      <div
        className="pl-12 mt-4 w-[75%] ">
        <Button
          onClick={onLogout}
          label="Logout" >
          {isLoggedIn ? "Log out" : "Sign in"}

        </Button>
      </div>

    </div>

  )
};
