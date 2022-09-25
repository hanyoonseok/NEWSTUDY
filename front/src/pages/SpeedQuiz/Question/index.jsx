import React, { useCallback, useEffect } from "react";
import "./style.scss";

export default function Question({ question, index, onNextClick, initGauge }) {
  let inputHTML;

  const onInputChange = (e, idx) => {
    if (e.target.value.length === 1) {
      if (idx < question.answer.length - 1) {
        inputHTML[idx + 1].focus();
      }
    }
  };

  const renderInput = () => {
    const input = [];
    for (let i = 0; i < question.answer.length; i++) {
      input.push(
        <input
          type="text"
          className="question-input"
          maxLength="1"
          key={i}
          onChange={(e) => onInputChange(e, i)}
          onKeyPress={i === question.answer.length - 1 ? submitAnswer : null}
        />,
      );
    }

    inputHTML = document.querySelectorAll(".question-input");

    return input;
  };

  const submitAnswer = (e) => {
    if (e.key === "Enter") onNextClick();
  };

  useEffect(() => {
    initGauge();
    document.querySelector(".timer-gauge").style.display = "block";
    document.querySelector(".timer-needle").style.display = "block";
    document.querySelector(".timer-gauge").style.animation =
      "start 10s forwards linear";
    document.querySelector(".timer-needle").style.animation =
      "startNeedle 10s forwards linear";

    inputHTML.length > 0 && inputHTML[0].focus();
  }, [index, inputHTML]);

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
      <form className="question-input-container">{renderInput()}</form>
      <div className="question-footer">
        <div className="question-timer-container">
          <span className="timer-needle"></span>
          <span className="timer-gauge"></span>
        </div>
        <div className="question-btn-wrapper" onClick={onNextClick}>
          <button className="next-btn"></button>
        </div>
      </div>
    </div>
  );
}
