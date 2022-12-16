// Coded by Michele Carter

import { useState } from 'react'
import { FaRegHeart} from 'react-icons/fa'
import { FaHeart} from 'react-icons/fa'


function WishlistIcon({ className, size }) {

    const [isActive, setIsActive] = useState(false);

    function toggleState() {
        (setIsActive(!isActive))
    }

    return (
        <div>
            {!isActive && <FaRegHeart  className='text-primary cursor-pointer hover:scale-125 duration-500' onClick={toggleState} size={size} />}
            {isActive && <FaHeart className='text-primary cursor-pointer hover:scale-125 duration-500' onClick={toggleState} size={size} />}
        </div>
   
    )
    
 }
 
 export default WishlistIcon      
