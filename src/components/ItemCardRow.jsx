import React, { useState } from "react";
import Button from "./ui/Button";

export default function ItemCardRow({ item, userId, buyerId, sellerId, isClosed, review }) {
  const [type, setType] = useState();
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
  return (
    <div className="relative">
      <hr className=" mb-7 border-background-4" />
      <div className=" w-full grid grid-cols-[120px_auto] gap-4 mb-7 ">
        <div className="w-[120px] h-[120px] rounded-[10px] overflow-hidden">
          <img className="w-full h-full object-cover" src={item.imageUrl} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="line-clamp-2">{item.title}</div>
            <div className="text-primary">
              {type === "buyer" ? "Bought for " : type === "seller" ? "Sold for" : ""}${item.price.toFixed(2)}
            </div>
          </div>
          {type && !isClosed && (
            <div>
              <Button className="text-secondary border-secondary w-[125px]">Post feedback</Button>
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
    </div>
  );
}
