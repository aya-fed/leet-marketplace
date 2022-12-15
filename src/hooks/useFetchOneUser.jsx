// Coded by Aya Saito

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch data for one user from firestore
export function useFetchOneUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  function fetchOneUser(userId) {
    getUserInfo(userId);
  }

  async function getUserInfo(userId) {
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

  return { fetchOneUser, userInfo, isLoading };
}
