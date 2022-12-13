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
            {!isActive && <FaRegHeart  className='text-neutral-light' onClick={toggleState} size={size} />}
            {isActive && <FaHeart  onClick={toggleState} size={size} />}
        </div>
   
    )
    
 }
 
 export default WishlistIcon      