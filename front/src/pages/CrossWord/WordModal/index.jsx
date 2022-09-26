import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

export default function WordModal({ wordInfo, setSelectedWord }) {
  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedWord(null);
  };

  return (
    <div className="wordmodal-container" onClick={closeModal}>
      <div
        className="wordmodal-content-container"
        onClick={(e) => e.stopPropagation()}
      >
        <article className="wordmodal-btn-wrapper">
          <FontAwesomeIcon
            icon={faClose}
            className="wordmodal-closebtn"
            onClick={() => setSelectedWord(null)}
          />
        </article>
        <article className="wordmodal-desc-container">
          <i className="wordmodal-index">{wordInfo.index}</i>
          <span className="wordmodal-desc">{wordInfo.hint}</span>
        </article>
        {/* <article className="wordmodal-kor-trans">
          {wordInfo.translate.map((e, i) => {
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
        </article> */}
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
