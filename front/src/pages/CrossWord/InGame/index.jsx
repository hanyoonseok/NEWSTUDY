import React from "react";
import { useCallback } from "react";
import { useMediaQuery } from "react-responsive";

import "./style.scss";
import BackBtn from "components/BackBtn";
import Globe from "assets/user_globe.png";

export default function InGame({ maxR, maxC, wordArr, setInGame }) {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const onInputFocus = useCallback((e) => {
    const words = e.target.dataset.word.split(" ");
    const word = words.length > 1 ? words[1] : words[0];
    const dir = e.target.dataset.dir;

    focusOutActive(false);
    highlightInput(word, dir);
    highlightHint(word);
  }, []);

  const highlightInput = (word, dir) => {
    const resultArr = [];
    const inputArr = document.querySelectorAll(`[data-word]`);

    inputArr.forEach((el) => {
      el.className = "crossword-input";
      if (el.dataset.word === word) resultArr.push(el);
      else if (el.dataset.word.indexOf(word) >= 0) resultArr.push(el);
    });

    resultArr.forEach((el) => {
      parseInt(dir) === 1
        ? (el.className += " across")
        : (el.className += " down");
    });
  };

  const highlightHint = (word) => {
    const hintCard = document.querySelector(`[data-hint=${word}]`);
    isMobile
      ? (hintCard.style.display = "flex")
      : (hintCard.className += " active");
  };

  const drawCrossword = () => {
    const result = [];

    const makeCol = (
      row,
      activePos,
      activeDirPos,
      dotPos,
      dotDirPos,
      wordPos,
    ) => {
      const columns = [];

      for (let i = 0; i < maxC; i++) {
        const dotArr = [];
        const isIncluded = activePos.includes(i);

        for (let j = 0; j < dotPos.length; j++)
          if (dotPos[j] === i) dotArr.push(j);

        columns.push(
          <div
            className={"crossword-col"}
            key={i}
            onClick={() => focusOutActive(isIncluded)}
          >
            {isIncluded && (
              <input
                type="text"
                className="crossword-input"
                maxLength={1}
                data-row={row}
                data-col={i}
                data-dir={activeDirPos[i]}
                data-word={wordPos[i]}
                onFocus={onInputFocus}
              />
            )}
            {dotArr.map((e, j) =>
              dotDirPos[e] > 0 ? (
                <i className="hint-dot across" key={j}></i>
              ) : (
                <i className="hint-dot down" key={j}></i>
              ),
            )}
          </div>,
        );
      }
      return columns;
    };

    for (let i = 0; i < maxR; i++) {
      const activePos = [];
      const activeDirPos = new Array(maxC);
      const dotPos = [];
      const dotDirPos = [];
      const wordPos = {};

      for (let j = 0; j < maxC; j++) activeDirPos[j] = 0;

      wordArr.forEach((e) => {
        if (e.d === 1) {
          if (e.r === i) {
            for (let j = 0; j < e.name.length; j++) {
              if (j === 0) {
                dotPos.push(e.c);
                dotDirPos.push(1);
              }
              activePos.push(e.c + j);
              if (wordPos[e.c + j]) wordPos[e.c + j] += ` ${e.name}`;
              else wordPos[e.c + j] = e.name;

              activeDirPos[e.c + j] = 1;
            }
          }
        } else {
          if (i >= e.r && i < e.r + e.name.length) {
            if (i === e.r) {
              dotPos.push(e.c);
              dotDirPos.push(-1);
            }
            activePos.push(e.c);

            if (wordPos[e.c]) wordPos[e.c] += ` ${e.name}`;
            else wordPos[e.c] = e.name;

            activeDirPos[e.c] = -1;
          }
        }
      });
      result.push(
        <div className="crossword-row" key={i}>
          {makeCol(i, activePos, activeDirPos, dotPos, dotDirPos, wordPos)}
        </div>,
      );
    }

    if (!result || result.length === 0) return;

    return result;
  };

  const focusOutActive = useCallback((isIncluded) => {
    if (isIncluded) return;

    document.querySelectorAll(`[data-word]`).forEach((el) => {
      el.className = "crossword-input";
    });

    document.querySelectorAll(`[data-hint]`).forEach((el) => {
      isMobile
        ? (el.style.display = "none")
        : (el.className = el.className.slice(0, 13));
    });
  }, []);

  const onHintClick = useCallback(
    (hint, dir) => {
      focusOutActive(false);
      highlightInput(hint, dir);
      highlightHint(hint);
    },
    [focusOutActive],
  );

  return (
    <>
      <BackBtn />
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
      <section className="crossword-hint-section">
        <article className="crossword-hint-article">
          <h1 className="hint-article-title">ROW</h1>
          <div className="hint-article-list">
            {wordArr
              .filter((e) => e.d === 1)
              .map((e, i) => (
                <div
                  className="hint-card row"
                  key={i}
                  data-hint={e.name}
                  onClick={() => onHintClick(e.name, 1)}
                >
                  <i className="hint-card-index">{i + 1}</i>
                  <p className="hint-card-desc">{e.hint}</p>
                </div>
              ))}
          </div>
        </article>

        <article className="crossword-hint-article">
          <h1 className="hint-article-title">COLUMN</h1>
          <div className="hint-article-list">
            {wordArr
              .filter((e) => e.d === -1)
              .map((e, i) => (
                <div
                  className="hint-card col"
                  key={i}
                  data-hint={e.name}
                  onClick={() => onHintClick(e.name, -1)}
                >
                  <i className="hint-card-index">{i + 1}</i>
                  <p className="hint-card-desc">{e.hint}</p>
                </div>
              ))}
          </div>
        </article>
        <button
          className="crossword-submit-btn"
          onClick={() => setInGame(false)}
        >
          제출하기
        </button>
      </section>
    </>
  );
}
