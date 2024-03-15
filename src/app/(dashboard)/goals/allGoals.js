import React from "react";
import SingleGoal from "./singleGoal";
import { setDoc } from "firebase/firestore";

const AllGoals = ({userData, deleteGoal}) => {

  return (
    <div className="flex flex-col w-full mx-auto  bg-slate-400 rounded-md">
      <div className='text-3xl mx-auto p-2 font-extrabold'>
        All Goals
      </div>
      {userData && Object.keys(userData.goals).length > 0 && Object.entries(userData.goals).map(([key, value], index) => (
          <div key={key} className="flex  flex-col p-2 mx-2 bg-white mb-2 rounded-md flex-grow">
            <div className="flex px-2 pt-2 mx-2 bg-white rounded-md flex-grow justify-between items-center">
              <div className="p-2 text-2xl font-bold">{key}</div>
              <button className="p-1 mt-2 bg-primary rounded-md text-white text-lg font-medium" onClick={() => deleteGoal(key)}>Remove</button>
            </div>
            <SingleGoal title={key} lessons={value}/>
          </div>
        ))}
    </div>
  )
}

export default AllGoals