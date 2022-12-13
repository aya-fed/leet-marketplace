// SIDEBAR.JSX

import SidebarItem from "./SidebarItem.jsx"
import items from "../data/SideNav.json"
import Button from "./ui/Button.jsx"


export default function Sidebar(){
  return (
      // Ethan - this is the component sidebar, item.map Connects to SidebarItem - if you wish to add a new page / link find in data/SideNav.Json
    
    
    // note check the buttons the label prop didn't work for me 
    <div className="sidebar bg-[#252A41] h-[100vh] fixed top-0 left-0 overflow-auto flex flex-col  pt-24 md:w-80 w-0    ease-in duration-500 "   >
      
      <Button label="New listing"
      className=" mt-16 mb-16 " />

      {items.map((item, index) => <SidebarItem key={index} item={item} />)}
      
      <div
        className="bg-[#fff] h-0.5 opacity-50 w-[90%] self-center align-bottom mt-44" >
      </div>
      <div
        className="pl-12 mt-8 w-[75%]    ">
        <Button
          label="Logout" />
      </div>
    
    </div>
    
    )
}
