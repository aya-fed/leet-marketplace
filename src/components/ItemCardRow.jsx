// Coded by Aya Saito

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import Modal from "./Modal";
import PopupPostFeedback from "./PopupPostFeedback";

import Button from "./ui/Button";

export default function ItemCardRow({ item, buyerId, sellerId, isClosed, review }) {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [type, setType] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (buyerId) {
      if (userId === buyerId) {
        setType("buyer");
      }
    }
    if (sellerId) {
      if (userId === sellerId) {
        setType("seller");
      }
    }
  }, [userId]);

  return (
    <div className="relative">
      <hr className=" mb-7 border-background-4" />
      <div className=" w-full grid grid-cols-[120px_auto] gap-4 mb-7 ">
        <div
          className="w-[120px] h-[120px] rounded-[10px] overflow-hidden bg-background-2 cursor-pointer"
          onClick={() => {
            navigate(`/item-detail/${item.itemId}`);
          }}
        >
          {item.imageUrl || (item.imageUrls && item.imageUrls.length > 0) ? (
            <img className="w-full h-full object-cover" src={item.imageUrl ?? item.imageUrls[0]} />
          ) : (
            <div className="w-full h-full text-neutral-dark p-2">No image</div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => {
              navigate(`/item-detail/${item.itemId}`);
            }}
          >
            <div className="text-sm line-clamp-2">{item.title}</div>
            <div className="text-sm">
              {type === "buyer" ? "Bought for " : type === "seller" ? "Sold for" : ""}
              <span className="text-primary">${item.price.toFixed(2)}</span>
            </div>
          </div>
          {type && !isClosed && (
            <div>
              <Button className="text-secondary border-secondary w-[125px]" onClick={() => setIsModalOpen(true)}>
                Post feedback
              </Button>
            </div>
          )}
          {
            isClosed && review && (
              <div>
                <></>
              </div>
            )
            //
          }
        </div>
      </div>

      {/* Post Feedback popup */}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PopupPostFeedback
            onSubmit={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
