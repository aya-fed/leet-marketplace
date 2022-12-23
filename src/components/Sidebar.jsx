// Ethan Cullen
import { React, useContext } from "react"
import SidebarItem from "./SidebarItem.jsx"
import items from "../data/SideNav.json"
import Button from "./ui/Button.jsx"
import PopupAuthForm from "./PopupAuthForm";
import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
export default function Sidebar() {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const auth = getAuth();
  function onLogout() {
    auth.signOut();
    setIsLoggedIn();
    toast.success("Successfully logged out");
  }
  function onSignin()
  {

  }
  return (
      // Ethan - this is the component sidebar, item.map Connects to SidebarItem - if you wish to add a new page / link find in data/SideNav.Json
    
    
//  Buttons still require some logic and the mobile needs the side Nav to go off screen but I couldn't problem solve this yet something to do with the button on the header menu, 
    <div className="sidebar bg-[#252A41] h-[90vh]  left-0  overflow-scroll  flex-col  top-24  w-80  ease-in duration-500 scrollbar-thin z-[199] "
    > 
          <div className="flex justify-center z-50" >
      <Button
    
        label="New listing"
        className=" mt-12 mb-4 w-[75%] ">
        <Link to='/create-listing'>New Listing</Link>
        
        </Button>
        </div>

      {items.map((item, index) => <SidebarItem key={index} item={item}  />)}
      
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
}
