import { useEffect, useState, useCallback } from "react";

import "./style.scss";
import BackBtn from "../BackBtn";
import Globe from "assets/user_globe.png";

export default function CrossWordGame({ setStep }) {
  const [maxR, setMaxR] = useState(0);
  const [maxC, setMaxC] = useState(0);
  const [wordArr, setWordArr] = useState([
    {
      r: 0,
      c: 0,
      d: 1,
      name: "squid",
    },
    {
      r: 0,
      c: 3,
      d: -1,
      name: "index",
    },
    {
      r: 2,
      c: 3,
      d: 1,
      name: "discord",
    },
    {
      r: 0,
      c: 7,
      d: -1,
      name: "globe",
    },
    {
      r: 0,
      c: 7,
      d: 1,
      name: "gather",
    },
    {
      r: 6,
      c: 0,
      d: 1,
      name: "banana",
    },
    {
      r: 5,
      c: 0,
      d: -1,
      name: "absolute",
    },
    {
      r: 6,
      c: 3,
      d: -1,
      name: "apple",
    },
    {
      r: 5,
      c: 5,
      d: -1,
      name: "parent",
    },
    {
      r: 0,
      c: 14,
      d: -1,
      name: "puzzle",
    },
  ]);
  let mapInfo;

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
    const mapArray = new Array(curr);
    for (let i = 0; i < curr; i++) mapArray[i] = new Array(curc);
    mapInfo = mapArray;
  }, [maxC, maxR, wordArr]);

  const typeWord = useCallback((e, r, c) => {
    const value = e.target.value;
    if (mapInfo[r][c] === value) return;
    mapInfo[r][c] = value;
    if (mapInfo[r][c]) e.target.style.zIndex = 5;
    console.log(mapInfo);
  }, []);

  const drawCrossword = () => {
    const result = [];

    const addSpace = (i) => {
      const word = [];

      for (let j = 0; j < wordArr[i].name.length; j++) {
        word.push(
          <div className="crossword-one-space" key={`${i} ${j}`}>
            <input
              type="text"
              className="hidden-input"
              onChange={(e) =>
                typeWord(
                  e,
                  wordArr[i].d === 1 ? wordArr[i].r : wordArr[i].r + j,
                  wordArr[i].d === 1 ? wordArr[i].c + j : wordArr[i].c,
                )
              }
              maxLength="1"
            />
          </div>,
        );
      }

      return word;
    };

    for (let i = 0; i < wordArr.length; i++) {
      const top = `${wordArr[i].r * 36}px`;
      const left = `${wordArr[i].c * 36}px`;

      result.push(
        <div
          className="crossword-one-word"
          key={i}
          style={{ top: top, left: left }}
        >
          <div
            className={`relative-area  ${
              wordArr[i].d === 1 ? "across" : "down"
            }`}
          >
            <i
              className={`hint-dot ${wordArr[i].d === 1 ? "across" : "down"}`}
            ></i>
            {addSpace(i)}
          </div>
        </div>,
      );
    }
    return result;
  };

  return (
    <div className="crossword-container">
      <BackBtn setStep={setStep} />
      <section className="crossword-game-section">
        <h1 className="crossword-game-title">
          <b>CROSS</b>&nbsp;WORD&nbsp;
          <img
            src={Globe}
            className="crossword-title-globe"
            alt="제목 옆 지구본"
          />
        </h1>
        <div className="crossword-game-field">{drawCrossword()}</div>
      </section>
      <section className="crossword-hint-section"></section>
    </div>
  );
}
