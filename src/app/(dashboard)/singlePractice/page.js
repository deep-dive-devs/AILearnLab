"use client"
import { useState,useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

const Practice = () => {
  const searchParams = useSearchParams()
  const parsedLesson = searchParams.get('lesson') ? JSON.parse(searchParams.get('lesson')) : null;
  const parsedLessons = searchParams.get('lessons') ? JSON.parse(searchParams.get('lessons')) : null;
  const [lesson, setLesson] = useState({
    title: searchParams.get('title'),
    lessonTitle:searchParams.get('lessonTitle'),
    lesson:parsedLesson
    })

  const getLesson = (direction) => {
    let lessonTitle = +lesson.lessonTitle.split(" ")[1]
    const nextLesson = lessonTitle < 10 ? `Lesson ${lessonTitle+1}` : null
    const lastLesson = lessonTitle > 1 ? `Lesson ${lessonTitle-1}` : null

    if (direction === "last") {
        console.log(parsedLessons[lastLesson])
        lastLesson && 
        setLesson(((prevLessonData) => ({
            ...prevLessonData,
            lessonTitle:lastLesson,
            lesson:parsedLessons[lastLesson]
          })))
    } else {
        nextLesson && 
        setLesson(((prevLessonData) => ({
            ...prevLessonData,
            lessonTitle:nextLesson,
            lesson:parsedLessons[nextLesson]
          })))
    }
  }


  return (
    <div className='flex flex-col mx-auto'>
         <div className="flex justify-between mb-4">
            <button className="p-2 bg-primary rounded-md text-white text-lg font-medium" onClick={() => getLesson("last")}>Previous Lesson</button>
            <button className="p-2 bg-primary rounded-md text-white text-lg font-medium" onClick={() => getLesson("next")}>Next Lesson</button>
        </div>
        <div className="flex flex-col p-4 mx-auto bg-white rounded-md">
            <div className="text-3xl font-bold text-center my-4 border-b-2 border-gray-500 pb-2">{lesson.title}</div>
            <div className="text-2xl font-semibold text-left my-3">{lesson.lessonTitle}</div>
            <div className="text-1xl font-semibold text-left my-3">{lesson.lesson["Topic"]}</div>
            <div>{lesson.lesson["What to study"]}</div>
            <div>answer or note area</div>
        </div>
    </div>
  );
};

export default Practice;