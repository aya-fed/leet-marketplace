// SIDEBAR.JSX

import SidebarItem from "./SidebarItem.jsx"
import items from "../data/SideNav.json"
import Button from "./ui/Button.jsx"


export default function Sidebar(){
  return (
      // Ethan - this is the component sidebar, item.map Connects to SidebarItem - if you wish to add a new page / link find in data/SideNav.Json
    
    
//  Buttons still require some logic and the mobile needs the side Nav to go off screen but I couldn't problem solve this yet something to do with the button on the header menu, 
    <div className="sidebar bg-[#252A41] h-[100vh] fixed top-0 left-0 overflow-auto flex flex-col  pt-24  w-80  ease-in duration-500 scrollbar-thin z-10 "   > 
      
      <Button label="New listing"
        className=" mt-16 mb-4  scale-75 ">
        New Listing
      </Button>

      {items.map((item, index) => <SidebarItem key={index} item={item} />)}
      
      <div
        className="bg-[#fff] h-0.5 opacity-50 w-[90%] self-center align-bottom mt-12 mb-4" >
      </div>
      <div
        className="pl-12 mt-4 w-[75%]    ">
        <Button
          label="Logout" >
          Logout
        </Button>
      </div>
    
    </div>
    
    )
}
