import React from "react";

const Recent = ({ userData }) => {
  const sortedGoals = userData.goals
    ? Object.entries(userData.goals)
        .sort(
          ([, a], [, b]) =>
            new Date(b.insights.lastOpened) - new Date(a.insights.lastOpened)
        )
        .slice(0, 3)
    : [];
  console.log(sortedGoals);
  return (
    <div className="flex flex-col p-4 w-2/5 ml-2 bg-backgroundSecondary shadow-2xl rounded-md justify-items-center">
      <div className="text-2xl mb-4 mx-auto font-extrabold">Recent</div>
      {sortedGoals.length > 0 ? (
        sortedGoals.map(([goalTitle, goal]) => (
          <div
            key={goalTitle}
            className="flex flex-col p-2 mx-2 bg-gray-200 mb-1 rounded-md flex-grow "
          >
            <div className="py-1 px-2 flex items-center justify-between">
              <p className="text-lg font-bold">{goalTitle}</p>
              <div className=" w- text-sm">
                <p className="">
                  <b>Last Opened</b> {' '}
                  {goal.insights.lastOpened?.split(",")[0]}
                </p>
                <p>
                  <b>Total Lessons</b>{' '}
                  {Object.keys(goal).length - 1}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No recent goals</div>
      )}
    </div>
  );
};

export default Recent;
