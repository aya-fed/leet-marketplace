import { useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { useNavigate, useRouteLoaderData } from "react-router"
import { Link } from "react-router-dom"
export default function SidebarItem({item}){
    const [open, setOpen] = useState(false)

    // Ethan -
// accordian but named as SidebarItem and maps over the links, I created a Json file in the data folder to map over the links for the router but I wasn't sure if that was the correct protocol, let me know :)
    
//  should be set to the md breakpoint to disappear when resized.
    // note hamburger menu needs some editing or this file breakpoint needs editing to include the hamurger button click, at the moment it wont appear because it is set to w-0 at md breakpoint or lower ,  

    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}> 
                <div className="sidebar-title " onClick={() => setOpen(!open)}> 
                    <span onClick={() => setOpen(!open)}> 
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                      <i  className="chevron toggle-btn" onClick={() => setOpen(!open)}><BiChevronDown /></i>
                </div>
               <div className="sidebar-content ">
                    {item.childrens.map((child, index) => <SidebarItem key={index} item={child} />)}
                    
                </div>
                
            </div>
        )
    }else{
        return (
            <Link to={`category/${item.title}`} className="sidebar-item plain  " onClick={useRouteLoaderData}>
                { item.icon && <i className={item.icon}></i> }
                {item.title} 
            </Link>
            
        )
    }
}

