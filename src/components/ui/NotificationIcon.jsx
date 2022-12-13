// coded by Michele Carter


import { useState } from 'react'
import { BsBellFill } from 'react-icons/bs'
import { BsBell } from 'react-icons/bs'


function NotificationIcon() {

    const [isActive, setIsActive] = useState(false);

    function toggleState() {
        (setIsActive(!isActive))
    }

    return (
        <div>
            {!isActive && <BsBell className='text-neutral-light' onClick={toggleState} />}
            {isActive && <BsBellFill onClick={toggleState}/>}
        </div>
   
    )
    
 }
 
 export default NotificationIcon 