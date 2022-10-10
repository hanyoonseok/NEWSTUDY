import Slider, { Range } from "rc-slider";
import React from "react";
import "./style.scss";
export default function LevelRange({ getSelectedLevel }) {
  const sliderProps = {
    min: 1,
    max: 6,
    step: 1,
    defaultValue: [1, 6],
    marks: {
      1: "A1",
      2: "A2",
      3: "B1",
      4: "B2",
      5: "C1",
      6: "C2",
    },
  };

  return (
    <>
      <Range
        {...sliderProps}
        onChange={(e) => {
          getSelectedLevel(e[0], e[1]);
        }}
      />
    </>
  );
}
