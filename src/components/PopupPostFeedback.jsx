// Coded by Aya Saito

import { PositiveIcon, NeutralIcon, NegativeIcon } from "./ui/IconRatings";
import { PlaceholderProfilePic } from "./ui/PlaceholderProfilePic";
import { useFetchOneUser } from "../hooks/useFetchOneUser";
import Button from "./ui/Button";
import Textarea from "./form/Textarea";
import Chip from "./ui/Chip";
import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";

export default function PopupPostFeedback({ onClose }) {
  // add itemId, buyerId, sellerId props later (or maybe we can just pass "item" object...)
  const itemId = "k8C7V6lKhzmosfN3Zf02"; //// HARD CODED FOR TEST
  const sellerId = "xfMIznl4DISG1YCXqSawo7PrCIK2"; //// HARD CODED FOR TEST
  const buyerId = "e0WTZI0qj7YjRCz3eWtGbMMxuO82"; //// HARD CODED FOR TEST
  ///////////// HARDCODED FOR TEST
  const item = {
    metadata: [
      {
        key: "Display Ports",
        value: "HDMI Ports",
      },
      {
        key: "RAM Capacity",
        value: "8",
      },
      {
        key: "Memory Speed",
        value: "14",
      },
      {
        key: "Base Clock Speed",
        value: "",
      },
      {
        key: "RAM Type",
        value: "GDDR6",
      },
      {
        key: "Boost Clock Speed",
        value: "1770",
      },
    ],
    imageUrls: [
      "https://firebasestorage.googleapis.com/v0/b/yoobee-group-project-test-app.appspot.com/o/images%2FxfMIznl4DISG1YCXqSawo7PrCIK2--b7c4be68-a401-4d95-8792-1acc003597c6-MSI%20GeForce%20RTX%203060%20Ti%20GAM%20s-l300.png?alt=media&token=9e4742c4-ab36-4112-b6b0-f782fc28cd42",
    ],
    description:
      "unused, unopened, undamaged item in its original packaging (where packaging is applicable). \n\nPackaging should be the same as what is available in a retail store, unless the item was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag.",
    postage: "",
    timestamp: {
      seconds: 1669716045,
      nanoseconds: 245000000,
    },
    category: "Graphic Cards",
    title: "MSI GeForce RTX 3060 Ti GAMING X LHR 8GB GDDR6 HDMI Gaming Graphics Video Card",
    updatedTimestamp: {
      seconds: 1669914816,
      nanoseconds: 842000000,
    },
    price: 799,
    pickupSuburb: "",
    pickup: false,
    condition: "Brand new",
    seller: "xfMIznl4DISG1YCXqSawo7PrCIK2",
    buyer: "e0WTZI0qj7YjRCz3eWtGbMMxuO82",
  };

  const [isActive, setIsActive] = useState("");
  const [formData, setFormData] = useState({
    sellerId: item.seller,
    buyerId: item.buyer,
    itemId: itemId,
    itemTitle: item.title,
    itemPrice: item.price,
    comment: "",
    rating: "",
  });

  const { userInfo, isLoading } = useFetchOneUser(buyerId);

  function onChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  function onRatingClick(option) {
    setIsActive(option);
    setFormData(prev => ({
      ...prev,
      rating: option,
    }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const formDataCopy = {
      ...formData,
      createdAt: serverTimestamp(),
    };
    console.log(formDataCopy);
    // Add this later =create docRef and save to db
    alert("will add submit feedback function later");
  }
  return (
    <>
      <div className="flex justify-center flex-wrap items-center max-w-lg mx-auto">
        {/* Item Snip ----------------------------------------------------- */}
        <div className="w-full h-[77px] flex gap-4">
          <div className="w-[77px] rounded-[10px] bg-neutral-light flex justify-center items-center overflow-hidden">
            {item.imageUrls.length > 0 ? (
              <img className="w-full h-full object-cover" src={item.imageUrls[0]} alt="" />
            ) : (
              "No Image"
            )}
          </div>
          <div className="max-w-[70%] flex flex-col justify-between">
            <div className="w-full h-11 line-clamp-2 text-sm font-medium">{item.title}</div>
            <div className="w-full text-sm font-light">
              Sold for <span className="text-primary font-medium text-base">${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {/* Show Seller/Buyer ----------------------------------------------------- */}
        {userInfo && (
          <div className="my-4 w-full flex gap-3 items-center">
            <div className="w-9 h-9">
              {userInfo.profilePic ? (
                <img src={userInfo.profilePic} className="w-full h-full rounded-[28px]" />
              ) : (
                <PlaceholderProfilePic className="w-full h-full rounded-[28px] text-neutral" />
              )}
            </div>
            <div>{userInfo.name}</div>
          </div>
        )}
        {/* Feedback form ----------------------------------------------------- */}
        <div className="w-full mt-6">
          <div className="w-full flex gap-[8px] justify-self-stretch ">
            <Chip
              className={`flex gap-1 py-1 grow text-xs xs:text-sm font-normal cursor-pointer 
              ${isActive === "positive" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onRatingClick("positive")}
            >
              <PositiveIcon size={20} />
              <span>Positive</span>
            </Chip>
            <Chip
              className={`flex gap-1 py-1 grow text-xs xs:text-sm font-normal cursor-pointer
              ${isActive === "neutral" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onRatingClick("neutral")}
            >
              <NeutralIcon size={20} />
              <span>Neutral</span>
            </Chip>
            <Chip
              className={`flex gap-1 py-1 grow text-xs xs:text-sm font-normal cursor-pointer
              ${isActive === "negative" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onRatingClick("negative")}
            >
              <NegativeIcon size={20} />
              <span>Negative</span>
            </Chip>
          </div>
          <form className="mt-6">
            <p>Your feedback (max 500 characters)</p>
            <Textarea
              id="comment"
              value={formData.comment}
              placeholder=""
              className="h-60"
              max="500"
              onChange={onChange}
            />
          </form>
          <Button onClick={onSubmit}>Submit Feedback</Button>
        </div>
      </div>
    </>
  );
}
