"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CreateGoal from "./createGoal";
import AllGoals from "./allGoals";
import Recent from "./recent";
import { useSearchParams } from "next/navigation";

const Goals = () => {
  const [reviewResponse, setReviewResponse] = useState(false)
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(""
  );
  const userId = auth.currentUser.uid;
  const docRef = doc(db, "authUsers", userId);

  const deleteGoal = async (goalName) => {
    try {
      let currData = userData.goals;

      delete currData[goalName];
      setUserData((prevUserData) => ({
        ...prevUserData,
        goals: { ...currData },
      }));
      //console.log(userData)
      setDoc(docRef, { ...userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    setUserData(JSON.parse(searchParams.get("userData")))
  }, []);
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between flex-grow mb-2">
        
          <CreateGoal
            userId={userId}
            user={userData}
            setUserData={setUserData}
            setReviewResponse={setReviewResponse}
          />
        
        {!reviewResponse && 
            <Recent userData={userData} />
        }
      </div>
      {userData && !reviewResponse &&(
        <AllGoals 
          key={userId} 
          userData={userData} 
          deleteGoal={deleteGoal}
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default Goals;
