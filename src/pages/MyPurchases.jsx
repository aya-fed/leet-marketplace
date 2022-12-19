// Coded by Aya Saito

import { useState, useEffect, useContext } from "react";
import { BiEditAlt } from "react-icons/bi";

import AccountContext from "../context/AccountContext";
import { useFetchItems } from "../hooks/useFetchItems";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import ItemCardRow from "../components/ItemCardRow";
import AccountMenu from "../components/AccountMenu";
import { useNavigate } from "react-router";

export default function MyPurchases() {
  const { accountData, setAccountData } = useContext(AccountContext);
  const { userId, name, profilePic, timestamp, wishlist, purchased, sold } = accountData;
  const navigate = useNavigate();
  const [items, setItems] = useState();

  useEffect(() => {
    if (purchased) {
      // console.log(purchased);
      setItems(purchased);
    }
  }, [purchased]);

  // if (isLoading) {
  //   return <LoadingSpinner color="text-primary" />;
  // }
  return (
    <div className="w-full h-full md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-20 mx-auto md:px-10">
      <AccountMenu />
      <div className="w-[85%] mx-auto md:w-full">
        <h3 className="mb-9">My Purchases</h3>
        <div>
          {items &&
            items.map(item => (
              <div key={item.itemId} className="relative">
                <div className="relative">
                  <ItemCardRow item={item} buyerId={item.buyer} sellerId={item.seller} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
