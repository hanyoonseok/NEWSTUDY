import "./style.scss";
import Dailyword from "assets/dailyword.jpg";
import React from "react";

export default function Page3({ activePage }) {
  return (
    <div className="page-color-div">
      <div className="contents-div">
        <h1 className={`title-h1 ${activePage && "slidein-up"}`}>
          데일리 콘텐츠를 통해
          <br /> <b>오늘의 단어</b>를 공부할 수 있습니다.
        </h1>
        <h3 className={`subdescription-h3 ${activePage && "slidein-right "}`}>
          매일 게시되는 기사들에서 나오는 <br /> 빈출 단어들을 외워보아요.
        </h3>
        <h3 className={`subdescription-h3 ${activePage && "slidein-right "}`}>
          나만의 단어장을 만들어 <br /> 매일 매일 학습해보세요.
        </h3>
      </div>
      <img src={Dailyword} alt="" className="dailyword-img" />
    </div>
  );
}
