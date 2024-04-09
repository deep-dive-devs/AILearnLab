"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/components/context/AuthContext";
import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  updateDoc,

} from "firebase/firestore";
import { db } from "@/app/firebase";
import UsersPopup from "./usersPopup";
const MainPage = () => {
  const { user, loading, users, updateData } = useAuth();

  const [showPopup, setShowPopup] = useState(false);

  const [friends, setFriends] = useState([]);

  const [notFriends, setNotFriends] = useState([]);
  const [removingFriendId, setRemovingFriendId] = useState();

  useEffect(() => {
    const getFriendsOfUser = () => {
      if (!user || !users) return [];
      const authenticatedUser = users.find((u) => u.uid === user.uid);
      // If authenticated user is not found or if they don't have friends, return an empty array
      if (!authenticatedUser || !authenticatedUser.friends) return [];

      // Map over the friend IDs of the authenticated user and find the corresponding user objects
      return authenticatedUser.friends;
    };
    const getNotFriendsOfUser = () => {
      if (!user || !users) return [];
      const authenticatedUser = users.find((u) => u.uid === user.uid);
      // If authenticated user is not found or if they don't have friends, return an empty array
      if (!authenticatedUser || !authenticatedUser.friends) return [];

      // Get IDs of friends of authenticated user
      const friendIds = authenticatedUser.friends.map((friend) => friend.uid);

      // Filter out the authenticated user and their friends from the list of all users
      const notFriendsList = users.filter(
        (u) => u.uid !== user.uid && !friendIds.includes(u.uid)
      );

      return notFriendsList;
    };

    setNotFriends(getNotFriendsOfUser());
    setFriends(getFriendsOfUser());
  }, [user, users]);
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUnfriend = async (friendId) => {
    try {
      setRemovingFriendId(friendId);
      const friendDocRef = doc(db, "authUsers", friendId);
      const userDocRef = doc(db, "authUsers", user.uid);
      // Update the authenticated user's document to remove the friend's reference from the friends array
      await updateDoc(userDocRef, {
        friends: arrayRemove(friendDocRef),
      });
      await updateDoc(friendDocRef, {
        friends: arrayRemove(userDocRef),
      });
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.uid !== friendId)
      );

      console.log("Friend removed successfully");
      updateData();

      setRemovingFriendId(null);
    } catch (error) {
      setRemovingFriendId(null);

      console.error("Error removing friend:", error.message);
    }
  };

  const handleAddFriend = async (receiverID) => {
    try {
      const friendDocRef = doc(db, "authUsers", receiverID);

      const userDocRef = doc(db, "authUsers", user.uid);

      await addDoc(collection(db, "friendRequests"), {
        senderID: userDocRef,
        receiverID: friendDocRef,
      });
     
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div>
      <div>{user.email}</div>
      <div className="flex">
        <div className="w-1/2"></div>
        <div className="bg-backgroundSecondary w-1/2 h-full min-h-[40vh] rounded-xl p-4">
          <div className="flex justify-between">
            <h2>Friends</h2>
            <button
              onClick={handleTogglePopup}
              className="bg-buttonColor mt-2 rounded-lg hover:scale-105 hover:shadow-lg py-2 px-4 text-white"
            >
              Add more
            </button>
            {showPopup && (
              <UsersPopup
                handleTogglePopup={handleTogglePopup}
                notFriends={notFriends}
                handleAddFriend={handleAddFriend}
              />
            )}
          </div>
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
              <div>{friend.displayName}</div>
              <button
                disabled={removingFriendId === friend.uid}
                className="cursor-pointer bg-red-600 px-3 py-1 rounded-full text-white"
                onClick={() => handleUnfriend(friend.uid)}
              >
                {removingFriendId === friend.uid ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
