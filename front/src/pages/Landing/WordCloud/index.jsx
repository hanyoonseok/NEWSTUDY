import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export default function Wordcloud({ words }) {
  const options = {
    deterministic: false,
    enableTooltip: true,
    deterministic: false,
    rotations: 2,
    rotationAngles: [0, 0],
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSizes: [10, 50],
    padding: 3,
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };
  const size = [650, 400];

  return <ReactWordcloud words={words} options={options} size={size} />;
}
