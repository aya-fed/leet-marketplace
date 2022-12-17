// Coded by Michele Carter

import React from 'react'
import WishlistIcon from './ui/WishlistIcon'


function ItemCard({item}) {
    return (

      <div className="flex-col mx-auto h-90 w-[238px] xs:w-[180px] sm:w[] md:w-[185px] lg:w-[195px] xl:w-[160px] rounded-lg overflow-hidden bg-background-3 text-neutral-light">
  
        <div className="bg-neutral-light">
          {item.imageUrls && item.imageUrls.length > 0 ? (<img className="w-full h-40" src={item.imageUrls[0]} alt={item.title} />) : (
            <div className="w-full h-40 bg-background-2 text-neutral-dark p-2">No image</div>)}
        </div>
  
        <div className="py-2 px-2 text-base h-40">
  
          <div className="font-bold text-sm h-10 mb-2 line-clamp-2">
            {item.title}
          </div>
            
          <p className='text-neutral-400 line-clamp-2 mb-2 h-12'>
            {item.description}
          </p>
          
          <div className='flex justify-between w-full py-2 px-4 drop-shadow-lg'>
            <p className='text-primary'>${item.price}</p>
            <WishlistIcon />
          </div>
  
        </div>
  
      </div>
  
        
    )
  }

export default ItemCard
