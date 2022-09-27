import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./style.scss";
import BackBtn from "components/BackBtn";
import Check from "assets/check.png";
import Question from "./Question";
import Result from "./Result";

export default function SpeedQuiz() {
  const [index, setIndedx] = useState(0);
  const [timer, setTimer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const addValueToAnswer = () => {
    initDomElement();
    if (index >= 0) {
      let curAnswer = "";
      document.querySelectorAll(".question-input").forEach((e) => {
        e.value === "" ? (curAnswer += " ") : (curAnswer += e.value);
        e.value = "";
      });

      setAnswer([
        ...answer,
        {
          ...questions[index],
          user: curAnswer,
          correct:
            curAnswer.toUpperCase() === questions[index].answer.toUpperCase()
              ? true
              : false,
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const questionResponse = await axios.get("/word/game", {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      console.log(questionResponse);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    if (index >= 10) return;
    setTimer(
      setTimeout(() => {
        if (index >= 10) return;
        addValueToAnswer();
        setIndedx((prev) => prev + 1);
      }, 10000),
    );

    return () => clearTimeout(timer);
  }, [index]);

  const initDomElement = () => {
    document.querySelector(".question-timer-container").replaceChildren();
    document.querySelector(".question-kor-trans").style.display = "none";
  };

  const onNextClick = () => {
    addValueToAnswer();
    setIndedx((prev) => prev + 1);
  };

  return (
    <div className="speedquiz-container">
      <BackBtn />
      {/* {index < 10 ? (
        <section className="speedquiz-content-container">
          <h1 className="speedquiz-title">
            <b>SPEED</b> QUIZ
          </h1>
          <h3 className="speedquiz-subtitle">
            단어의 뜻을 보고, 정확한 단어의 스펠링을 작성해주세요! &nbsp;{" "}
            <img
              src={Check}
              alt="체크모양 이미지"
              className="speedquiz-subtitle-checkimg"
            />
          </h3>

          <Question
            question={questions[index]}
            index={index + 1}
            onNextClick={onNextClick}
            initDomElement={initDomElement}
          />
        </section>
      ) : (
        <Result answer={answer} />
      )} */}
    </div>
  );
}
