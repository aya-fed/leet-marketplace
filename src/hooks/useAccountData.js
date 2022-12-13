import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function useAccountData() {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (auth.currentUser) {
        //if user exists
        getUserInfo(auth.currentUser.uid);
      } else {
        setUserInfo({});
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

  return { userInfo, isLoading };
}
