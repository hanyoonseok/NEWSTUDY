import { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircle,
  faSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
function LevelTest(props) {
  const leveltestWord = [
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "word",
    "subin",
    "subin",
    "word",
    "subin",
    "subin",
    "word",
    "subin",
    "word",
    "subin",
    "subin",
    "word",
    "word",
  ];
  const [pageState, setPageState] = useState(0);

  const wordPage = {
    0: [...leveltestWord].splice(0, 15),
    1: [...leveltestWord].splice(15, 15),
  };
  return (
    <div className="leveltest-wrapper">
      <div className="leveltest-info">
        <h1>
          <span className="text-spotlight">LEVEL</span> TEST
        </h1>
        <div className="leveltest-desc">
          알고있는 단어를 체크해주세요!
          <img
            className="check-img"
            src={require("assets/check.png")}
            alt="check"
          ></img>
        </div>
      </div>
      <div className="test-wrapper">
        <div className="word-wrapper">
          {wordPage[pageState].map((word, index) => (
            <label className="word" key={`${index + pageState * 15}`}>
              <input type="checkbox" name={index} />
              <i>
                <FontAwesomeIcon icon={faSquare} className="check-icon" />
                <span className="test-word">{word}</span>
              </i>
            </label>
          ))}
        </div>
        <div className="page-wrapper">
          <div className={`${pageState === 0 ? "pagedot active" : "pagedot"}`}>
            <i onClick={() => setPageState(0)}>
              <FontAwesomeIcon icon={faCircle} />
            </i>
          </div>
          <div className={`${pageState === 1 ? "pagedot active" : "pagedot"}`}>
            <i onClick={() => setPageState(1)}>
              <FontAwesomeIcon icon={faCircle} />
            </i>
          </div>
        </div>
      </div>
      {pageState === 0 && (
        <div className="next-btn">
          <i onClick={() => setPageState(1)}>
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </i>
        </div>
      )}
      {pageState === 1 && (
        <div className="submit-container">
          <div className="prev-btn">
            <i onClick={() => setPageState(0)}>
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </i>
          </div>
          <button className="submit-btn">
            제출
            <i>
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          </button>
        </div>
      )}
    </div>
  );
}

export default LevelTest;
