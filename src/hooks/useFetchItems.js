// Coded by Aya Saito

import { doc, collection, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch all items from firestore
export function useFetchItems() {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const listingsRef = collection(db, "listings");
  const wishlistCountRef = doc(db, "wishlistCount", "wishlistCount");

  async function getItems() {
    const q = query(listingsRef, orderBy("timestamp", "desc")); // maybe add limit later on and add "load more" ?
    const wlData = await getDoc(wishlistCountRef).then(doc=>doc.data())
    fetchData(q, wlData);
  }

  function getUsersItems(userId) {
    if (userId) {
      const q = query(listingsRef, where("seller", "==", userId), orderBy("timestamp", "desc")); // maybe add limit later on and add "load more" ?
      fetchData(q);
    } else {
      console.log("no userId specified");
      setIsLoading(false);
    }
  }

  async function fetchData(q, wlData) {
    const qSnap = await getDocs(q);
    let listingsArr = [];
    let soldItemsArr = [];
    qSnap.forEach(doc => {
      const data = doc.data();
      // console.log(data);
      // have to add condition to separate active listings and sold items - come back after the class diagram is done
      if(wlData){
        const num = wlData[doc.id] ?? 0;
        listingsArr.push({ itemId: doc.id, wishlistCount: num, ...data });
      } else {
        listingsArr.push({ itemId: doc.id, ...data });
      }
    });
    setListings(listingsArr);
    setIsLoading(false);
  }

  return { getItems, getUsersItems, listings, soldItems, isLoading };
}
