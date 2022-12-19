// Coded by Michele Carter

import React, { useState, useEffect, useContext } from 'react'
import WishlistIcon from './ui/WishlistIcon'
import { useWishlist } from "../hooks/useWishlist";
import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";
import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";
import { Link } from "react-router-dom";

function ItemCard({item}) {
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

  // console.log(wishlist);
  useEffect(() => {
    if (newWishlist.length > 0) {
      setAccountData(prev => ({
            ...prev,
            wishlist: newWishlist,
        }));
    }
  }, [newWishlist]);
  return (

    <div className="relative flex-col mx-auto h-90 w-[238px] xs:w-[180px] sm:w[] md:w-[185px] lg:w-[195px] xl:w-[160px] rounded-lg overflow-hidden bg-background-3 text-neutral-light">
      <Link to={`/item-detail/${item.itemId}`}>
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
            {/* <WishlistIcon /> */}
          </div>
        </div>
      </Link>
      <div
        className="absolute right-6 bottom-[22px]"
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
        <WishlistIcon state={isInWishlist} />
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

export default ItemCard
