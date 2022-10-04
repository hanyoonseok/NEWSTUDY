import { useCallback } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { category } from "constants/category";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export default function AnalysisChart({ categoryCnt }) {
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const getRandomColor = useCallback(() => {
    let hex = "#";

    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * hexValues.length);
      hex += hexValues[index];
    }

    return hex;
  }, []);

  const getVariousColor = useCallback(() => {
    let colors = [];
    const cnt = Object.keys(categoryCnt).length;
    for (let i = 0; i < cnt; i++) colors.push(getRandomColor());
    return colors;
  }, [categoryCnt]);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "카테고리 내 키워드 언급량",
      },
    },
  };

  const data = {
    labels: Object.keys(categoryCnt).map((e) => category[e].main),
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(categoryCnt),
        borderColor: getVariousColor(),
        backgroundColor: getVariousColor(),
      },
    ],
  };

  return <Bar data={data} options={options} />;
}
