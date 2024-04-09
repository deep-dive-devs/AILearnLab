"use client"
import { useState } from 'react';
import AllGoals from '../goals/allGoals';

const Practice = ({lesson}) => {

  return (
    <div className="flex flex-col px-4">
      <AllGoals />
    </div>
  );
};

export default Practice;