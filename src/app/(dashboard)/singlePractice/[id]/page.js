"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db, auth } from "@/app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SaveNotification from "../saveNotification";
import { toast } from "sonner";
import { useAuth } from "@/components/context/AuthContext";

const SinglePractice = ({ params }) => {
  const { id } = params;
  const lessonOrignalTitle = id.replace("_", " ");
  const { updateData } = useAuth();

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const searchParams = useSearchParams();
  const userId = auth.currentUser.uid;
  const title = searchParams.get("title");

  const [parsedLessons, setParsedLessons] = useState();
  const [notes, setNotes] = useState("");
  const [lesson, setLesson] = useState({});
  const router = useRouter();
  const docRef = doc(db, "authUsers", userId);
  console.log(title, lessonOrignalTitle, userId);
  const fetchUserData = async () => {
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        console.log(userData);
        const filteredLessons = Object.entries(userData.goals[title]).filter(
          ([key]) => key !== "insights"
        );
        setParsedLessons(filteredLessons);
        setLesson(userData.goals[title][lessonOrignalTitle]);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  const getLesson = (direction) => {
    let lessonTitle = +lessonOrignalTitle.split(" ")[1];

    const nextLesson =
      lessonTitle < Object.keys(parsedLessons).length
        ? `Lesson ${lessonTitle + 1}`
        : null;
    const lastLesson = lessonTitle > 1 ? `Lesson ${lessonTitle - 1}` : null;

    if (direction === "last") {
      lastLesson && setLesson(parsedLessons[lastLesson]);

      setNotes(
        parsedLessons[lastLesson]?.note ? parsedLessons[lastLesson].note : ""
      );
      router.replace(
        `/singlePractice/${`Lesson_${lessonTitle - 1}`}?title=${title}`
      );
    } else {
      nextLesson && setLesson(parsedLessons[nextLesson]);
      setNotes(
        parsedLessons[lastLesson]?.note ? parsedLessons[lastLesson].note : ""
      );
      router.replace(
        `/singlePractice/${`Lesson_${lessonTitle + 1}`}?title=${title}`
      );
    }
  };

  const saveNotes = () => {
    let lessonAndNotes = { ...lesson, note: notes };

    setLesson((prevLessonData) => ({
      ...prevLessonData,
      note: notes,
    }));

    try {
      updateDoc(docRef, {
        [`goals.${title}.${lessonOrignalTitle}.note`]: `${notes}`,
      });
      setParsedLessons((prevLessonData) => ({
        ...prevLessonData,
        lessonAndNotes,
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
        [`goals.${title}.insights.completedDate`]:
          new Date().toLocaleDateString(),
      });

      toast.success("Goal Completed");
      updateData();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  if (!lesson || !parsedLessons) {
    return null;
  }
  parsedLessons && console.log(Object.keys(parsedLessons).length);
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
            {lessonOrignalTitle.split(" ")[1] > 1 ? (
              <button
                className="p-2 bg-primary rounded-md text-white text-lg font-medium"
                onClick={() => getLesson("last")}
              >
                Previous Lesson
              </button>
            ) : (
              <div></div>
            )}
            {lessonOrignalTitle.split(" ")[1] <
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
              {title}
            </div>
            <div className="text-2xl font-semibold text-left my-3">
              {lessonOrignalTitle}
            </div>
            <div className="text-1xl font-semibold text-left my-3">
              {lesson["Topic"]}
            </div>
            <div>{lesson["What to study"]}</div>
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

export default SinglePractice;
