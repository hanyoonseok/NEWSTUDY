import React, { useCallback, useEffect, useState } from "react";
import BackBtn from "components/BackBtn";
import "./style.scss";

import Check from "assets/check.png";
import Question from "./Question";
import Result from "./Result";

export default function SpeedQuiz() {
  const [index, setIndedx] = useState(0);
  const [timer, setTimer] = useState(null);
  const questions = [
    {
      desc: "Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "형", level: "A1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "명", level: "A2", trans: "현명함, 지혜" },
      ],
      index: 1,
      answer: "wise",
      correct: false,
    },
    {
      desc: "1Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 2,
      answer: "wiseman",
      correct: false,
    },
    {
      desc: "2Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 3,
      answer: "ant",
      correct: false,
    },
    {
      desc: "3Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 4,
      answer: "horsehosasd",
      correct: false,
    },
    {
      desc: "4Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 5,
      answer: "penguin",
      correct: false,
    },
    {
      desc: "5Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 6,
      answer: "newyork",
      correct: false,
    },
    {
      desc: "6Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 7,
      answer: "korea",
      correct: false,
    },
    {
      desc: "7Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 8,
      answer: "taiwan",
      correct: false,
    },
    {
      desc: "8Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 9,
      answer: "japan",
      correct: false,
    },
    {
      desc: "9Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", level: "B1", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", level: "C1", trans: "현명함, 지혜" },
      ],
      index: 10,
      answer: "china",
      correct: false,
    },
  ];

  const [answer, setAnswer] = useState([]);

  const addValueToAnswer = () => {
    initGauge();
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

  const initGauge = () => {
    document.querySelector(".timer-gauge").style.display = "none";
    document.querySelector(".timer-needle").style.display = "none";
  };

  const onNextClick = () => {
    addValueToAnswer();
    setIndedx((prev) => prev + 1);
  };

  return (
    <div className="speedquiz-container">
      <BackBtn />
      {index < 10 ? (
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
            initGauge={initGauge}
          />
        </section>
      ) : (
        <Result answer={answer} />
      )}
    </div>
  );
}
