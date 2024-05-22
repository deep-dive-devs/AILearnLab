import React from "react";
import { useState } from "react";
import { auth, db } from "@/app/firebase";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SingleGoal = ({ title, lessons, uid, userData, setUserData }) => {
  const [open, setOpen] = useState(false);
  const filteredLessons = Object.fromEntries(
    Object.entries(lessons).filter(([key]) => key !== "insights")
  );
  const userId = auth.currentUser.uid;

  const userRef = doc(db, "authUsers", userId);

  const saveToDatabase = async (data) => {
    await setDoc(userRef, { ...data });
  };

  const openAndClose = () => {
    setOpen(!open);

    if (!open) {
      lessons.insights = {
        ...lessons.insights,
        lastOpened: new Date().toLocaleString(),
      };
      let goal = {
        ...userData.goals,
        [title]: { ...lessons, insights: lessons.insights },
      };

      setUserData((prevUserData) => ({
        ...prevUserData,
        goals: goal,
      }));

      saveToDatabase(userData);
    }
  };

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
              href={`/singlePractice/${key.replace(" ", "_")}?title=${title}`}
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
