"use client"
import { useState } from 'react';

const Practice = ({lesson}) => {
  

  return (
    <div className="flex flex-col p-4 flex-grow bg-slate-400 rounded-md">
      <div>lesson #</div>
      <div>Lesson synopsysis</div>
      <div>details of the lesson</div>
      <div>answer or note area</div>
    </div>
  );
};

export default Practice;