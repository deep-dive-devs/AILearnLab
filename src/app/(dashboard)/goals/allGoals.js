import React, { useState } from "react";
import SingleGoal from "./singleGoal";
import { setDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

const AllGoals = ({ userData, deleteGoal }) => {
  const searchParams = useSearchParams();
  const [parsedUserData, setParsedUserData] = useState(userData);


  return (
    <div className="flex flex-col w-full mx-auto  bg-slate-400 rounded-md">
      <div className="text-3xl mx-auto p-2 font-extrabold">All Goals</div>
      {parsedUserData &&
        Object.keys(parsedUserData.goals).length > 0 &&
        Object.entries(parsedUserData.goals).map(([key, value], index) => (
          <div
            key={key}
            className="flex  flex-col p-2 mx-2 bg-white mb-2 rounded-md flex-grow"
          >
            <div className="flex px-2 pt-2 mx-2 bg-white rounded-md flex-grow justify-between items-center">
              <div className="p-2 text-2xl font-bold">{key}</div>
              <button
                className="p-1 mt-2 bg-primary rounded-md text-white text-lg font-medium"
                onClick={() => deleteGoal(key)}
              >
                Remove
              </button>
            </div>
            <SingleGoal title={key} lessons={value} uid={parsedUserData.uid} />
          </div>
        ))}
    </div>
  );
};

export default AllGoals;
