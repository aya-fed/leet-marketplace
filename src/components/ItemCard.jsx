import React from 'react'
import WishlistIcon from './ui/WishlistIcon'

function ItemCard({item}) {
    return (
      <div className="flex-col h-90 py-2 px-2 rounded-lg overflow-hidden shadow-lg bg-background-3">
  
        <div className="">
          {item.imageUrls && item.imageUrls.length > 0 ? (<img className="w-full h-40" src={item.imageUrls[0]} alt={item.title} />) : (
            <div className="w-full h-full bg-black">No image</div>)}
        </div>
  
        <div className="py-2 text-base h-40">
  
          <div className="font-bold text-sm mb-2 h-20">
            {item.title}
          </div>
            
          <p className='text-neutral-400 line-clamp-2 h-4'>
            {item.description}
          </p>
          
          <div className='flex justify-between bg-[#262E3D] rounded-full w-full py-4 px-4 drop-shadow-lg'>
            <p className=''>${item.price}</p>
            <WishlistIcon/>
          </div>
  
        </div>
  
      </div>
  
        
    )
  }

export default ItemCard