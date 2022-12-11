import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch all items from firestore
export function useFetchOneUser(userId = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

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

  return { userInfo, isLoading };
}
