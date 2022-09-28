import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

import DoLevelTest from "./DoLevelTest";
import BeforeLevelTest from "./BeforeLevelTest";

function LevelTest() {
  const user = useSelector((state) => state.user.currentUser);

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const [levelTestState, setLevelTestState] = useState(0);
  const levelTestDesc = [
    "레벨테스트는 유저의 레벨에 맞는 다양한 기사들을 보여주기 위한 과정입니다.",
    "알고있는 단어를 체크해주세요!",
  ];
  const [levelAvg, setLevelAvg] = useState(0);
  const [levelBadge, setLevelBadge] = useState(false);

  const getLeveltestState = (stateNum) => {
    setLevelTestState(stateNum);
  };

  const [activeResult, setActiveResult] = useState(false);
  const getResult = (isShowResult) => {
    setActiveResult(isShowResult);
  };

  const levelArray = [null, "A1", "A2", "B1", "B2", "C1", "C2"];
  return (
    <div className="leveltest-wrapper">
      <div className="leveltest-area">
        <div className="leveltest-info">
          <h1>
            <span className="text-spotlight">LEVEL</span> TEST
          </h1>
          <div className="leveltest-desc">
            {levelTestState === 0
              ? !isMobile && levelTestDesc[0]
              : levelTestDesc[1]}
            {levelTestState === 0 && !isMobile && (
              <img
                className="check-img"
                src={require("assets/check.png")}
                alt="check"
              ></img>
            )}
          </div>
        </div>
        {levelTestState === 0 ? (
          <BeforeLevelTest getLeveltestState={getLeveltestState} />
        ) : (
          <DoLevelTest
            getResult={getResult}
            user={user}
            setLevelAvg={setLevelAvg}
          />
        )}
        {activeResult && (
          <div className="result-notice-back">
            {/*onClick={() => getResult(false)} 이거는 끄면 안되겠지?*/}
            <div className="result-notice-wrapper">
              <div className="level-img">
                <img
                  src={require(`assets/level_${levelArray[levelAvg]}.png`)}
                  alt="check"
                ></img>
              </div>
              <div className="result-word">레벨테스트 결과, </div>
              <div className="result-desc">
                {user.nickname}님은 &nbsp;
                <span className="text-spotlight">
                  {levelArray[levelAvg]}등급
                </span>
                입니다!
              </div>

              <Link to="/landing">
                <button className="result-check">
                  확인
                  <i>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </i>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LevelTest;
