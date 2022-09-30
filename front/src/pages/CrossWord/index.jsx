import React from "react";
import { useEffect, useState } from "react";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector } from "react-redux";

import "./style.scss";
import InGame from "./InGame";
import MyCrossWord from "./MyCrossWord";
import AnsCrossWord from "./AnsCrossWord";

export default function CrossWord() {
  const [maxR, setMaxR] = useState(0);
  const [maxC, setMaxC] = useState(0);
  const [inGame, setInGame] = useState(true);
  const [wordArr, setWordArr] = useState([]);
  const userState = useSelector((state) => state.user);

  const crosswordInputs = document.querySelectorAll(".crossword-input");

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${userState.accessToken}`,
        },
      };
      const crossResponse = await axios.get("/word/game?type=cross", headers);
      console.log(crossResponse);
      setWordArr(crossResponse.data);

      let curr = 0;
      let curc = 0;
      crossResponse.data.forEach((e, i) => {
        e.index = i + 1;
        const rlen = e.r + e.eng.length;
        const clen = e.c + e.eng.length;
        curr = Math.max(curr, e.r + 1);
        curc = Math.max(curc, e.c + 1);
        e.d === 1
          ? (curc = Math.max(curc, clen))
          : (curr = Math.max(curr, rlen));
      });

      setMaxR(curr);
      setMaxC(curc);
    };

    fetchData();
  }, []);

  const onLinkMenuClick = () => {
    window.location.href = "/game/menu";
  };

  return (
    <div className={`crossword-container ${!inGame && "col"}`}>
      {inGame ? (
        <InGame
          maxR={maxR}
          maxC={maxC}
          wordArr={wordArr}
          setInGame={setInGame}
        />
      ) : (
        <>
          <div className="crossword-result-container">
            <AnsCrossWord
              maxR={maxR}
              maxC={maxC}
              wordArr={wordArr}
              crosswordInputs={crosswordInputs}
            />
            <MyCrossWord maxR={maxR} maxC={maxC} />
          </div>
          <div className="crossword-mainbtn-wrapper">
            <button className="crossword-main-btn" onClick={onLinkMenuClick}>
              게임 목록으로 <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
