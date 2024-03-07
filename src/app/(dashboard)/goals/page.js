"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebase";
import { doc, getDoc, setDoc} from "firebase/firestore";
import CreateGoal from "./createGoal";
import SingleGoal from "./singleGoal";
import AllGoals from "./allGoals";

const Goals = () => {
  const [userData, setUserData] = useState("");
  const userId = auth.currentUser.uid
  const docRef = doc(db,"authUsers",userId);

  const fetchUserData = async () => {
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const deleteGoal = async (goalName) => {
    let currData = userData.goals

    delete currData[goalName]
    setUserData(((prevUserData) => ({
      ...prevUserData,
      goals: { ...currData },
    })))
    setDoc(docRef,{goals:{...currData}},{merge:true})
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <div className="flex justify-between flex-grow mb-2">
        <div className="w-3/5">
          <CreateGoal userId={userId} user={userData} setUserData={setUserData}/>
        </div>
        <div className="flex flex-col p-4 w-2/5 ml-2 bg-slate-400 rounded-md">
          <div className='text-3xl mx-auto font-extrabold'>
            Recent Goals
          </div>
        </div>
      </div>
      {userData && <AllGoals key={userId} userData={userData}/>}
    </div>
  );
};

export default Goals;
