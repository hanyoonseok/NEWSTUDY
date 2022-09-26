import React from "react";
import { useEffect, useState } from "react";

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
      r: 0,
      c: 0,
      d: 1,
      name: "squid",
      hint: "hinthinthi nthint ginthintgint hinthint hinthintgint hintgint hinthinthin thintginthintg int",
    },
    {
      r: 0,
      c: 3,
      d: -1,
      name: "index",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 2,
      c: 3,
      d: 1,
      name: "discord",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 0,
      c: 7,
      d: -1,
      name: "globe",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 0,
      c: 7,
      d: 1,
      name: "gather",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 6,
      c: 0,
      d: 1,
      name: "banana",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 5,
      c: 0,
      d: -1,
      name: "absolute",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 6,
      c: 3,
      d: -1,
      name: "apple",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 5,
      c: 5,
      d: -1,
      name: "parent",
      hint: "hinthinthinthintginthintgint",
    },
    {
      r: 0,
      c: 14,
      d: -1,
      name: "puzzle",
      hint: "hinthinthinthintginthintgint",
    },
  ]);

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
  }, [maxC, maxR, wordArr]);

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
            <AnsCrossWord maxR={maxR} maxC={maxC} />
            <MyCrossWord maxR={maxR} maxC={maxC} />
          </div>
          <div className="crossword-mainbtn-wrapper">
            <button className="crossword-main-btn">메인으로</button>
          </div>
        </>
      )}
    </div>
  );
}
