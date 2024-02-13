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
        body: JSON.stringify({ userInput }),
      });
      const responseData = await response.json();
      setResponse(responseData.response)
    } catch (error) {
      console.error('Error generating OpenAI response:', error);
    }
  };

  return (
    <div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your message..."
      />
      <button onClick={handleGenerateResponse}>Generate Response</button>
      {response && <div>{response}</div>} 
    </div>
  );
};

export default Practice;