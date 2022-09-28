import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { faPlay, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

function BeforeLevelTest({ getLeveltestState }) {
  const user = useSelector((state) => state.user.currentUser);

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  // 내 레벨 id값
  const [myLevelId, setMyLevelId] = useState(0);
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const [arrowPos, setArrowPos] = useState("0px");
  const [arrowPosMobile, setArrowPosMobile] = useState("0px");
  const [activeLevelId, setActvieLevelId] = useState(0);
  const [activeHoverlId, setActiveHoverlId] = useState(0);
  const [arrowColor, setArrowColor] = useState("#D9FEBA");
  const containerRef = useRef();
  const imgRef = [];
  imgRef[0] = useRef();
  imgRef[1] = useRef();
  imgRef[2] = useRef();
  imgRef[3] = useRef();
  imgRef[4] = useRef();
  imgRef[5] = useRef();

  useEffect(() => {
    setMyLevelId(user.level - 1);
    return () => {};
  }, []);

  useEffect(() => {
    changePosArrow(myLevelId, "click");
    return () => {};
  }, [myLevelId]);

  const levelDesc = {
    1: <div>A1-A2레벨은 EF-SET 1~40까지의 기초 단어 수준의 레벨입니다.</div>,
    3: <div>B1~B2레벨은 EF-SET 41~60까지의 중급 단어 수준의 레벨입니다.</div>,
    5: <div>C1~C2레벨은 EF-SET 61~100까지의 고급 단어 수준의 레벨입니다.</div>,
  };

  const changePosArrow = (pos, e) => {
    setActiveHoverlId(pos);
    if (e === "click") {
      setActvieLevelId(pos);
    }
    const rect = imgRef[pos].current.getBoundingClientRect();
    const conRect = containerRef.current.getBoundingClientRect();
    if (isMobile) {
      setArrowPosMobile(`${conRect.top - rect.top - rect.height / 2}px`);
    } else {
      setArrowPos(`${rect.left - conRect.left + rect.width / 2}px`);
    }
    const lv = levels[pos];
    if (lv === "A1" || lv === "A2") setArrowColor("#D9FEBA");
    if (lv === "B1" || lv === "B2") setArrowColor("#96B2FF");
    if (lv === "C1" || lv === "C2") setArrowColor("#DCBCFF");
  };

  const goLeveltest = () => {
    getLeveltestState(1);
  };

  return (
    <>
      <div className="before-leveltest-wrapper">
        <div className="level-container">
          <div className="levels" ref={containerRef}>
            {isMobile ? (
              <>
                <div
                  className="levelImg-container"
                  onClick={() => changePosArrow(0, "click")}
                >
                  <div
                    className={
                      activeLevelId === 0 || activeLevelId === 1
                        ? "level-img active"
                        : "level-img"
                    }
                  >
                    <img
                      ref={imgRef[0]}
                      src={require(`assets/level_A1.png`)}
                      alt={`level-A1`}
                    ></img>
                    <img
                      ref={imgRef[1]}
                      src={require(`assets/level_A2.png`)}
                      alt={`level-A2`}
                    ></img>
                  </div>
                </div>
                <div
                  className="levelImg-container"
                  onClick={() => changePosArrow(2, "click")}
                >
                  <div
                    className={
                      activeLevelId === 2 || activeLevelId === 3
                        ? "level-img active"
                        : "level-img"
                    }
                  >
                    <img
                      ref={imgRef[2]}
                      src={require(`assets/level_B1.png`)}
                      alt={`level-B1`}
                    ></img>
                    <img
                      ref={imgRef[3]}
                      src={require(`assets/level_B2.png`)}
                      alt={`level-B2`}
                    ></img>
                  </div>
                </div>
                <div
                  className="levelImg-container"
                  onClick={() => changePosArrow(4, "click")}
                >
                  <div
                    className={
                      activeLevelId === 4 || activeLevelId === 5
                        ? "level-img active"
                        : "level-img"
                    }
                  >
                    <img
                      ref={imgRef[4]}
                      src={require(`assets/level_C1.png`)}
                      alt={`level-A1`}
                    ></img>
                    <img
                      ref={imgRef[5]}
                      src={require(`assets/level_C2.png`)}
                      alt={`level-C2`}
                    ></img>
                  </div>
                </div>
              </>
            ) : (
              <>
                {levels.map((level, index) => (
                  <div
                    className="level-img"
                    key={index}
                    onMouseOver={() => changePosArrow(index, "hover")}
                    onMouseOut={() => changePosArrow(activeLevelId, "out")}
                    onClick={() => changePosArrow(index, "click")}
                  >
                    <img
                      ref={imgRef[index]}
                      src={require(`assets/level_${level}.png`)}
                      className={activeLevelId === index ? "active" : ""}
                      alt={`level-${level}`}
                    ></img>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="arrow-active">
            {isMobile ? (
              <>
                <i>
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{
                      "--positionM": arrowPosMobile,
                      "--color": arrowColor,
                    }}
                    className="icon-triangle-mobile "
                  />
                </i>
              </>
            ) : (
              <>
                <i>
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ "--position": arrowPos, "--color": arrowColor }}
                    className="icon-triangle "
                  />
                </i>
              </>
            )}
            <div className="arrow-bar"></div>
          </div>
        </div>
      </div>

      <div className="level-desc">
        <img
          className="question-img"
          src={require("assets/circle-question.png")}
          alt="check"
        ></img>
        {activeHoverlId === myLevelId && (
          <span className="mylevel">[나의 레벨] &nbsp;</span>
        )}
        {activeHoverlId % 2 === 1
          ? levelDesc[activeHoverlId]
          : levelDesc[activeHoverlId + 1]}
      </div>
      <div className="start-leveltest-wrapper">
        <button className="start-leveltest" onClick={goLeveltest}>
          레벨테스트 시작하기
          <span>&nbsp;Go!</span>
          <i>
            <FontAwesomeIcon icon={faAnglesRight} />
          </i>
        </button>
      </div>
    </>
  );
}

export default BeforeLevelTest;
