"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebase";
import { doc, getDoc} from "firebase/firestore";
import Practice from "../practice/page";

const Goals = () => {
  const [userData, setUserData] = useState("");
  const user = auth.currentUser.uid
  const docRef = doc(db,"authUsers",user);

  const fetchUserData = async () => {
    console.log("fetch data");
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
        console.log(userData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <div className="flex justify-between flex-grow mb-2">
        <div className="w-3/5">
          <Practice user={user}/>
        </div>
        <div className="flex flex-col p-4 w-2/5 ml-2 bg-slate-400 rounded-md">
          <div className='text-3xl mx-auto font-extrabold'>
            Recent Goals
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mx-auto  bg-slate-400 rounded-md">
        <div className='text-3xl mx-auto font-extrabold'>
          All Goals
        </div>
        {userData && Object.entries(userData.goals).map(([key, value], index) => (
            <div key={key} className="p-2 mx-2 bg-white mb-2 rounded-md flex-grow">
              {key}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Goals;
