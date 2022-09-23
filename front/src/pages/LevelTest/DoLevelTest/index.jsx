import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircle,
  faSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
function DoLevelTest({ getResult }) {
  const leveltestWord = [
    { id: 0, data: "word" },
    { id: 1, data: "word" },
    { id: 2, data: "word" },
    { id: 3, data: "word" },
    { id: 4, data: "word" },
    { id: 5, data: "word" },
    { id: 6, data: "word" },
    { id: 7, data: "word" },
    { id: 8, data: "word" },
    { id: 9, data: "word" },
    { id: 10, data: "word" },
    { id: 11, data: "word" },
    { id: 12, data: "word" },
    { id: 13, data: "word" },
    { id: 14, data: "word" },
    { id: 15, data: "word" },
    { id: 16, data: "word" },
    { id: 17, data: "subin" },
    { id: 18, data: "word" },
    { id: 19, data: "word" },
    { id: 20, data: "word" },
    { id: 21, data: "subin" },
    { id: 22, data: "word" },
    { id: 23, data: "word" },
    { id: 24, data: "word" },
    { id: 25, data: "word" },
    { id: 26, data: "subin" },
    { id: 27, data: "subin" },
    { id: 28, data: "word" },
    { id: 29, data: "word" },
  ];
  const [pageState, setPageState] = useState(0);

  const wordPage = {
    0: [...leveltestWord].splice(0, 15),
    1: [...leveltestWord].splice(15, 15),
  };

  const showResult = () => {
    getResult(true);
  };

  const [checkedList, setCheckedList] = useState([]);
  const addCheckList = (checked, id) => {
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
  };
  useEffect(() => {
    console.log("예");
  }, []);
  return (
    <>
      <div className="test-wrapper">
        <div className="word-wrapper">
          {wordPage[pageState].map((word, index) => (
            <label className="word" key={`${index + pageState * 15}`}>
              <input
                type="checkbox"
                name={index}
                checked={checkedList.includes(word.id) ? true : false}
                onChange={(e) => addCheckList(e.target.checked, word.id)}
              />
              <i>
                <FontAwesomeIcon icon={faSquare} className="check-icon" />
                <span className="test-word">{word.data}</span>
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
          <button className="submit-btn" onClick={showResult}>
            제출
            <i>
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          </button>
        </div>
      )}
    </>
  );
}

export default DoLevelTest;
