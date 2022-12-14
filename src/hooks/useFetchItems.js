// Coded by Aya Saito

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch all items from firestore
export function useFetchItems() {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);
  async function getItems() {
    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, orderBy("timestamp", "desc")); // maybe add limit later on and add "load more" ?
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

  return { listings, soldItems, isLoading };
}
