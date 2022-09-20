import "./style.scss";

import GameMenuBackground from "assets/game-background.png";
import Check from "assets/check.png";
import Crossword from "assets/crossword.png";

export default function GameMenu() {
  return (
    <div className="game-menu-select-page">
      <img
        src={GameMenuBackground}
        className="game-menu-background"
        alt="게임 메뉴화면의 배경"
      />
      <div className="game-menu-content-container">
        <h1 className="game-menu-title">
          ENGLISH <b>&nbsp;GAME</b>
        </h1>
        <h3 className="game-menu-subtitle">
          쉽고 재밌게 영어 공부를 할 수 있도록 제공하는 서비스입니다. &nbsp;
          <img
            src={Check}
            className="game-menu-check-img"
            alt="서브 타이틀 옆 체크이미지"
          />
        </h3>
        <div className="game-menu-btn-container">
          <div className="game-card">
            <h1 className="game-card-title">
              <b>CROSS</b>&nbsp;WORD
            </h1>
            <img
              src={Crossword}
              className="game-card-img"
              alt="낱말퍼즐 이미지"
            />
          </div>
          <div className="game-card">
            <h1 className="game-card-title">
              <b>SPEED</b>&nbsp;QUIZ
            </h1>
            <img
              src={Crossword}
              className="game-card-img"
              alt="낱말퍼즐 이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
