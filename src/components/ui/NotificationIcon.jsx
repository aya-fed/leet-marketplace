// coded by Michele Carter


import { useState } from 'react'
import { FaRegBell  } from 'react-icons/fa'
import { FaBell } from 'react-icons/fa'


function NotificationIcon({ className, size }) {

    const [isActive, setIsActive] = useState(false);

    function toggleState() {
        (setIsActive(!isActive))
    }

    return (
        <div>
            {!isActive && <FaRegBell className='text-primary cursor-pointer hover:scale-125 duration-500' onClick={toggleState} size={size} />}
            {isActive && <FaBell className='text-primary cursor-pointer' onClick={toggleState} size={size} />}
        </div>
   
    )
    
 }
 
 export default NotificationIcon 