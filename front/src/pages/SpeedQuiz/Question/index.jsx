import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";

import { partToKor } from "constants";
import "./style.scss";

export default function Question({
  question,
  index,
  onNextClick,
  initDomElement,
}) {
  const korTrans = useRef();
  const inputHTML = useRef([]);

  const onInputChange = useCallback(
    (e, idx) => {
      if (e.target.value.length === 1) {
        if (
          inputHTML.current.length > 0 &&
          idx < inputHTML.current.length - 1 &&
          inputHTML.current[idx + 1]
        ) {
          inputHTML.current[idx + 1].focus();
        }
      }
    },
    [inputHTML],
  );

  const submitAnswer = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onNextClick();
      }
    },
    [onNextClick],
  );

  const renderInput = useCallback(() => {
    const input = [];
    for (let i = 0; i < question.eng.length; i++) {
      input.push(
        <input
          type="text"
          className="question-input"
          maxLength="1"
          key={i}
          onChange={(e) => onInputChange(e, i)}
          onKeyPress={i === question.eng.length - 1 ? submitAnswer : null}
          ref={(el) => (inputHTML.current[i] = el)}
        />,
      );
    }

    return input;
  }, [question, onInputChange]);

  useEffect(() => {
    initDomElement();
    const gauge = document.createElement("span");
    const needle = document.createElement("span");
    gauge.className = "timer-gauge";
    needle.className = "timer-needle";

    document.querySelector(".question-timer-container").appendChild(gauge);
    document.querySelector(".question-timer-container").appendChild(needle);

    inputHTML.current.length > 0 && inputHTML.current[0].focus();

    const fiveTimer = setTimeout(() => {
      korTrans.current.style.display = "flex";
    }, 5000);

    return () => {
      clearTimeout(fiveTimer);
    };
  }, [index]);

  return (
    <div className="question-container">
      <p className="question-desc-container">
        <i className="question-index">{index}</i>
        <span className="question-desc">
          {question.description.split("@@").map(
            (desc, idx) =>
              desc !== "" && (
                <span className="question-desc-row" key={idx}>
                  {question.description.split("@@").length > 2 && (
                    <b>
                      <FontAwesomeIcon icon={faCircle} />
                    </b>
                  )}{" "}
                  {desc}
                </span>
              ),
          )}
        </span>
      </p>
      <div className="question-kor-trans" ref={korTrans}>
        <div className="question-trans-row">
          <i className="question-trans-part">{partToKor[question.part]}</i>
          <div className="question-trans">{question.kor}</div>
        </div>
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
