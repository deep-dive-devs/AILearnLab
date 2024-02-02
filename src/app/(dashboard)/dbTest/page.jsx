"use client"
import React,{ useState} from "react";
import { db } from "@/app/firebase";
import { collection, addDoc }  from "firebase/firestore";

const dbTest = () => {
    const [inputValue, setInputValue] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: inputValue,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log('Submitted:', inputValue);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Enter something:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  
};

export default dbTest;