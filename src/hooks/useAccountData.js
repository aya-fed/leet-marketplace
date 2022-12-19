// Coded by Aya Saito

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function useAccountData() {
  const [userInfo, setUserInfo] = useState(null);
  const [userPrivateInfo, setUserPrivateInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (auth.currentUser) {
        //if user exists
        getUserInfo(auth.currentUser.uid);
        getUserPrivateInfo(auth.currentUser.uid);
      } else {
        setUserInfo({});
        setUserPrivateInfo({});
      }
      setIsLoading(false);
    });
  }, []);

  async function getUserInfo(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserInfo(data);
    }
  }

  async function getUserPrivateInfo(userId) {
    // sub collections
    const purchasedRef = collection(db, "users", userId, "purchased");
    const soldRef = collection(db, "users", userId, "sold");
    const accountRef = collection(db, "users", userId, "account");

    fetchData(purchasedRef, "purchased");
    fetchData(soldRef, "sold");

    async function fetchData(collectionRef, subCollectionName) {
      const collectionSnap = await getDocs(collectionRef).then(items => {
        setUserPrivateInfo(prev => ({
          ...prev,
          [subCollectionName]: items.docs.map(doc => doc.data()),
        }));
      });
    }
  }

  return { userInfo, userPrivateInfo, isLoading };
}
