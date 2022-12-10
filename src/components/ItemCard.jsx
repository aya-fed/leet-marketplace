import React from 'react'
import WishlistIcon from './ui/WishlistIcon'


function ItemCard({item}) {
    return (

      <div className="flex-col h-90 w-full rounded-lg overflow-hidden shadow-lg bg-background-3 text-neutral-light">
  
        <div className="bg-neutral-light">
          {item.imageUrls && item.imageUrls.length > 0 ? (<img className="w-full h-40" src={item.imageUrls[0]} alt={item.title} />) : (
            <div className="w-full h-full bg-black">No image</div>)}
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