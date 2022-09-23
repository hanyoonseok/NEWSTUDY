import { useMediaQuery } from "react-responsive";
import React from "react";

import "pages/Onboarding/Page4/style.scss";
import LevelProgress from "assets/level-progress.png";
import LevelProgressMobile from "assets/level-progress-mobile.png";

export default function Page4() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  return (
    <div className="page4-div">
      <div className="contents-div">
        <h1 className="title-h1">
          사용자별 <b>난이도</b>에 맞는 <br /> 기사를 제공합니다.
        </h1>
        <h3 className="subtit-h3">
          유럽연합 공통언어 표준등급(CEFR)에 맞춘.
          <br />
          난이도에 맞게 제공되는 영어 기사를 학습해보세요!
        </h3>
        {isMobile ? (
          <img src={LevelProgressMobile} alt="" className="progress-img" />
        ) : (
          <img src={LevelProgress} alt="" className="progress-img" />
        )}
        <div className="progress-desc">
          <article className="desc">
            A1-A2 단계는 EF-SET 1~40까지의 <br />
            기초 단어입니다
          </article>
          <article className="desc">
            B1-B2 단계는 EF-SET 41~60까지의 <br />
            중급 단어입니다
          </article>
          <article className="desc">
            C1-C2 단계는 EF-SET 61~100까지의 <br />
            고급 단어입니다
          </article>
        </div>
      </div>
    </div>
  );
}
