// Coded by Aya Saito

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { PlaceholderProfilePic } from "../components/ui/PlaceholderProfilePic";

export default function Comment({ sellerId, comment }) {
  const auth = getAuth();
  const { users, isLoading } = useFetchUsers();
  const [userData, setUserData] = useState(null);
  const { text, uid, createdAt } = comment;

  //get user data to show name & profile pic
  useEffect(() => {
    if (users) {
      setUserData(users.filter(user => user.uid === comment.uid)[0]);
    }
  }, [users]);

  // add <br /> tags to the text
  const displayText = text.split("\n").map((line, index) => {
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });

  const commentContainerClass = uid === sellerId ? "flex-row-reverse" : "";
  const commentClass = "bg-neutral-light text-background-2";
  const commentBubbleElem =
    uid === sellerId ? (
      <span
        className={twMerge(`absolute w-0 h-0 -mt-[7px] border-[7px] border-transparent -right-[14px] top-6`)}
        style={{ borderLeft: "7px solid #dcdef3" }}
      ></span>
    ) : (
      <span
        className={twMerge(`absolute w-0 h-0 -mt-[7px] border-[7px] border-transparent -left-[14px] top-6`)}
        style={{ borderRight: "7px solid #dcdef3" }}
      ></span>
    );

  return (
    <div className={`relative flex gap-3 mb-6 ${commentContainerClass}`}>
      {userData && userData.profilePic ? (
        <img className="mt-4 w-10 h-10 rounded-3xl shrink-0" src={userData.profilePic} alt="Profile image" />
      ) : (
        <PlaceholderProfilePic className="mt-4 w-10 h-10 scale-125 text-neutral-dark" />
      )}
      <div
        className={`
        relative my-3
        max-w-[80%] sm:max-w-md py-3 px-5 
        rounded-xl 
        ${commentClass}
        `}
      >
        {displayText}
        {commentBubbleElem}
        <div className="absolute -ml-4 text-neutral text-xs w-full -bottom-6 whitespace-nowrap">
          {userData && (
            <Link to={`/user-profile/${userData.uid}`} className="text-primary">
              {userData.name}
            </Link>
          )}{" "}
          ({createdAt.toDate().toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", hour12: false })}
          {", "}
          {createdAt.toDate().toLocaleDateString("en-NZ")})
        </div>
      </div>
    </div>
  );
}
