import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

import "./style.scss";
import Modal from "components/Modal";
import BadgeModal from "components/BadgeModal";

export default function WordModal({ wordInfo, setSelectedWord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBadgeInfo, setNewBadgeInfo] = useState();
  const userState = useSelector((state) => state.user);

  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedWord(null);
  };

  const onAddWordClick = useCallback(async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userState.accessToken}`,
      },
    };
    await axios.post("/vocaburary", wordInfo.eng, headers).then(() => {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);

        axios.get("/badge/new", headers).then((res) => {
          if (res.data.length > 0) {
            setNewBadgeInfo(res.data[0]);
          }
        });
      }, 1200);
    });
  }, []);

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
          <button className="wordmodal-add-btn" onClick={onAddWordClick}>
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

      {isModalOpen && (
        <Modal text="단어장에 추가 완료" setStatus={setIsModalOpen} />
      )}

      {newBadgeInfo && (
        <BadgeModal
          index={newBadgeInfo.b_id}
          text={newBadgeInfo.name}
          setStatus={setNewBadgeInfo}
        />
      )}
    </div>
  );
}
