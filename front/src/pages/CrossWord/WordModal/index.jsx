import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";

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
        <h1 className="wordmodal-word-title">{wordInfo.eng}</h1>
        <article className="wordmodal-desc-container">
          <i className="wordmodal-index">{wordInfo.index}</i>
          <span className="wordmodal-desc">
            {wordInfo.description.split("@@").map(
              (desc, idx) =>
                desc !== "" && (
                  <span className="hint-card-desc-row" key={idx}>
                    {wordInfo.description.split("@@").length > 2 && (
                      <b>
                        <FontAwesomeIcon icon={faCircle} />
                      </b>
                    )}{" "}
                    {desc}
                  </span>
                ),
            )}
          </span>
        </article>
        <article className="wordmodal-kor-trans">
          {/* <div className="wordmodal-trans-row">
            <i
              className={`wordmodal-trans-level ${
                wordInfo.level.includes("A")
                  ? "Alv"
                  : wordInfo.level.includes("B")
                  ? "Blv"
                  : "Clv"
              }`}
            >
              {wordInfo.level}
            </i>
            <i className="wordmodal-trans-part">{wordInfo.part}</i>
            <div className="wordmodal-trans">{wordInfo.kor}</div>
          </div> */}
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
