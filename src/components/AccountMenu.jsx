// Coded by Aya Saito

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { HiUser, HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { AiOutlineDollarCircle, AiOutlineTag } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import WishlistIcon from "./ui/WishlistIcon";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const accountMenuItems = [
  {
    name: "Profile & Account",
    icon: <HiUser />,
    path: "/my-account",
  },
  {
    name: "Wishlist",
    icon: <WishlistIcon />,
    path: "/wishlist",
  },
  {
    name: "My Purchases",
    icon: <IoReceiptOutline />,
    path: "/my-purchases",
  },
  {
    name: "My Listings",
    icon: <AiOutlineTag size={18} />,
    path: "/my-listings",
  },
  {
    name: "Sold Items",
    icon: <AiOutlineDollarCircle size={18} />,
    path: "/sold-items",
  },
  {
    name: "Log out",
    icon: <MdLogout size={18} />,
  },
];

export default function AccountMenu() {
  const auth = getAuth();
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const active = accountMenuItems.find(menuItem => menuItem.path === location.pathname);
    if (location.pathname.indexOf(accountMenuItems[0].name) < 0) setIsMenuHidden(true);
    setActiveMenuItem(active);
  }, [location]);

  console.log(location.pathname);
  location;
  return (
    <div className={`z-50 absolute w-full md:relative md:w-[unset]`}>
      {isMenuHidden && (
        <div
          className="-mt-8 mb-2 flex gap-2 h-full items-center cursor-pointer md:hidden"
          onClick={() => setIsMenuHidden(false)}
        >
          <HiOutlineChevronLeft />
          Back
        </div>
      )}
      <div
        className={`${
          isMenuHidden ? "hidden md:block" : "block absolute left-0 px-16 h-[80vh] w-full "
        } bg-background-1 md:bg-background-3 md:py-14 md:px-10 lg:px-14 md:relative md:h-full md:w-[290px]`}
      >
        {accountMenuItems.map((menuItem, index) => (
          <div key={index}>
            <div
              className={`flex justify-between items-center cursor-pointer hover:text-primary ${
                menuItem === activeMenuItem && "md:text-primary"
              }`}
              onClick={() => {
                setIsMenuHidden(true);
                if (menuItem.name === "Log out") {
                  auth.signOut();
                  navigate("/");
                  toast.success("Successfully logged out");
                } else {
                  navigate(menuItem.path);
                }
              }}
            >
              <div className="flex items-center gap-2 py-6">
                <div className="w-5">{menuItem.icon}</div>
                {menuItem.name}
              </div>
              <HiOutlineChevronRight />
            </div>
            {index !== accountMenuItems.length - 1 && <hr className="border-background-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}
