import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  arrayUnion,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const SingleUser = ({ singleUser, handleAddFriend }) => {
  const [addingFriend, setAddingFriend] = useState(false);
  const [isSent, setIsSent] = useState(null);
  const [isChanges, setIsChanges] = useState(false);
  const [ifReceived, setIfReceived] = useState(null);
  const { user, loading, users, updateData } = useAuth();

  useEffect(() => {
    const checkFriendRequest = async () => {
      try {
        const singleUserDocRef = doc(db, "authUsers", singleUser.uid);

        const userDocRef = doc(db, "authUsers", user.uid);
        const sentFriendRequestQuery = query(
          collection(db, "friendRequests"),
          where("senderID", "==", userDocRef),
          where("receiverID", "==", singleUserDocRef)
        );
        const sentFriendRequestSnapshot = await getDocs(sentFriendRequestQuery);
        if (sentFriendRequestSnapshot.size > 0) {
          setIsSent(sentFriendRequestSnapshot.docs[0].ref);
        } else {
          setIsSent(null);

          const receivedFriendRequestQuery = query(
            collection(db, "friendRequests"),
            where("senderID", "==", singleUserDocRef),
            where("receiverID", "==", userDocRef)
          );
          const receivedFriendRequestSnapshot = await getDocs(
            receivedFriendRequestQuery
          );
          if (receivedFriendRequestSnapshot.size > 0) {
            setIfReceived(receivedFriendRequestSnapshot.docs[0].ref);
          } else {
            setIfReceived(null);
          }
        }
      } catch (error) {
        console.error("Error checking friend request:", error);
      }
    };

    checkFriendRequest();
  }, [singleUser, user.uid, isChanges]);

  const handleClickAddFriend = async (friendId) => {
    setAddingFriend(true);
    await handleAddFriend(friendId);
    setIsChanges(!isChanges);
    setAddingFriend(false);
  };

  const handleAcceptRequest = async () => {
    try {
      const friendDocRef = doc(db, "authUsers", singleUser.uid);
      const userDocRef = doc(db, "authUsers", user.uid);
      // Update the authenticated user's document to add the friend's reference to the friends array
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendDocRef),
      });

      // Update the friend's document to add the user's reference to their friends array
      await updateDoc(friendDocRef, {
        friends: arrayUnion(userDocRef),
      });
      await deleteDoc(ifReceived);
      updateData();
    } catch (error) {
      console.error("Error accepting friend request:", error.message);
    }
  };

  const handleCancelRequest = async (ref) => {
    try {
      await deleteDoc(ref);
      console.log("Friend request canceled!");
      setIsSent(null);
      setIsChanges(!isChanges);
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>{singleUser.displayName}</div>
      {isSent ? (
        <div className="flex gap-2">
          <button
            disabled
            className="bg-green-500 mt-2 text-base rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white mr-2"
          >
            Pending
          </button>
          <button
            onClick={() => handleCancelRequest(isSent)}
            className="bg-red-500 mt-2 text-base rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white"
          >
            Cancel
          </button>
        </div>
      ) : ifReceived ? (
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptRequest()}
            className="bg-green-500 mt-2 text-base rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white mr-2"
          >
            Accept
          </button>
          <button
            onClick={() => handleCancelRequest(ifReceived)}
            className="bg-red-500 mt-2 text-base rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleClickAddFriend(singleUser.uid)}
          disabled={addingFriend || isSent}
          className="bg-buttonColor mt-2 text-base rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white"
        >
          {addingFriend ? "Adding" : "Add Friend"}
        </button>
      )}
    </div>
  );
};

export default SingleUser;
