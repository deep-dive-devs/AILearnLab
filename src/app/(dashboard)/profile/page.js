"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/shared/customInput";
import { useAuth } from "@/components/context/AuthContext";
import { FaTrash } from "react-icons/fa";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const Profile = () => {
  const { user, loading, users } = useAuth();
  console.log(user);
  console.log(users);
  const [friends, setFriends] = useState([]);
  const [removingFriend, setRemovingFriend] = useState(false);

  useEffect(() => {
    const getFriendsOfUser = () => {
      if (!user || !users) return [];
      const authenticatedUser = users.find((u) => u.uid === user.uid);
      // If authenticated user is not found or if they don't have friends, return an empty array
      if (!authenticatedUser || !authenticatedUser.friends) return [];
      // Map over the friend IDs of the authenticated user and find the corresponding user objects
      return authenticatedUser.friends;
    };

    setFriends(getFriendsOfUser());
  }, [user, users]);

  const handleUnfriend = async (friendId) => {
    try {
      setRemovingFriend(true);
      // Query to find the document reference of the friend using the friend's ID
      const friendQ = query(
        collection(db, "authUsers"),
        where("uid", "==", friendId)
      );

      // Execute the friend query
      const friendQuerySnapshot = await getDocs(friendQ);

      // Get the document reference of the friend
      const friendDocRef = friendQuerySnapshot.docs[0].ref;

      // Query to find the document reference of the user using the user's ID
      const userQ = query(
        collection(db, "authUsers"),
        where("uid", "==", user.uid)
      );

      // Execute the user query
      const userQuerySnapshot = await getDocs(userQ);

      // Check if any documents were found
      if (!userQuerySnapshot.empty) {
        // Reference to the authenticated user's document
        const userDocRef = userQuerySnapshot.docs[0].ref;

        // Update the authenticated user's document to remove the friend's reference from the friends array
        await updateDoc(userDocRef, {
          friends: arrayRemove(friendDocRef),
        });
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.uid !== friendId)
        );

        console.log("Friend removed successfully");
      } else {
        console.error("User document not found");
      }
      setRemovingFriend(false);
    } catch (error) {
      setRemovingFriend(false);

      console.error("Error removing friend:", error.message);
    }
  };
  // Get the friends of the authenticated user
  console.log(friends);
  return (
    <div className="bg-backgroundTertiary w-full min-h-[80vh] h-full mx-3 p-5 rounded-lg">
      <div className="m-3">Search</div>
      <div className="flex items-center justify-center gap-5">
        <div className="bg-backgroundSecondary w-full h-full rounded-xl p-4">
          <h1>USER PROFILE</h1>
          <CustomInput
            type="text"
            placeholder="Enter your Name"
            name="name"
            label="Name"
          />
          <CustomInput
            type="email"
            placeholder="Enter your Email"
            name="emailAddress"
            label="Email Address"
          />
          <CustomInput
            type="text"
            placeholder="Enter your Location"
            name="location"
            label="Location"
          />
        </div>
        <div className="bg-backgroundSecondary w-full h-full min-h-[40vh] rounded-xl p-4">
          <h2>Friends</h2>
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
              <div>{friend.displayName}</div>
              <button
                disabled={removingFriend}
                className="cursor-pointer bg-red-600 px-3 py-1 rounded-full text-white"
                onClick={() => handleUnfriend(friend.uid)}
              >
                {removingFriend ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
