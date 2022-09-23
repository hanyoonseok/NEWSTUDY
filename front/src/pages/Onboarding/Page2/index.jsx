import "pages/Onboarding/Page2/style.scss";
import usa from "assets/usa.jpg";
import kor from "assets/kor.jpg";
import React from "react";

export default function Page2() {
  return (
    <div className="page-div">
      <div className="contents-div">
        <h1 className="title-h1">
          <span>
            <b>세계 각지의 뉴스</b>를{" "}
          </span>
          <br /> 한 눈에 볼 수 있습니다.
        </h1>
        <h3 className="subtitle-h3">
          소식이 궁금한 나라가 있나요? <br />
          지구 반대편에서 어떡 소식이 들려올지 궁금하신가요? <br />
          뉴스터디의 지구본을 돌려가며 나라별 소식을 확인해보세요.
        </h3>
        <div className="country-wrapper">
          <div className="country-row">
            <img className="country-img" src={usa} alt="" />
            <img className="country-img" src={kor} alt="" />
            <img className="country-img" src={usa} alt="" />
            <img className="country-img" src={kor} alt="" />
          </div>
          <div className="country-row">
            <img className="country-img" src={kor} alt="" />
            <img className="country-img" src={usa} alt="" />
            <img className="country-img" src={kor} alt="" />
            <img className="country-img" src={usa} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
