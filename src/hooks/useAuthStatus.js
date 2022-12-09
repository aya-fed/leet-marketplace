import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        //if user exists
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
}
