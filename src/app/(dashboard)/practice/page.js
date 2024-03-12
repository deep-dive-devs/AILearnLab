"use client"
import { useState } from 'react';
import AllGoals from '../goals/allGoals';

const Practice = ({lesson}) => {
  

  return (
    <div className="flex flex-col p-4 flex-grow bg-slate-400 rounded-md">
      <AllGoals />
    </div>
  );
};

export default Practice;