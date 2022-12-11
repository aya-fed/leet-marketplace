import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";
import Button from "./ui/Button";

export default function OAuthButton({ label, propOnSubmit }) {
  async function onGoogleClick(e) {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check for the user in the db
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // if the user doesn't exist in db, add as a new user
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          profilePic: "",
          timestamp: serverTimestamp(),
        });
        toast.success("Signed in with Google account");
      }
      propOnSubmit && propOnSubmit();
    } catch (error) {
      // const errorMessage = "Could not authorise with Google";
      // // The email of the user's account used
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error("Could not authorise with Google");
      console.log(error);
      // console.log(email, credential);
    }
  }
  return (
    <Button type="button" onClick={onGoogleClick} className="bg-background-4 border-none">
      <FcGoogle size={28} />
      {label ? label : "Continue with Google"}
    </Button>
  );
}
