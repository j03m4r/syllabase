"use client";

import { Chart as ChartJs, ArcElement, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Legend, ChartDataLabels, Tooltip);

interface PieChartProps {
  gradeCategories: [string, number][];
}

const PieChart: React.FC<PieChartProps> = ({ gradeCategories }) => {
  const labels = gradeCategories.map((gradeCategory) => gradeCategory[0]);
  const percentages = gradeCategories.map((gradeCategory) => gradeCategory[1]);
  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: [
          // '#CFBDFF',
          // '#E5DBFF',
          // '#99edc3',
          // '#9ADFED',
          // '#ACED9A',
          // '#E4BDFF',
          // '#FFBDE0',
          // '#BDEAFF',
          // '#291E42',
          // '#371F76'
          "#F88379",
          "#FFA07A",
          "#FDBA96",
          "#FADADD",
          "#FF6F61",
          "#FED4C4",
          "#F8B7A2",
          "#FDB998",
          "#F1DDCF",
          "#F4C2C2",
          "#F88379",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: true,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      datalabels: {
        color: "#171717",
        font: {
          size: 12,
          weight: "400",
        },
        formatter: function (value: number, context: any) {
          let label = context.chart.data.labels[context.dataIndex];
          // Shorten the label if it's too long
          if (label.length > 10) {
            label = label.substring(0, 20) + "...";
          }
          return label;
        },
        anchor: "end",
        align: "start",
        offset: 20, // Increase this to move the labels further out
      },
    },
  };

  return (
    // @ts-ignore
    <Pie
      data={data}
      options={options}
      width={400}
      height={400}
      plugins={[ChartDataLabels]}
    />
  );
};

export default PieChart;
