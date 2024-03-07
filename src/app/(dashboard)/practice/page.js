"use client"
import { useState } from 'react';
import dummyData from "./dummy"
import { auth,db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import TitleNotification from './titleNotification';

const Practice = ({userId, user, setUserData}) => {
  const [showTitleNotification, setShowTitleNotification] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [response, setResponse] = useState('')
  
  const userRef = doc(db,"authUsers",userId)
  const handleGenerateResponse = async () => {
    setResponse(dummyData)
    // try {
    //   const response = await fetch('/api/openai', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message:`teach me ${userInput}, please break it down into approachable lessons and in a JSON format simlir to {"Lesson #":{"Topic":,"what to study":}} do not include text before or after the JSON object` 
    //     }),
    //   });
    //   const responseData = await response.json();
    //   setResponse(JSON.parse(responseData.response))
    // } catch (error) {
    //   console.error('Error generating OpenAI response:', error);
    // }
    console.log(response)
  };

  const saveLesson = () => {
    if (!inputTitle) {
      setShowTitleNotification(true);
    } else {
      let currData = user.goals

      currData ={...currData,[inputTitle ]: response}
      setUserData(((prevUserData) => ({
        ...prevUserData,
        goals:currData ,
      })))
      setDoc(userRef,{goals:{[inputTitle ]: response}},{merge:true})
      clearInputs()
    }
  }

  const clearInputs = () => {
    setResponse("")
    setInputTitle("")
    setUserInput("")
  }

  return (
    <div className="flex flex-col p-4 flex-grow bg-slate-400 rounded-md">
  {showTitleNotification ? (
    <TitleNotification isOpen={showTitleNotification} onClose={() => setShowTitleNotification(false)} />
  ) : (
    <>
      <div className='text-4xl mx-auto font-extrabold'>
        Create Goal
      </div>
      <div className="min-w-3/4 h-4/5 bg-white mb-2 rounded-md flex-grow">
        <div className='flex flex-col grow-0 max-h-4/5'>
          {response && Object.entries(response).map(([key, value], index) => (
            <div key={key} className='p-2'>
              <div className='p-2 text-xl'>{key}</div>
              <div className='px-2 mb-1'>{response[key]["Topic"]}</div>
              <div className='px-2 '>{response[key]["What to study"]}</div>
            </div>
          ))}
        </div>
      </div>
      <textarea
        className='rounded-md mb-4 px-2 pt-2'
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="Give your lesson a title"
      />
      <textarea
        className='rounded-md mb-4 px-2 pt-2'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="What would you like to learn about today?"
      />
      {response ? (
        <div className='flex justify-between m-auto w-1/2'>
          <button
            onClick={() => clearInputs()}
            className="p-2 mx-auto bg-primary rounded-md text-white text-lg font-medium">
            New Lesson
          </button>
          <button
            onClick={saveLesson}
            className="p-2 px-10 mx-auto bg-primary rounded-md text-white text-lg font-medium">
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={handleGenerateResponse}
          className="p-2 mx-auto bg-primary rounded-md text-white text-lg font-medium">
          Create Goal
        </button>
      )}
    </>
  )}
</div>
  );
};

export default Practice;