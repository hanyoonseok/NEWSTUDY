import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faArrowDown,
  faPlus,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

import "./style.scss";
import { intToLevel, partToKor } from "constants";
import Modal from "components/Modal";
import BadgeModal from "components/BadgeModal";

export default function WordModal({ info, setSelectedModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBadgeInfo, setNewBadgeInfo] = useState(null);
  const [modalText, setModalText] = useState("");
  const userState = useSelector((state) => state.user);

  const renderMyAnswer = () => {
    const result = [];

    for (let i = 0; i < info.eng.length; i++) {
      const wordBlock = (
        <div
          className={`wordmodal-wordblock ${
            info.eng.toUpperCase().charAt(i) ===
            info.user.toUpperCase().charAt(i)
              ? ""
              : "wrong"
          }`}
          key={i}
        >
          {info.user.toUpperCase().charAt(i)}
        </div>
      );
      result.push(wordBlock);
    }

    return result;
  };

  const renderWordAnswer = () => {
    const result = [];

    for (let i = 0; i < info.eng.length; i++) {
      const wordBlock = (
        <div className={`wordmodal-wordblock`} key={i}>
          {info.eng.toUpperCase().charAt(i)}
        </div>
      );
      result.push(wordBlock);
    }

    return result;
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedModal(null);
  };

  const onAddWordClick = useCallback(async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userState.accessToken}`,
      },
    };
    await axios
      .post("/vocaburary", { eng: info.eng }, headers)
      .then(() => {
        setModalText("단어장에 추가 완료");
        setIsModalOpen(true);

        axios.get("/badge/new", headers).then((res) => {
          if (res.data.length > 0) {
            setNewBadgeInfo(res.data[0]);
          }
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setModalText("이미 추가된 단어입니다");
          setIsModalOpen(true);
        }
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
            onClick={() => setSelectedModal(null)}
          />
        </article>
        <article className="wordmodal-desc-container">
          <i className="wordmodal-index">{info.index}</i>
          <span className="wordmodal-desc">
            {info.description.split("@@").map(
              (desc, idx) =>
                desc !== "" && (
                  <span className="hint-card-desc-row" key={idx}>
                    {info.description.split("@@").length > 2 && (
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
          <div className="wordmodal-trans-row">
            <i
              className={`wordmodal-trans-level ${
                info.level <= 2 ? "Alv" : info.level <= 4 ? "Blv" : "Clv"
              }`}
            >
              {intToLevel[info.level]}
            </i>
            <i className="wordmodal-trans-part">{partToKor[info.part]}</i>
            <div className="wordmodal-trans">{info.kor}</div>
          </div>
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

      {isModalOpen && <Modal text={modalText} setStatus={setIsModalOpen} />}

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
