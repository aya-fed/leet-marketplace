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
  const [showPassword, setShowPassword] = useState(false);
  let buttonLabel = "";
  let title = "";
  let textTop = "";
  let textBottom = "";
  let linkTextToResetPW = "";

  switch (mode) {
    //////////// Sign In //////////////////////////////////////////////////////////////////////////////////////////////
    case "signIn":
      title = "Sign In";
      buttonLabel = "Sign in";
      textTop = (
        <p>
          New to LEET?
          <span
            className="ml-2 text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signUp");
            }}
          >
            Register now
          </span>
        </p>
      );
      linkTextToResetPW = "Forgotten password?";
      break;
    //////////// Sign Up //////////////////////////////////////////////////////////////////////////////////////////////
    case "signUp":
      title = "Create your account";
      textTop = (
        <p>
          Already have an account?
          <span
            className="ml-2 text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signIn");
            }}
          >
            Log in
          </span>
        </p>
      );
      buttonLabel = "Sign up now";
      break;
    //////////// Reset Password //////////////////////////////////////////////////////////////////////////////////////////////
    case "forgotPassword":
      title = "Reset Password";
      buttonLabel = "Submit";
      textTop = "Enter your email address and we'll send you password reset instructions.";
      textBottom = (
        <div className="flex mt-8 gap-5">
          <span
            className="text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signIn");
            }}
          >
            Log in
          </span>

          <span
            className="text-primary hover:text-primary-dark transition duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setMode("signUp");
            }}
          >
            Register
          </span>
        </div>
      );
      break;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
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
      <div className="flex justify-center flex-wrap items-center max-w-lg mx-auto">
        <div className="w-full">
          <h3>{title}</h3>
          <div className="mt-6">{textTop}</div>
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
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
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
                      showPassword={showPassword}
                      setShowPassword={() => setShowPassword(!showPassword)}
                    />
                  </div>
                )}

                {mode === "signIn" && (
                  <p className="text-sm text-primary cursor-pointer" onClick={() => setMode("forgotPassword")}>
                    {linkTextToResetPW}
                  </p>
                )}
              </>
            )}

            <Button className="mt-14">{buttonLabel}</Button>
            {mode !== "forgotPassword" && (
              <>
                <div className="my-8 before:border-t before:flex-1 before:border-neutral flex items-center after:border-t after:flex-1 after:border-neutral ">
                  <p className="text-center text-neutral mx-4">or</p>
                </div>

                <OAuthButton
                  label={`${mode === "signUp" ? "Sign up" : "Sign in"} with Google`}
                  propOnSubmit={propOnSubmit && (() => propOnSubmit())}
                />
              </>
            )}
          </form>
          {mode === "forgotPassword" && textBottom}
        </div>
      </div>
    </>
  );
}
