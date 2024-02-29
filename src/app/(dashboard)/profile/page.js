"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/shared/customInput";


const Profile = () => {
 
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
