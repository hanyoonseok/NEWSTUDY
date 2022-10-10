import "./style.scss";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import Modal from "components/Modal";
import BadgeModal from "components/BadgeModal";

export default function Word({ vocas, setWordMemorizeStatus, isDaily }) {
  const user = useSelector((state) => state.user);
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBadgeInfo, setNewBadgeInfo] = useState(null);

  const changeMemorizeStatus = async (voca) => {
    await axios
      .put(`/vocaburary/${voca.v_id}`, null, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setWordMemorizeStatus((current) => !current);
      });
  };

  const onAddWordClick = useCallback(async (voca) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    await axios
      .post("/vocaburary", { eng: voca }, headers)
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
    <div className="voca-box">
      {vocas.map((voca, index) => (
        <div
          className={`voca ${!isDaily ? "voca-myvoca" : "voca-daily"}`}
          key={index}
        >
          <div className="word-index">{index + 1}</div>
          <div className={`word ${!isDaily ? "word-myvoca" : "word-daily"}`}>
            <p>{voca.eng}</p>
          </div>
          <div className="mean">{voca.kor}</div>
          {isDaily && (
            <i className="word-plus" onClick={() => onAddWordClick(voca.eng)}>
              <FontAwesomeIcon icon={faPlus} />
            </i>
          )}
          <div
            onClick={() => changeMemorizeStatus(voca)}
            className={"memorize " + (voca.done ? "blue" : "grey")}
          ></div>
        </div>
      ))}
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
