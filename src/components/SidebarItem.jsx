// Ethan Cullen
import { useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { useNavigate, useRouteLoaderData } from "react-router"
import { Link } from "react-router-dom"
export default function SidebarItem({item}){
    const [open, setOpen] = useState(false)



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
               <div className="sidebar-content  ">
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

