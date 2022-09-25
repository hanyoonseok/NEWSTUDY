import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faArrowDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

export default function WordModal({ info, setSelectedModal }) {
  const renderMyAnswer = () => {
    const result = [];

    for (let i = 0; i < info.answer.length; i++) {
      const wordBlock = (
        <div
          className={`wordmodal-wordblock ${
            info.answer.charAt(i) === info.user.charAt(i) ? "" : "wrong"
          }`}
          key={i}
        >
          {info.user.charAt(i)}
        </div>
      );
      result.push(wordBlock);
    }

    return result;
  };

  const renderWordAnswer = () => {
    const result = [];

    for (let i = 0; i < info.answer.length; i++) {
      const wordBlock = (
        <div className={`wordmodal-wordblock`} key={i}>
          {info.answer.charAt(i)}
        </div>
      );
      result.push(wordBlock);
    }

    return result;
  };

  return (
    <div className="wordmodal-container">
      <div className="wordmodal-content-container">
        <article className="wordmodal-btn-wrapper">
          <FontAwesomeIcon
            icon={faClose}
            className="wordmodal-closebtn"
            onClick={() => setSelectedModal(null)}
          />
        </article>
        <article className="wordmodal-desc-container">
          <i className="wordmodal-index">{info.index}</i>
          <span className="wordmodal-desc">{info.desc}</span>
        </article>
        <article className="wordmodal-kor-trans">
          {info.translate.map((e, i) => {
            return (
              <div className="wordmodal-trans-row" key={i}>
                <i
                  className={`wordmodal-trans-level ${
                    e.level.includes("A")
                      ? "Alv"
                      : e.level.includes("B")
                      ? "Blv"
                      : "Clv"
                  }`}
                >
                  {e.level}
                </i>
                <i className="wordmodal-trans-part">{e.part}</i>
                <div className="wordmodal-trans">{e.trans}</div>
              </div>
            );
          })}
        </article>
        <article className="wordmodal-input-result">
          <div className="wordmodal-input-row">{renderMyAnswer()}</div>
          <FontAwesomeIcon
            icon={faArrowDown}
            className="wordmodal-arrow-down"
          />
          <div className="wordmodal-input-row">{renderWordAnswer()}</div>
        </article>
        <article className="wordmodal-btn-wrapper end">
          <button className="wordmodal-add-btn">
            <i className="add-btn-circle">
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                className="wordmodal-add-btn-icon"
              />
            </i>
            &nbsp;단어장에 추가
          </button>
        </article>
      </div>
    </div>
  );
}
