// Ethan Cullen

import React, { useState, useEffect, useContext } from 'react'
import WishlistIcon from './ui/WishlistIcon'
import { useWishlist } from "../hooks/useWishlist";
import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";
import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";
import { Link } from "react-router-dom";

function ItemCardHorizontal({item}) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { accountData, setAccountData } = useContext(AccountContext);

  const { userId, wishlist } = accountData;
  const { currentUser, addToWishlist, deleteFromWishlist, newWishlist } = useWishlist();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (isLoggedIn && wishlist) {
      wishlist.forEach(wlItem => {
        if (wlItem.itemId === item.itemId) {
          setIsInWishlist(true);
        }
      });
    }
  }, [wishlist, item]);

  
  useEffect(() => {
    if (newWishlist.length > 0) {
      setAccountData(prev => ({
            ...prev,
            wishlist: newWishlist,
        }));
    }
  }, [newWishlist]);
  return (

    <div className="  mx-auto  bg-background-3 text-neutral-light    hover:bg-primary  hover:bg-opacity-20 hover:w-[97%]  ">
      
      <Link to={`/item-detail/${item.itemId}`}>
        <div className="bg-background-1">
          {item.imageUrls && item.imageUrls.length > 0 ? (<img className="w-[150px] flex-auto h-40" src={item.imageUrls[0]} alt={item.title} />) : (
            <div className="w-[150px] h-40 bg-background-2 p-2 flex-auto ">No image</div>)}
        </div>

        <div className="-mt-32 ml-28 pl-16 text-base h-30 flex-auto">
  
          <div className="font-bold text-sm h-20 mb-2  not-sr-only  ">
            {item.title}   
          </div>
          <div > 
            {item.category} 
          </div>
          
          <div > 
            {item.condition} 
          </div>
          
          <div > 
            {item.views} 
          </div>
          
         

          <p className="text-neutral-400 mb-2 h-12  sr-only  ">
            {item.description}
          </p>
  
        </div>
      </Link>


          <div
        className="   px-40 translate-y-4   text-xl   "
        onClick={e => {
          e.stopPropagation();
          if (currentUser) {
            if (!isInWishlist) {
              const wishlistCopy = !wishlist ? [] : wishlist;
              addToWishlist(userId, item.itemId, item.title, item.price, item.imageUrls[0], wishlistCopy);
            } else {
              deleteFromWishlist(userId, item.itemId, wishlist);
              setIsInWishlist(false);
            }
          } else {
            setIsModalOpen(true);
          }
        }}
      >
              <WishlistIcon onClick={isInWishlist} />
             </div>
     
          <div className='  px-12 text-right text-xl lg:mr-40 mr-2 '>
            <p className='text-primary'>${item.price}</p>
            
          </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)}>
          <PopupAuthForm
            onSubmit={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default ItemCardHorizontal
