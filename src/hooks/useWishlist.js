// Coded by Aya Saito

import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

import { toast } from "react-toastify";

const messageAdd = "Added to wishlist";
const messageDelete = "Removed from wishlist";
let type = "";

//
export function useWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [newWishlist, setNewWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const auth = getAuth();

  // check auth status
  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.uid);
    }
  }, [auth.currentUser]);

  function addToWishlist(userId, itemId, title, price, imageUrl, currentWishlist) {
    type = "add";
    console.log(itemId);
    if (userId && itemId && currentWishlist) {
      const newList = currentWishlist.slice();
      newList.unshift({
        imageUrl: imageUrl,
        itemId: itemId,
        price: price,
        title: title,
        addedAt: Date.now(), // serverTimestamp() is not currently supported inside arrays
      });
      setNewWishlist(newList);
      updateUserData(userId, newList, type); // update db
    }
    //
  }
  function deleteFromWishlist(userId, itemId, currentWishlist) {
    type = "delete";
    console.log(itemId);
    if (userId && itemId && currentWishlist) {
      const newList = currentWishlist.filter(item => item.itemId !== itemId);
      setNewWishlist(newList);
      updateUserData(userId, newList, type); // update db
    }
    //
  }

  async function updateUserData(userId, wishlistData, type) {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      await updateDoc(docRef, {
        ...data,
        wishlist: wishlistData,
      });
    }
    setIsLoading(false);
    toast.success(type === "add" ? messageAdd : messageDelete);
  }

  return { currentUser, addToWishlist, deleteFromWishlist, newWishlist, setNewWishlist };
}
