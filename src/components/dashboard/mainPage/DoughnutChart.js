import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ChartDataLabels, ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  totalGoalsCompletedThisYear,
  totalGoalsCreatedThisYear,
  totalGoalsOverDueThisYear,
}) => {
  const allData = [
    {
      label: "Goals Completed",
      value: totalGoalsCompletedThisYear,
      backgroundColor: "rgb(242,165,152)",
    },
    {
      label: "Goals Created",
      value: totalGoalsCreatedThisYear,
      backgroundColor: "rgb(255,232,157)",
    },
    {
      label: "Goals Overdue",
      value: totalGoalsOverDueThisYear,
      backgroundColor: "rgb(236,107,109)",
    },
  ];

  const filteredData = allData.filter((item) => item.value > 0);

  const data = {
    labels: filteredData.map((item) => item.label),
    datasets: [
      {
        data: filteredData.map((item) => item.value),
        backgroundColor: filteredData.map((item) => item.backgroundColor),
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const total = filteredData.reduce((acc, item) => acc + item.value, 0);

  const options = {
    cutoutPercentage: 75,
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: total,
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

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
