import React from "react";

import "./style.scss";
import Globe from "assets/user_globe.png";

export default function MyCrossWord({ maxR, maxC }) {
  const drawMyCrossword = () => {
    const result = [];
    const crosswordInputs = document.querySelectorAll(".crossword-input");
    const crosswordsPos = new Array(maxR);
    const matchingAlgorithm = {};
    const wordSet = new Set();

    for (let i = 0; i < maxR; i++) crosswordsPos[i] = [];

    crosswordInputs.forEach((e) => {
      const wordSplit = e.dataset.word.split(" ");
      wordSet.add(wordSplit.length > 1 ? wordSplit[1] : wordSplit[0]);
      crosswordsPos[parseInt(e.dataset.row)].push(e);
    });

    wordSet.forEach((e) => (matchingAlgorithm[e] = 0));

    const makeMyCol = (row) => {
      const columns = [];

      for (let i = 0; i < maxC; i++) {
        let innerText = "";
        const curRowPos = crosswordsPos[row];

        //row행에 있는 input들 다 조회
        for (let j = 0; j < curRowPos.length; j++) {
          if (parseInt(curRowPos[j].dataset.col) === i) {
            innerText = curRowPos[j].value === "" ? " " : curRowPos[j].value;

            const curWord = curRowPos[j].dataset.word.split(" "); //row행 j열의 input의 data-word

            for (let k = 0; k < curWord.length; k++) {
              if (
                curWord[k].charAt(matchingAlgorithm[curWord[k]]) !==
                curRowPos[j].value
              ) {
                innerText += " wrong";
              }
              matchingAlgorithm[curWord[k]]++;
            }
          }
        }

        columns.push(
          <div
            className={`mycrossword-col ${
              innerText === "" || innerText === " wrong" ? "" : "value"
            } ${
              innerText.split(" ").length > 1 ? innerText.split(" ")[1] : ""
            }`}
            key={i}
          >
            {innerText.split(" ")[0]}
          </div>,
        );
      }

      return columns;
    };

    for (let i = 0; i < maxR; i++) {
      result.push(
        <div className="mycrossword-row" key={i}>
          {makeMyCol(i)}
        </div>,
      );
    }

    return result;
  };

  return (
    <section className="crossword-game-section">
      <h1 className="crossword-game-title">
        MINE &nbsp;
        <img
          src={Globe}
          className="crossword-title-globe"
          alt="제목 옆 지구본"
        />
      </h1>
      <div className="crossword-game-field">{drawMyCrossword()}</div>
    </section>
  );
}
