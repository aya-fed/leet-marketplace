// Coded by Aya Saito

import { useState, useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, addDoc, serverTimestamp, doc, getDocs, updateDoc } from "firebase/firestore";
import AuthContext from "../context/AuthContext";

import Comment from "./Comment";
import Textarea from "./form/Textarea";
import Button from "./ui/Button";

export default function CommentList({ itemId, sellerId }) {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const auth = getAuth();
  const ref = useRef();
  const [comments, setComments] = useState([]);

  const commentsRef = collection(db, "listings", itemId, "comments");
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  // get comments
  async function fetchComments() {
    const querySnapshot = await getDocs(query(commentsRef, orderBy("createdAt", "asc")))
      .then(comments => {
        setComments(comments.docs.map(doc => doc.data()));
      })
      .catch(error => {
        // error handling
        console.log(error);
        return <p>Could not load messages</p>;
      });
  }
  // display comments

  // send a comment
  async function sendComment(e) {
    e.preventDefault();
    // comment data - to add to sub collection "comments"
    const subCollectionData = {
      text: formValue,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };
    await addDoc(commentsRef, subCollectionData)
      .then(() => {
        fetchComments();
      })
      .catch(error => {
        // error handling
        console.log(error);
        toast.error("Could not submit the comment. Please try later");
      });
    setFormValue("");
  }

  function onChange(e) {
    setFormValue(e.target.value);
  }

  return (
    <>
      <h4 className="mb-9">Questions & Answers</h4>
      <div className="mb-10">
        {comments.length > 0 ? (
          comments.map((comment, index) => {
            return <Comment key={index} comment={comment} sellerId={sellerId} />;
          })
        ) : (
          <p className="text-neutral">No questions have been asked!</p>
        )}
        <div></div>
      </div>
      <form onSubmit={sendComment} className="my-6 relative">
        <Textarea
          type="text"
          value={formValue}
          className="w-full h-20"
          placeholder={userId === sellerId ? "Enter a response..." : "Ask a question..."}
          onChange={onChange}
        />
        <div className="w-full flex justify-end">
          <Button className="w-44 border-neutral text-white">
            {userId === sellerId ? "Submit response" : "Submit question"}
          </Button>
        </div>
      </form>
    </>
  );
}
