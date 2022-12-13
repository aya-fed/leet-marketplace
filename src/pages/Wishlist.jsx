// Coded by Aya Saito

import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";

import { useWishlist } from "../hooks/useWishlist";

import { FaTrash } from "react-icons/fa";

import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";
import ItemCardRow from "../components/ItemCardRow";

export default function Wishlist() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { accountData, setAccountData } = useContext(AccountContext);

  const { userId, name, profilePic, timestamp, wishlist, purchasedItems, soldItems } = accountData;

  const { currentUser, deleteFromWishlist, newWishlist } = useWishlist();

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(newWishlist);

  useEffect(() => {
    if (newWishlist.length > 0) {
      setAccountData(prev => ({
        ...prev,
        wishlist: newWishlist,
      }));
    }
  }, [newWishlist]);

  if (!isLoggedIn) {
  }
  return (
    <div className="w-full">
      <div className="max-w-[600px] mx-auto">
        <div
          onClick={() => {
            if (currentUser) {
              alert("logged in!");
            } else {
              setIsModalOpen(true);
              alert("not logged in!");
            }
          }}
        ></div>
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
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
