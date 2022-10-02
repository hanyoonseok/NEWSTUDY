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
  const boundR = 15;
  const boundC = 18;
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
      let crossResponse = await axios.get("/word/game?type=cross", headers);

      while (true) {
        const isValid = isValidBound(crossResponse.data);

        if (!isValidBound(crossResponse.data)) {
          crossResponse = await axios.get("/word/game?type=cross", headers);
          continue;
        } else {
          console.log(crossResponse);
          setWordArr(crossResponse.data);
          setMaxR(isValid[0]);
          setMaxC(isValid[1]);
          break;
        }
      }
    };

    fetchData();
  }, []);

  const onLinkMenuClick = () => {
    window.location.href = "/game/menu";
  };

  const isValidBound = (resp) => {
    let tempR = 0;
    let tempC = 0;
    resp.forEach((e, i) => {
      e.index = i + 1;
      const rlen = e.r + e.eng.length;
      const clen = e.c + e.eng.length;
      tempR = Math.max(tempR, e.r + 1);
      tempC = Math.max(tempC, e.c + 1);
      e.d === 1
        ? (tempC = Math.max(tempC, clen))
        : (tempR = Math.max(tempR, rlen));
    });

    if (tempR >= boundR || tempC >= boundC) return false;

    return [tempR, tempC];
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
