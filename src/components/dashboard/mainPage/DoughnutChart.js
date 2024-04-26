import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ChartDataLabels,ArcElement, Tooltip, Legend);
const DoughnutChart = () => {
  const data = {
    labels: ["Critical case", "Urgent case", "Errors", "Reviewed", "Success"],
    datasets: [
      {
        data: [30, 30, 5, 15, 20],
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
          "rgb(122,231,125)",
          "rgb(195,233,151)",
        ],
        display:true,
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const Options = {
    cutoutPercentage: 75,
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 400,
            font: {
              size: "40",
            },
            color: "black",
          },
          {
            text: "Total",
            font: {
              size: "25",
            },
            color: "grey",
          },
        ],
      },
      ChartDataLabels,
      datalabels: {
        color: "black",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  };

  return (

      <Doughnut data={data} options={Options} />
 
  );
};

export default DoughnutChart;
