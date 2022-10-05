import { category } from "constants/category";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useMediaQuery } from "react-responsive";

export default function PieChart({ categoryCnt }) {
  const data = Object.keys(categoryCnt).map((e) => {
    return {
      id: category[e].main.toUpperCase(),
      label: category[e].main.toUpperCase(),
      value: categoryCnt[e],
    };
  });

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  return (
    <>
      {!isMobile ? (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          startAngle={-90}
          endAngle={90}
          borderWidth={1}
          colors={[
            "#F6D3AB",
            "#CDECCA",
            "#E3E3E3",
            "#FFAEAE",
            "#C9A9FD",
            "#D8E2FF",
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={1}
          arcLinkLabelsTextColor={"#000"}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextOffset={10}
          arcLinkLabelsDiagonalLength={20}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={1}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
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
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#000",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                    fontFamily: "Montserrat",
                  },
                },
              ],
            },
          ]}
          theme={{
            labels: {
              text: {
                fontSize: 16,
                fontWeight: "bold",
                fill: "#000",
                fontFamily: "Montserrat",
              },
            },

            legends: {
              text: {
                fontSize: 16,
                fill: "#000000",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              },
            },
            tooltip: {
              container: {
                color: "#000",
                fontFamily: "Montserrat",
              },
            },
          }}
        />
      ) : (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={3.5}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={[
            "#F6D3AB",
            "#CDECCA",
            "#E3E3E3",
            "#FFAEAE",
            "#C9A9FD",
            "#D8E2FF",
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextOffset={4}
          arcLinkLabelsSkipAngle={1}
          arcLinkLabelsDiagonalLength={0}
          arcLinkLabelsTextColor={"#000"}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={1}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
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
          theme={{
            labels: {
              text: {
                fontSize: 13,
                fontWeight: "bold",
                fill: "#000",
                fontFamily: "Montserrat",
              },
            },

            legends: {
              text: {
                fontSize: 14,
                fill: "#000000",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              },
            },
            tooltip: {
              container: {
                color: "#000",
                fontFamily: "Montserrat",
              },
            },
          }}
        />
      )}
    </>
  );
}
