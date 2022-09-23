import React, { useEffect } from "react";
import "./style.scss";

export default function Question({ question, index, onNextClick, timer }) {
  const renderInput = () => {
    const inputs = [];

    for (let i = 0; i < question.answer.length; i++) {
      inputs.push(
        <input type="text" className="question-input" maxLength="1" key={i} />,
      );
    }

    return inputs;
  };

  useEffect(() => {
    document.querySelector(".timer-gauge").style.display = "block";
    document.querySelector(".timer-needle").style.display = "block";
    document.querySelector(".timer-gauge").style.animation =
      "start 10s forwards linear";
    document.querySelector(".timer-needle").style.animation =
      "startNeedle 10s forwards linear";
  }, [index]);

  return (
    <div className="question-container">
      <p className="question-desc-container">
        <i className="question-index">{index}</i>
        <span className="question-desc">{question.desc}</span>
      </p>
      <div className="question-kor-trans">
        {question.translate.map((e, i) => {
          return (
            <div className="question-trans-row" key={i}>
              <i className="question-trans-part">{e.part}</i>
              <div className="question-trans">{e.trans}</div>
            </div>
          );
        })}
      </div>
      <div className="question-input-container">{renderInput()}</div>
      <div className="question-footer">
        <div className="question-timer-container">
          <span className="timer-needle"></span>
          <span className="timer-gauge"></span>
        </div>
        <div
          className="question-btn-wrapper"
          onClick={() => onNextClick(timer)}
        >
          <button className="next-btn"></button>
        </div>
      </div>
    </div>
  );
}
