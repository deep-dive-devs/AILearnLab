"use client"
import { useState } from 'react';
import dummyData from "./dummy"

const Practice = ({ onGenerateResponse }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('')

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

  const getResponse = (response) => {
    if (!response) return <div>Use the box below to type in the subject you want to learn about!!</div>

    for (const key in response) {
      
    }
    return (
      <div>I'm working over here!</div>
    )
  }

  const saveLesson = () => {
    console.log("saving lesson, click")
  }

  return (
    <div className="flex flex-col p-4 flex-grow">
      <div className="min-w-3/4 h-4/5 bg-white mb-2 rounded-md flex-grow">
        <div className='flex flex-col grow-0 max-h-4/5'>
          {response && Object.entries(response).map(([key, value], index) => (
            <div key={key} className='p-2'>
              <div className='p-2 text-xl'>{key}</div>
              <div className='px-2 mb-1'>{response[key]["Topic"]}</div>
              <div className='px-2 '>{response[key]["What to study"]}</div>
            </div>
            )
          )} 
        </div>
      </div>
      <textarea
        className='rounded-md mb-4'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="What would you like to learn about today?"
      />
      {response? 
        <div className='flex justify-between m-auto w-1/2'>
          <button 
            onClick={handleGenerateResponse} 
            className="p-2 mx-auto bg-primary rounded-md text-white text-lg font-medium">
              Get A New Lesson!
          </button>
          <button 
            onClick={saveLesson} 
            className="p-2 mx-auto bg-primary rounded-md text-white text-lg font-medium">
              Save to you Lessons!
          </button>
        </div>
          :<button 
            onClick={handleGenerateResponse} 
            className="p-2 mx-auto bg-primary rounded-md text-white text-lg font-medium">
              Get My Lesson!
          </button>}
    </div>
  );
};

export default Practice;