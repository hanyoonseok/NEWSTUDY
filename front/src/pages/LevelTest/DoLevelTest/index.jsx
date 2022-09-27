import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircle,
  faSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeLevel } from "modules/user/user";

function DoLevelTest({ getResult, user, setLevelAvg }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState(0);
  const [leveltestWord, setLeveltestWord] = useState([]);

  const wordPage = {
    0: [...leveltestWord].splice(0, 15),
    1: [...leveltestWord].splice(15, 15),
  };

  const showResult = () => {
    getResult(true);
    console.log(checkedList);
    let sum = 0;
    let level = 0;
    checkedList.forEach((check) => {
      sum += leveltestWord[check].level;
    });
    if (sum < 6) {
      setLevelAvg(1);
      level = 1;
    } else if (sum < 16) {
      setLevelAvg(2);
      level = 2;
    } else if (sum < 32) {
      setLevelAvg(3);
      level = 3;
    } else if (sum < 53) {
      setLevelAvg(4);
      level = 4;
    } else if (sum < 79) {
      setLevelAvg(5);
      level = 5;
    } else {
      setLevelAvg(6);
      level = 6;
    }
    dispatch(changeLevel(level, userInfo));
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
    const fetchData = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const testWordsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/word/test`,
        headers,
      );
      setLeveltestWord(testWordsResponse.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="test-wrapper">
        <div className="word-wrapper">
          {leveltestWord.length > 0 &&
            wordPage[pageState].map((word, index) => (
              <label className="word" key={`${index + pageState * 15}`}>
                <input
                  type="checkbox"
                  name={index}
                  checked={
                    checkedList.includes(index + pageState * 15) ? true : false
                  }
                  onChange={(e) =>
                    addCheckList(e.target.checked, index + pageState * 15)
                  }
                />
                <i>
                  <FontAwesomeIcon icon={faSquare} className="check-icon" />
                  <span className="test-word">{word.eng}</span>
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
