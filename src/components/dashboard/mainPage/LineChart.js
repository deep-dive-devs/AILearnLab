import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { getCurrentYearMonths } from "../../../../utils/utilsFunctions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart({
  goalsCompletedThisYearDataSet,
  goalsCreatedThisYearDataSet,
}) {
  const MIN_STEP_SIZE = 1;

  // Calculate the maximum value from both datasets
  const maxGoalsCompleted = Math.max(...goalsCompletedThisYearDataSet);
  const maxGoalsCreated = Math.max(...goalsCreatedThisYearDataSet);
  const maxGoals = Math.max(maxGoalsCompleted, maxGoalsCreated);

  let dividedStepSize = Math.ceil(maxGoals / 10);

  let stepSize = Math.max(dividedStepSize, MIN_STEP_SIZE);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: stepSize,
        },
      },
    },
    tension: 0.3,
    plugins: {
      title: {
        display: true,
        text: "Goals",
        position: "top", 
        align: "start", 
        color: "black",
        font: {
          size: 30,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: true,
        labels: {
          color: "black",
        },
      },
      backgroundColor: "white",
    },
  };
  
  const data = {
    labels: getCurrentYearMonths(),
    datasets: [
      {
        label: "Goals Completed This Year",

        data: goalsCompletedThisYearDataSet,
        fill: true,
        backgroundColor: "rgba(25, 118, 210, 0.2)", 
        borderColor: "rgba(25, 118, 210, 1)",
      },

      {
        label: "Goals Started This Year",
        data: goalsCreatedThisYearDataSet,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}