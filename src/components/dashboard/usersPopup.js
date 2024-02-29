"use client";
import React, { useState } from "react";
import SingleUser from "./singleUser";

const UsersPopup = ({
  handleTogglePopup,
  notFriends,
  handleAddFriend,

}) => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center z-10 w-full h-full bg-[rgb(0,0,0,0.2)]">
      <div className="max-w-[600px] w-[60%]  flex items-center justify-center flex-col z-20 p-8  bg-popupBackground text-popupText">
        <h2 className="text-2xl text-center font-bold">Add Friends</h2>
        <div className="w-full ">
          {notFriends.length > 0 ? (
            notFriends.map((singleUser, index) => (
              <SingleUser
                handleAddFriend={handleAddFriend}
                singleUser={singleUser}
             
                key={index}
              />
            ))
          ) : (
            <div>All Users are friends</div>
          )}
        </div>
        <button
          onClick={handleTogglePopup}
          className="bg-buttonColor mt-20 rounded-lg hover:scale-105 hover:shadow-lg px-5 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UsersPopup;
