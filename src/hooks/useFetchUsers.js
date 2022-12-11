import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

// function to fetch all users from firestore
export function useFetchUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("timestamp", "desc"));
    const qSnap = await getDocs(q);
    let usersArr = [];
    qSnap.forEach(doc => {
      const data = doc.data();
      usersArr.push({ uid: doc.id, ...data });
    });
    setUsers(usersArr);
    setIsLoading(false);
  }

  return { users, isLoading };
}
