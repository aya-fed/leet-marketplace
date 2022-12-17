// Coded by Michele Carter

import { useState, useEffect } from 'react'
import { FaRegHeart} from 'react-icons/fa'
import { FaHeart} from 'react-icons/fa'


function WishlistIcon({ className, size , state}) {

    const [isActive, setIsActive] = useState(false);

    function toggleState() {
        if (typeof state !== undefined) {
        (setIsActive(!isActive))
        }
    }

    useEffect(() => {
        setIsActive(state);
    }, [state]);

    return (
        <div>
            {!isActive && <FaRegHeart  className='text-primary cursor-pointer hover:scale-125 duration-500' onClick={toggleState} size={size} />}
            {isActive && <FaHeart className='text-primary cursor-pointer hover:scale-125 duration-500' onClick={toggleState} size={size} />}
        </div>
   
    )
    
 }
 
 export default WishlistIcon      
