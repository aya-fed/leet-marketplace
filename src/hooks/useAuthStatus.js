// Coded by Aya Saito

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      console.log("useAuthStatus hook");
      if (user) {
        //if user exists
        setLoggedIn(true);
        setCurrentUserId(auth.currentUser.uid);
      } else {
        setLoggedIn(false);
        setCurrentUserId();
      }
      setIsLoading(false);
    });
  }, []);

  console.log(currentUserId);
  return { loggedIn, currentUserId, isLoading };
}
