import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";

import { useWishlist } from "../hooks/useWishlist";

import { FaTrash } from "react-icons/fa";

import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";

export default function Wishlist() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { accountData, setAccountData } = useContext(AccountContext);

  const { userId, name, profilePic, timestamp, wishlist, purchasedItems, soldItems } = accountData;

  const { currentUser, addToWishlist, deleteFromWishlist, newWishlist } = useWishlist();
  const [targetItemId, setTargetItemId] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(newWishlist);

  useEffect(() => {
    setAccountData(prev => ({
      ...prev,
      wishlist: newWishlist,
    }));
  }, [newWishlist]);

  if (!isLoggedIn) {
  }
  return (
    <div className="w-full">
      <div className="max-w-[600px]">
        <div
          onClick={() => {
            if (currentUser) {
              alert("logged in!");
            } else {
              setIsModalOpen(true);
              alert("not logged in!");
            }
          }}
        >
          TEST-ELEMENT-FOR-MODAL
        </div>
        <h3 className="mb-7">Wishlist</h3>
        <div>
          {wishlist &&
            wishlist.map((item, index) => (
              <div key={index} className="relative">
                <hr className=" mb-7 border-background-4" />
                <div className=" w-full grid grid-cols-[120px_auto] gap-4 mb-7 ">
                  <div className="w-[120px] h-[120px] rounded-[10px] overflow-hidden">
                    <img className="w-full h-full object-cover" src={item.imageUrl} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="line-clamp-2">{item.title}</div>
                    <div className="text-primary">${item.price.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => {
                      if (currentUser) {
                        addToWishlist(userId, item.itemId, item.title, item.price, item.imageUrl, wishlist);
                      } else {
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    Add
                  </div>
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
