import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { useFetchOneUser } from "../hooks/useFetchOneUser";
import Button from "./ui/Button";
import Textarea from "./form/Textarea";
import Chip from "./ui/Chip";
import { useState } from "react";

export default function PopupPostFeedback({ onClose }) {
  const [isActive, setIsActive] = useState("");
  const [formData, setFormData] = useState({});
  // add itemId, buyerId, sellerId props later (or maybe we can just pass "item" object...)
  const itemId = "k8C7V6lKhzmosfN3Zf02"; //// HARD CODED FOR TEST
  const sellerId = "xfMIznl4DISG1YCXqSawo7PrCIK2"; //// HARD CODED FOR TEST
  const buyerId = "e0WTZI0qj7YjRCz3eWtGbMMxuO82"; //// HARD CODED FOR TEST

  const { userInfo, isLoading } = useFetchOneUser(buyerId);

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
    seller: "xfMIznl4DISG1YCXqSawo7PrCIK2",
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
    price: "799",
    pickupSuburb: "",
    pickup: false,
    condition: "Brand new",
  };

  function onClick(option) {
    setIsActive(option);
  }
  function onSubmit(e) {
    e.preventDefault();
    /// Add this later
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
              Sold for <span className="text-primary font-medium text-base">${item.price}</span>
            </div>
          </div>
        </div>
        {/* Show Seller/Buyer ----------------------------------------------------- */}
        {userInfo && (
          <div className="my-4 w-full flex gap-3 items-center">
            <div className="w-9 h-9">
              {userInfo.profilePic ? (
                <img src={userInfo.profilePic} className="w-full h-full" />
              ) : (
                <IoPersonCircle className="w-full h-full text-neutral" />
              )}
            </div>
            <div>{userInfo.name}</div>
          </div>
        )}
        {/* Feedback form ----------------------------------------------------- */}
        <div className="w-full">
          <div className="mb-6 grid grid-cols-3 gap-3">
            <Chip
              className={`flex gap-1 py-1 text-sm font-normal cursor-pointer
              ${isActive === "positive" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onClick("positive")}
            >
              <FaRegSmile size={20} />
              <span>Positive</span>
            </Chip>
            <Chip
              className={`flex gap-1 py-1 text-sm font-normal cursor-pointer
              ${isActive === "neutral" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onClick("neutral")}
            >
              <FaRegMeh size={20} />
              <span>Neutral</span>
            </Chip>
            <Chip
              className={`flex gap-1 py-1 text-sm font-normal cursor-pointer
              ${isActive === "negative" && "bg-primary text-background-1 font-medium"}`}
              onClick={() => onClick("negative")}
            >
              <FaRegFrown size={20} />
              <span>Negative</span>
            </Chip>
          </div>
          <form>
            <p>Your feedback (max 500 characters)</p>
            <Textarea className="h-60" max="500" />
          </form>
          <Button onClick={onSubmit}>Submit Feedback</Button>
        </div>
      </div>
    </>
  );
}
