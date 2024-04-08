"use client"
import { useState } from 'react';
import AllGoals from '../goals/allGoals';

const Practice = ({lesson}) => {
  const header =  window.location.pathname.split("/").slice(1)[0][0].toUpperCase()+window.location.pathname.slice(2)

  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between bg-white p-8 rounded-xl mb-2">
        <h1 className="font-extrabold text-primary text-6xl">{header}</h1>
      </div>
      <AllGoals />
    </div>
  );
};

export default Practice;