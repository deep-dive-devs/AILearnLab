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

export default function LineChart() {
    const options = {
      responsive: true,
      tension: 0.3, // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
    };

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Second dataset",
          data: [33, 25, 35, 51, 54, 76],
          fill: true,
          borderColor: "#742774",
          backgroundColor: "#fcb3fc",
        },
      ],
    };

  return (
    
      <Line data={data} options={options} />
 
  );
}
