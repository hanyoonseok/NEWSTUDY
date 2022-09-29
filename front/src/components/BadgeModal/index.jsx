import React from "react";
import "./style.scss";

import Attendance1 from "assets/1attendance_badge.png";
import Attendance50 from "assets/50attendance_badge.png";
import Attendance100 from "assets/100attendance_badge.png";
import LevelA from "assets/A_level_badge.png";
import LevelB from "assets/B_level_badge.png";
import LevelC from "assets/C_level_badge.png";
import GameClear50 from "assets/50game_clear.png";
import GameClear30 from "assets/30game_clear.png";
import GameClear10 from "assets/10game_clear.png";
import NewsScrap1 from "assets/1news_scrap.png";
import NewsScrap10 from "assets/10news_scrap.png";
import NewsScrap50 from "assets/50news_scrap.png";
import MyVoca1 from "assets/1word_add.png";
import MyVoca100 from "assets/100word_add.png";
import MyVoca500 from "assets/500word_add.png";

export default function BadgeModal({ index, text, setStatus }) {
  console.log("index", index);
  console.log("text", text);
  const badgeImg = [
    null,
    Attendance1,
    Attendance50,
    Attendance100,
    LevelA,
    LevelB,
    LevelC,
    GameClear50,
    GameClear30,
    GameClear10,
    NewsScrap1,
    NewsScrap10,
    NewsScrap50,
    MyVoca1,
    MyVoca100,
    MyVoca500,
  ];

  return (
    <div className="badge-modal" onClick={() => setStatus(false)}>
      <div className="badge-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={badgeImg[index]} alt="배지 이미지"></img>
        </div>
        <div className="text-box">
          축하합니다🎉 <br />
          <span>"{text}"</span>를 획득하셨습니다!
        </div>
        <button onClick={() => setStatus(false)}>확인</button>
      </div>
    </div>
  );
}
