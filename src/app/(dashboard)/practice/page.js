"use client"
import { useState } from 'react';

const Practice = ({ onGenerateResponse }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('')

  const handleGenerateResponse = async () => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:`teach me ${userInput}, please break it down into approachable lessons and in a JSON format simlir to {"Lesson #":{"Topic":,"what to study":}} do not include text before or after the JSON object` 
        }),
      });
      const responseData = await response.json();
      setResponse(JSON.parse(responseData.response))
    } catch (error) {
      console.error('Error generating OpenAI response:', error);
    }
  };

  return (
    <div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="What would you like to learn about today?"
      />
      <button onClick={handleGenerateResponse}>Get My Lesson!</button>
      {response && <div>{response}</div>} 
    </div>
  );
};

export default Practice;