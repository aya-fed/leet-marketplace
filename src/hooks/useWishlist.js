import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

//
export function useWishlist() {
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
    console.log(itemId);
    if (userId && itemId && currentWishlist) {
      const currentCopy = currentWishlist.slice();
      currentCopy.unshift({
        imageUrl: imageUrl,
        itemId: itemId,
        price: price,
        title: title,
        addedAt: serverTimestamp(),
      });
      setNewWishlist(currentCopy);
    }
    //
  }
  function deleteFromWishlist(userId, itemId, currentWishlist) {
    console.log(itemId);
    if (userId && itemId && currentWishlist) {
      setNewWishlist(currentWishlist.filter(item => item.itemId !== itemId));
      // update db
    }
    //
  }

  async function getUser(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserInfo(data);
      console.log(data);
      ///// loading stop
      setIsLoading(false);
    }
  }

  return { currentUser, addToWishlist, deleteFromWishlist, newWishlist, setNewWishlist };
}
