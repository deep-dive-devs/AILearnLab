"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db, auth } from "@/app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SaveNotification from "./saveNotification";
import { toast } from "sonner";
import { useAuth } from "@/components/context/AuthContext";

const Practice = () => {
  const { updateData } = useAuth();

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid") ? searchParams.get("uid") : null;
  const parsedLesson = searchParams.get("lesson")
    ? JSON.parse(searchParams.get("lesson"))
    : null;
  const [parsedLessons, setParsedLessons] = useState(
    searchParams.get("lessons") ? JSON.parse(searchParams.get("lessons")) : null
  );
  const [notes, setNotes] = useState("");
  const [lesson, setLesson] = useState({
    title: searchParams.get("title"),
    lessonTitle: searchParams.get("lessonTitle"),
    lesson: parsedLesson,
  });
  const router = useRouter();
  const getLesson = (direction) => {
    let lessonTitle = +lesson.lessonTitle.split(" ")[1];

    const nextLesson =
      lessonTitle < Object.keys(parsedLessons).length
        ? `Lesson ${lessonTitle + 1}`
        : null;
    const lastLesson = lessonTitle > 1 ? `Lesson ${lessonTitle - 1}` : null;

    if (direction === "last") {
      lastLesson &&
        setLesson((prevLessonData) => ({
          ...prevLessonData,
          lessonTitle: lastLesson,
          lesson: parsedLessons[lastLesson],
        }));
      setNotes(
        parsedLessons[lastLesson]?.note ? parsedLessons[lastLesson].note : ""
      );
    } else {
      nextLesson &&
        setLesson((prevLessonData) => ({
          ...prevLessonData,
          lessonTitle: nextLesson,
          lesson: parsedLessons[nextLesson],
        }));
      setNotes(
        parsedLessons[lastLesson]?.note ? parsedLessons[lastLesson].note : ""
      );
    }
  };

  const saveNotes = () => {
    let lessonAndNotes = { ...parsedLesson, note: notes };

    setLesson((prevLessonData) => ({
      ...prevLessonData,
      lesson: lessonAndNotes,
    }));
    const docRef = doc(db, "authUsers", userId);

    try {
      updateDoc(docRef, {
        [`goals.${lesson.title}.${lesson.lessonTitle}.note`]: `${notes}`,
      });
      setParsedLessons((prevLessonData) => ({
        ...prevLessonData,
        [lesson.lessonTitle]: lessonAndNotes,
      }));
      setShowSaveNotification(true);
    } catch (err) {
      console.log(err);
    }
  };
  const completeGoal = () => {
    const docRef = doc(db, "authUsers", userId);

    try {
      updateDoc(docRef, {
        [`goals.${lesson.title}.insights.completedDate`]:
          new Date().toLocaleDateString(),
      });

      toast.success("Goal Completed");
      updateData();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col px-4 flex-grow">
      {showSaveNotification ? (
        <SaveNotification
          isOpen={showSaveNotification}
          onClose={() => setShowSaveNotification(false)}
        />
      ) : (
        <>
          <div className="flex justify-between mb-4 ">
            {lesson.lessonTitle.split(" ")[1] > 1 ? (
              <button
                className="p-2 bg-primary rounded-md text-white text-lg font-medium"
                onClick={() => getLesson("last")}
              >
                Previous Lesson
              </button>
            ) : (
              <div></div>
            )}
            {lesson.lessonTitle.split(" ")[1] <
            Object.keys(parsedLessons).length ? (
              <button
                className="p-2 bg-primary rounded-md text-white text-lg font-medium"
                onClick={() => getLesson("next")}
              >
                Next Lesson
              </button>
            ) : (
              <button
                className="p-2 bg-primary rounded-md text-white text-lg font-medium"
                onClick={() => completeGoal()}
              >
                Complete Goal
              </button>
            )}
          </div>
          <div className="flex flex-col p-4 px-4 bg-white rounded-md mb-4">
            <div className="text-3xl font-bold text-center my-4 border-b-2 border-gray-500 pb-2">
              {lesson.title}
            </div>
            <div className="text-2xl font-semibold text-left my-3">
              {lesson.lessonTitle}
            </div>
            <div className="text-1xl font-semibold text-left my-3">
              {lesson.lesson["Topic"]}
            </div>
            <div>{lesson.lesson["What to study"]}</div>
          </div>
          <div className="flex flex-col p-4 px-4 bg-white rounded-md ">
            <textarea
              className="rounded-md mb-4 px-2 pt-2 border-black"
              value={lesson.note ? lesson.note : notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Use this area for notes"
            />
            <div className="flex justify-between m-auto w-1/2">
              <button
                onClick={() => saveNotes()}
                className="p-2 px-10 mx-auto bg-primary rounded-md text-white text-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Practice;
