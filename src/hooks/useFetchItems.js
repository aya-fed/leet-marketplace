// Coded by Aya Saito

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch all items from firestore
export function useFetchItems() {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const listingsRef = collection(db, "listings");

  function getItems() {
    const q = query(listingsRef, orderBy("timestamp", "desc")); // maybe add limit later on and add "load more" ?
    fetchData(q);
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

  async function fetchData(q) {
    const qSnap = await getDocs(q);
    let listingsArr = [];
    let soldItemsArr = [];
    qSnap.forEach(doc => {
      const data = doc.data();
      // console.log(data);
      // have to add condition to separate active listings and sold items - come back after the class diagram is done
      listingsArr.push({ itemId: doc.id, ...data });
    });
    setListings(listingsArr);
    setIsLoading(false);
  }

  return { getItems, getUsersItems, listings, soldItems, isLoading };
}
