import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Word from "components/Word";
import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DailyWordModal({ close }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vocas, setVocas] = useState(null);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: none;
      width: 100%;`;

    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      try {
        // 초기화시켜주기
        setVocas(null);
        const vocasResponse = await axios.get(`/daily`);
        setVocas(vocasResponse.data.slice(0, 10));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="daily-word-modal" onClick={close}>
      <div
        className="daily-word-modal-body"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            DAILY <b>WORD</b>
          </h2>

          <button className="close" onClick={close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <p className="daily-word-desc">
          당일 수집된 전체 기사의 최다 빈출 단어입니다.
          <img
            className="check-img"
            src={require("assets/check.png")}
            alt="check"
          ></img>
        </p>
        {vocas && <Word vocas={vocas} isDaily={true} />}
      </div>
    </div>
  );
}
