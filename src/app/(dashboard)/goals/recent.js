import React from "react";

const Recent = ({userData}) => {
    const sortedGoals = userData.goals 
    ? Object.entries(userData.goals).sort(([, a], [, b]) => 
        new Date(b.insights.lastOpened) - new Date(a.insights.lastOpened)
      ).slice(0, 3)
    : [];
    
    return(
        <div>
            <div className="text-4xl mx-auto font-extrabold">Recent</div>
            {sortedGoals.length > 0 ? (
                sortedGoals.map(([goalTitle, goal]) => (
                <div
                    key={goalTitle}
                    className="flex flex-col p-2 mx-2 bg-white mb-2 rounded-md flex-grow"
                >
                    <div className="p-2 text-2xl font-bold">{goalTitle}</div>
                </div>
                ))
            ) : (
                <div>No recent goals</div>
            )}
        </div>
    )
}

export default Recent;