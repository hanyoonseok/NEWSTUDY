import "./style.scss";
import React from "react";
const Dot = ({ num, scrollIdx }) => {
  return (
    <div className={`dot ${scrollIdx === num ? "on" : ""}`}>
      <div className={scrollIdx === num ? "boundary" : ""}></div>
    </div>
  );
};

const Dots = ({ scrollIdx }) => {
  return (
    <div className="dot-container">
      <div className="dot-list">
        <Dot num={1} scrollIdx={scrollIdx}></Dot>
        <Dot num={2} scrollIdx={scrollIdx}></Dot>
        <Dot num={3} scrollIdx={scrollIdx}></Dot>
        <Dot num={4} scrollIdx={scrollIdx}></Dot>
        <Dot num={5} scrollIdx={scrollIdx}></Dot>
        <div className="dot-line"></div>
      </div>
    </div>
  );
};

export default Dots;
