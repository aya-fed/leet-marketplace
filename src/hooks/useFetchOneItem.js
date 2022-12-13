// Coded by Aya Saito

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch data of one item from firestore
export function useFetchOneItem(itemId = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    if (itemId) {
      getItem(itemId);
    }
  }, [itemId]);

  async function getItem(itemId) {
    const docRef = doc(db, "listings", itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // turn metadata into a key value array
      const metaArray = Object.entries(data.metadata).map(([key, value]) => ({ key, value }));
      // const descText = data.description.split("\n").map((line, index) => {
      //   return (
      //     <span key={index}>
      //       {line}
      //       <br />
      //     </span>
      //   );
      // });
      setItem({
        ...data,
        // description: descText,
        metadata: metaArray,
      });
      console.log(data);
      fetchSellerInfo(data.seller);
    }
  }

  async function fetchSellerInfo(sellerId) {
    const docRef = doc(db, "users", sellerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setSellerInfo(data);
      ///// loading stop
      setIsLoading(false);
    }
  }
  return { item, sellerInfo, isLoading };
}
