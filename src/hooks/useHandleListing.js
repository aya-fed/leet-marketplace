// Coded by Aya Saito

import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function useHandleListing() {
  const [currentUser, setCurrentUser] = useState();

  const auth = getAuth();
  const navigate = useNavigate();

  // check auth status
  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.uid);
    }
  }, [auth.currentUser]);

  // ----------------------------------------------------------------------------
  // Create listing
  // ----------------------------------------------------------------------------
  function createListing(listingId) {
    //
  }
  // ----------------------------------------------------------------------------
  // Update listing
  // ----------------------------------------------------------------------------
  function updateListing(listingId) {
    //
  }

  // save to db

  // ----------------------------------------------------------------------------
  // Delete listing
  // ----------------------------------------------------------------------------
  async function deleteListing(listingId) {
    const docRef = doc(db, "listings", listingId);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("The listing has been deleted");
        navigate("/");
      })
      .catch(error => {
        toast.error("The listing was not deleted due to an error");
        console.log(error);
      });
    // delete images from storage
  }

  // async function updateUserData(userId, wishlistData, type) {
  //   setIsLoading(true);
  //   const docRef = doc(db, "users", userId);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const data = docSnap.data();
  //     await updateDoc(docRef, {
  //       ...data,
  //       wishlist: wishlistData,
  //     });
  //   }
  //   setIsLoading(false);
  //   toast.success(type === "add" ? messageAdd : messageDelete);
  // }

  return { createListing, updateListing, deleteListing };
}
