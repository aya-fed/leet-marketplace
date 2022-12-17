// Coded by Aya Saito

import { useEffect, useState, useContext } from "react";
import { doc, getDoc, serverTimestamp, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

import { toast } from "react-toastify";

import AccountContext from "../context/AccountContext";

const messageAdd = "Added to wishlist";
const messageDelete = "Removed from wishlist";
let type = "";

//
export function useWishlist() {
  const { accountData, setAccountData } = useContext(AccountContext);

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
      updateUserData(userId, newList, type, itemId); // update context & db
    }
    //
  }
  function deleteFromWishlist(userId, itemId, currentWishlist) {
    type = "delete";
    console.log(itemId);
    if (userId && itemId && currentWishlist) {
      const newList = currentWishlist.filter(item => item.itemId !== itemId);
      setNewWishlist(newList);
      updateUserData(userId, newList, type, itemId); // update context & db
    }
    //
  }

  async function updateUserData(userId, wishlistData, type, itemId) {
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
    setAccountData(prev => ({
      ...prev,
      wishlist: wishlistData,
    }));
    updateWishlistSubCol(itemId, userId, type);
    setIsLoading(false);
    toast.success(type === "add" ? messageAdd : messageDelete);
  }

  async function updateWishlistSubCol(itemId, userId, type) {
    const wishlistCountRef = doc(db, "listings", itemId, "wishlist", userId);
    if (type === "add") {
      await setDoc(wishlistCountRef, {
        userId: userId,
        addedAt: serverTimestamp(),
      });
    } else if (type === "delete") {
      await deleteDoc(wishlistCountRef);
    }
  }

  return { currentUser, addToWishlist, deleteFromWishlist, newWishlist, setNewWishlist };
}
