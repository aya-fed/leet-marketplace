// Coded by Aya Saito

import { useState, useEffect, useContext } from "react";
import { BiEditAlt } from "react-icons/bi";

import AccountContext from "../context/AccountContext";
import { useFetchItems } from "../hooks/useFetchItems";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import ItemCardRow from "../components/ItemCardRow";
import AccountMenu from "../components/AccountMenu";
import { useNavigate } from "react-router";

export default function MyListings() {
  const { accountData, setAccountData } = useContext(AccountContext);
  const { userId, name, profilePic, timestamp, wishlist, purchasedItems, soldItems } = accountData;

  const { getUsersItems, listings, isLoading } = useFetchItems();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) getUsersItems(userId);
  }, [userId]);

  if (isLoading) {
    return <LoadingSpinner color="text-primary" />;
  }
  return (
    <div className="w-full h-full md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-20 mx-auto md:px-10">
      <AccountMenu />
      <div className="w-[85%] mx-auto md:w-full">
        <h3 className="mb-9">My Listings</h3>
        <div>
          {listings &&
            listings.map(item => (
              <div key={item.itemId} className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/item-detail/${item.itemId}`);
                  }}
                >
                  <ItemCardRow item={item} />
                </div>
                <div
                  className="flex items-end gap-2 absolute bottom-0 right-0 text-primary cursor-pointer"
                  onClick={() => {
                    navigate(`/edit-listing/${item.itemId}`);
                  }}
                >
                  <div className="text-sm">Edit</div>
                  <BiEditAlt size={24} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
