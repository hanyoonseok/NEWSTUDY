import { ResponsivePieCanvas } from "@nivo/pie";
import { category } from "constants/category";
import React, { useCallback } from "react";

export default function PieChart({ categoryCnt }) {
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

  const data = Object.keys(categoryCnt).map((e) => {
    return {
      id: category[e].main.toUpperCase(),
      label: category[e].main.toUpperCase(),
      value: categoryCnt[e],
      color: getRandomColor(),
    };
  });

  return (
    <ResponsivePieCanvas
      data={data}
      margin={{ right: 200, left: 80, top: 40 }}
      innerRadius={0.4}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "paired" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      arcLinkLabelsSkipAngle={1}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={6}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={1}
      arcLabelsTextColor="#333333"
      startAngle={-90}
      endAngle={90}
      arcLinkLabelsStraightLength={10}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 50,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 60,
          itemHeight: 30,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 14,
          symbolShape: "circle",
        },
      ]}
      theme={{
        labels: {
          text: {
            fontSize: 20,
            fontWeight: "bold",
            fill: "#000000",
          },
        },

        legends: {
          text: {
            fontSize: 20,
            fill: "#000000",
          },
        },
      }}
    />
  );
}
