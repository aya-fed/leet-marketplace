// Coded by Aya Saito

import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

import AuthContext from "../context/AuthContext";

import { HiUser, HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { AiOutlineDollarCircle, AiOutlineTag } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import WishlistIcon from "./ui/WishlistIcon";
import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";

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

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  // if not logged in then show sign in popup
  useEffect(() => {
    if (!auth.currentUser) {
      // setIsModalOpen(true);
    }
  }, [auth]);

  // set active item to highlight it in the menu
  useEffect(() => {
    const active = accountMenuItems.find(menuItem => menuItem.path === location.pathname);
    // if (location.pathname.indexOf(accountMenuItems[0].name) < 0) setIsMenuHidden(true);
    setActiveMenuItem(active);
  }, [location]);

  useEffect(() => {
    if (!isMenuHidden && window.matchMedia("(max-width: 767px)").matches) {
      document.body.style.overflow = "hidden"; // Stop background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // clean up
    };
  }, [isMenuHidden]);

  location;
  return (
    <div className={`z-[10] absolute w-full md:relative md:w-[unset]`}>
      {isMenuHidden && (
        <div
          className="-mt-12 mb-2 ml-[4%] flex gap-2 h-full items-center text-neutral cursor-pointer md:hidden"
          onClick={() => setIsMenuHidden(false)}
        >
          <HiOutlineChevronLeft />
          My Account Menu
        </div>
      )}
      <div
        className={`w-full fixed left-0 top-[100px] h-[calc(100vh-208px)] duration-500 ease-out bg-background-2 ${
          isMenuHidden ? "-translate-x-[100vw] md:translate-x-0" : " translate-x-0 "
        }  md:top-[unset] md:block md:bg-background-3 md:rounded-[10px] md:relative md:h-full md:w-[290px]`}
      >
        <div
          className="
            absolute w-full top-1/2 -translate-y-1/2 left-0 px-16 
            md:py-14 md:px-12 lg:px-13 md:relative md:top-[unset] md:translate-y-0 left=[unset]
            "
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
                    setIsLoggedIn(false); // update auth context
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
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            navigate(-1);
          }}
        >
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
