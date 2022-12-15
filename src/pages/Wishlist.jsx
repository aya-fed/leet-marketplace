// Coded by Aya Saito

import { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import AccountContext from "../context/AccountContext";

import { useWishlist } from "../hooks/useWishlist";

import ItemCardRow from "../components/ItemCardRow";
import AccountMenu from "../components/AccountMenu";

export default function Wishlist() {
  const { accountData, setAccountData } = useContext(AccountContext);

  const { userId, name, profilePic, timestamp, wishlist, purchasedItems, soldItems } = accountData;
  const { currentUser, deleteFromWishlist, newWishlist } = useWishlist();

  console.log(newWishlist);

  useEffect(() => {
    if (newWishlist.length > 0) {
      setAccountData(prev => ({
        ...prev,
        wishlist: newWishlist,
      }));
    }
  }, [newWishlist]);

  return (
    <div className="w-full h-full md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-20 mx-auto md:px-10">
      <AccountMenu />
      <div className="w-[90%] mx-auto md:">
        <h3 className="mb-9">Wishlist</h3>
        <div>
          {wishlist &&
            wishlist.map((item, index) => (
              <div key={index} className="relative">
                <ItemCardRow item={item} />
                <FaTrash
                  size={24}
                  className="absolute bottom-0 right-0 text-primary"
                  onClick={() => {
                    if (currentUser) {
                      deleteFromWishlist(userId, item.itemId, wishlist);
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
