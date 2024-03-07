import React from "react";
import { useState } from 'react';

const SingleGoal = ({title, lessons}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="felx flex-col w-90 px-10">
            <button className="px-2 mx-auto bg-primary rounded-md text-white text-sm font-medium w-20" onClick={() => setOpen(!open)}>{open? "Close": "Open"}</button>
            {open && Object.entries(lessons)
                .sort((a, b) => a[0].split(" ")[1] - +b[0].split(" ")[1] )
                .map(([key, value], index) => 
                (
                    <div key={key} className='p-2 my-1 border-t border-black w-70'>
                        <div className='p-2 text-xl'>{key}</div>
                        <div className='px-2 mb-1'>{lessons[key]["Topic"]}</div>
                        <div className='px-2 '>{lessons[key]["What to study"]}</div>
                    </div>
            ))}
        </div>
    )
}

export default SingleGoal