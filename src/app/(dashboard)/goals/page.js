"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebase";
import { doc, getDoc, setDoc} from "firebase/firestore";
import CreateGoal from "./createGoal";
import AllGoals from "./allGoals";
import { useSearchParams } from 'next/navigation'

const Goals = () => {
  const header =  window.location.pathname.split("/").slice(1)[0][0].toUpperCase()+window.location.pathname.slice(2)
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState(searchParams.get('userData'))
  const userId = auth.currentUser.uid
  const docRef = doc(db,"authUsers",userId);
  
  const deleteGoal = async (goalName) => {
    try {
    let currData = userData.goals

    delete currData[goalName]
    setUserData(((prevUserData) => ({
      ...prevUserData,
      goals: { ...currData },
    })))
    //console.log(userData)
    setDoc(docRef,{...userData})
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between bg-white p-8 rounded-xl mb-2">
        <h1 className="font-extrabold text-primary text-6xl">{header}</h1>
      </div>
      <div className="flex justify-between flex-grow mb-2">
        <div className="w-3/5">
          <CreateGoal userId={userId} user={userData} setUserData={setUserData}/>
        </div>
        <div className="flex flex-col p-4 w-2/5 ml-2 bg-slate-400 rounded-md">
          <div className='text-3xl mx-auto font-extrabold'>
            Recent
          </div>
        </div>
      </div>
      {userData && <AllGoals key={userId} userData={userData} deleteGoal={deleteGoal}/>}
    </div>
  );
};

export default Goals;
