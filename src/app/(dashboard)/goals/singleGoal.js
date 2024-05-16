import React from "react";
import { useState } from "react";
import { db } from "@/app/firebase";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SingleGoal = ({ title, lessons, uid, userData, setUserData }) => {
  const [open, setOpen] = useState(false);
  const filteredLessons = Object.fromEntries(
    Object.entries(lessons).filter(([key]) => key !== "insights")
  );
  const userRef = doc(db, "authUsers", uid);
  const openAndClose = () => {
    setOpen(!open)
    // if (userData.recent) {
      // let recent = [...userData.recent]
      
      // console.log(userData.recent, recent.length < 3 && !recent?.includes(title))
      // if (recent.length < 3 && !recent.includes(title)) {
      //   recent.unshift(title);
      // } else {
      //   recent.pop();      
      //   recent.unshift(title); 
      // }

    //   setUserData((prevUserData) => ({
    //     ...prevUserData,
    //     goals: recent,
    //   }));
    // } else {
    //   setUserData((prevUserData) => ({
    //     ...prevUserData,
    //     recent: [title],
    //   }));
    // }

    lessons.insights = {
      ...lessons.insights, 
      lastOpened:new Date().toLocaleString()
    }

    setUserData((prevUserData) => ({
      ...prevUserData,
      goals:{...userData.goals, [title]: { ...lessons, insights: lessons.insights }},
    }));
    console.log(userData.goals[title].insights)
  }

  return (
    <div className="felx flex-col w-90 px-10">
      <button
        className="px-2 mx-auto bg-primary rounded-md text-white text-sm font-medium w-20"
        onClick={() => openAndClose(title)}
      >
        {open ? "Close" : "Open"}
      </button>
      {open &&
        Object.entries(filteredLessons)
          .sort((a, b) => a[0].split(" ")[1] - +b[0].split(" ")[1])
          .map(([key, value], index) => (
            <Link
              key={key}
              href={{
                pathname: "/singlePractice",
                query: {
                  title: title,
                  lessonTitle: key,
                  lesson: JSON.stringify(value),
                  lessons: JSON.stringify(filteredLessons),
                  uid: uid,
                },
              }}
            >
              <div className="p-2 my-1 border-t border-black w-70 hover:bg-gray-200">
                <div className="p-2 text-xl">{key}</div>
                <div className="px-2 mb-1">{filteredLessons[key]["Topic"]}</div>
                <div className="px-2 ">
                  {filteredLessons[key]["What to study"]}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default SingleGoal;
