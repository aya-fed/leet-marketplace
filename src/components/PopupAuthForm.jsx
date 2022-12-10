import { useState } from "react";

import { toast } from "react-toastify";

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import Button from "./ui/Button";
import InputField from "./form/InputField";
import OAuthButton from "./OAuthButton";

export default function PopupAuthForm({ onSubmit: propOnSubmit, mode: propMode }) {
  const [mode, setMode] = useState(propMode ?? "signIn");
  let buttonLabel = "";
  let title = "";
  let text = "";
  switch (mode) {
    case "signIn":
      title = "Sign In";
      buttonLabel = "Sign in";
      text = (
        <p>
          Don't have an account?
          <span
            className="ml-2 text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signUp");
            }}
          >
            Sign up now
          </span>
        </p>
      );
      break;
    case "signUp":
      title = "Sign Up";
      text = (
        <p>
          Already have an account?
          <span
            className="ml-2 text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signIn");
            }}
          >
            Sign in
          </span>
        </p>
      );
      buttonLabel = "Sign up now";
      break;
    case "forgotPassword":
      title = "Reset Password";
      buttonLabel = "Reset my password";
      text = "############";
      break;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password } = formData;
  function onChange(e) {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const auth = getAuth();

    if (mode === "signUp") {
      // Email & Password sign up ----------------------------------------------------
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, { displayName: name });
        const user = userCredential.user;
        // For saving into database - copy formData but remove password, then add timestamp using firestore's serverTimeStamp
        const formDataCopy = { ...formData, profilePic: "" };
        delete formDataCopy.password;
        delete formDataCopy.confirmPassword;
        formDataCopy.timestamp = serverTimestamp();
        // save to firestore
        await setDoc(doc(db, "users", user.uid), formDataCopy);
        toast.success("Sign up was successful");
        propOnSubmit && propOnSubmit();
        // navigate("/");
      } catch (error) {
        toast.error("Something went wrong with registration");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    } else if (mode === "signIn") {
      // Sign in ---------------------------------------------------------------------
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          propOnSubmit && propOnSubmit();
        }
      } catch (error) {
        toast.error("Please check email and password");
      }
    } else if (mode === "forgotPassword") {
      // Forgot password ---------------------------------------------------------------------
      //
    }
  }

  return (
    <>
      <div className="flex justify-center flex-wrap items-center px-6 py-6 max-w-lg mx-auto">
        <div className="w-full">
          <h3>{title}</h3>
          <div className="mt-6">{text}</div>
          <form onSubmit={onSubmit}>
            {mode === "signUp" && (
              <InputField type="text" id="name" value={name} placeholder="Display name" onChange={onChange} />
            )}

            <InputField type="text" id="email" value={email} placeholder="Email address" onChange={onChange} />

            {mode !== "forgotPassword" && (
              <>
                <div className="relative">
                  <InputField
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                  />
                </div>

                {mode === "signUp" && (
                  <div className="relative">
                    <InputField
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={onChange}
                    />
                  </div>
                )}

                {mode === "signIn" && (
                  <p
                    className="mt-3 mb-6 text-right text-sm text-primary cursor-pointer"
                    onClick={() => setMode("forgotPassword")}
                  >
                    Forgot password?
                  </p>
                )}
              </>
            )}

            <Button className="">{buttonLabel}</Button>
            {mode !== "forgotPassword" && (
              <>
                <div className="my-4 before:border-t before:flex-1 before:border-neutral flex items-center after:border-t after:flex-1 after:border-neutral ">
                  <p className="text-center font-semibold mx-4">or</p>
                </div>

                <OAuthButton
                  label={`${mode === "signUp" ? "Sign up" : "Sign in"} with Google account`}
                  propOnSubmit={propOnSubmit && (() => propOnSubmit())}
                />
              </>
            )}
          </form>
          {mode === "forgotPassword" && (
            <p className="mt-6 text-primary cursor-pointer text-center" onClick={() => setMode("signIn")}>
              Cancel
            </p>
          )}
        </div>
      </div>
    </>
  );
}
