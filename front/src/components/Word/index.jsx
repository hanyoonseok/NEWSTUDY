import "./style.scss";
import React, { useEffect } from "react";

export default function Word({ vocas, setWordMemorizeStatus }) {
  const changeMemorizeStatus = (status) => {
    status.memorize = !status.memorize;
    setWordMemorizeStatus(true);
  };

  return (
    <div className="voca-box">
      {vocas.map((voca, index) => (
        <div className="voca" key={index}>
          <div
            onClick={() => changeMemorizeStatus(voca)}
            className={"memorize " + (voca.memorize ? "blue" : "grey")}
          ></div>
          <div className="word">{voca.word}</div>
          <div className="mean">
            {voca.part.map((item, index) => (
              <div key={index}>
                {item.id === 0 && <p className="tag blue">형</p>}
                {item.id === 1 && <p className="tag orange">명</p>}
                {item.id === 2 && <p className="tag pink">부</p>}
                {item.id === 3 && <p className="tag green">동</p>}
                <p className="kor-mean">{item.mean}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
