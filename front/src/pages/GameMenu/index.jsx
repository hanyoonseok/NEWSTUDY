import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import Check from "assets/check.png";
import Crossword from "assets/crossword.png";
import SpeedQuiz from "assets/speedquiz.png";

export default function GameMenu() {
  return (
    <div className="game-container">
      <div className="game-menu-select-page">
        <div className="game-menu-content-container">
          <h1 className="game-menu-title">
            ENGLISH <b>&nbsp;GAME</b>
          </h1>
          <h3 className="game-menu-subtitle">
            게임을 통해 더 재미있게 공부하세요! &nbsp;
            <img
              src={Check}
              className="game-menu-check-img"
              alt="서브 타이틀 옆 체크이미지"
            />
          </h3>
          <div className="game-menu-btn-container">
            <Link to="/game/crossword" className="game-card">
              <h1 className="game-card-title">
                <b>CROSS</b>&nbsp;WORD
              </h1>
              <img
                src={Crossword}
                className="game-card-img"
                alt="낱말퍼즐 이미지"
              />
            </Link>
            <Link to="/game/speedquiz" className="game-card">
              <h1 className="game-card-title">
                <b>SPEED</b>&nbsp;QUIZ
              </h1>
              <img
                src={SpeedQuiz}
                className="game-card-img"
                alt="낱말퍼즐 이미지"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
