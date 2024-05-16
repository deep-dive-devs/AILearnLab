import React from "react";

const Recent = ({userData}) => {
    console.log(userData.recent, "in recent")
    return(
        <div>
            <div className="text-4xl mx-auto font-extrabold">Recent</div>
            {userData.recent &&
                userData.recent.length > 0 &&
                userData.recent.map((lessonTitle) => (
                <div
                    key={lessonTitle}
                    className="flex  flex-col p-2 mx-2 bg-white mb-2 rounded-md flex-grow"
                >
                    <div className="p-2 text-2xl font-bold">{lessonTitle}</div>
                
                </div>
                ))}
        </div>
    )
}

export default Recent;