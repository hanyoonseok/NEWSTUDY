import React from "react";
import { useEffect, useState } from "react";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.scss";
import InGame from "./InGame";
import MyCrossWord from "./MyCrossWord";
import AnsCrossWord from "./AnsCrossWord";

export default function CrossWord() {
  const [maxR, setMaxR] = useState(0);
  const [maxC, setMaxC] = useState(0);
  const [inGame, setInGame] = useState(true);
  const [wordArr, setWordArr] = useState([
    {
      index: 1,
      r: 0,
      c: 0,
      d: 1,
      name: "Squid",
      hint: "hinthinthi nthint ginthintgint hinthint hinthintgint hintgint hinthinthin thintginthintg int",
    },
    {
      index: 2,
      r: 0,
      c: 3,
      d: -1,
      name: "index",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 3,
      r: 2,
      c: 3,
      d: 1,
      name: "discord",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 4,
      r: 0,
      c: 7,
      d: -1,
      name: "globe",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 5,
      r: 0,
      c: 7,
      d: 1,
      name: "gather",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 6,
      r: 6,
      c: 0,
      d: 1,
      name: "banana",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 7,
      r: 5,
      c: 0,
      d: -1,
      name: "absolute",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 8,
      r: 6,
      c: 3,
      d: -1,
      name: "apple",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 9,
      r: 5,
      c: 5,
      d: -1,
      name: "parent",
      hint: "hinthinthinthintginthintgint",
    },
    {
      index: 10,
      r: 0,
      c: 14,
      d: -1,
      name: "puzzle",
      hint: "hinthinthinthintginthintgint",
    },
  ]);

  const crosswordInputs = document.querySelectorAll(".crossword-input");

  useEffect(() => {
    let curr = 0;
    let curc = 0;
    wordArr.forEach((e) => {
      const rlen = e.r + e.name.length;
      const clen = e.c + e.name.length;
      curr = Math.max(curr, e.r + 1);
      curc = Math.max(curc, e.c + 1);
      e.d === 1 ? (curc = Math.max(curc, clen)) : (curr = Math.max(curr, rlen));
    });

    setMaxR(curr);
    setMaxC(curc);
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
