import React, { useCallback, useEffect, useState } from "react";
import BackBtn from "components/BackBtn";
import "./style.scss";

import Check from "assets/check.png";
import Question from "./Question";

export default function SpeedQuiz() {
  const [index, setIndedx] = useState(0);
  const [timer, setTimer] = useState(null);
  const questions = [
    {
      desc: "Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "형", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "명", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "1Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
    },
    {
      desc: "2Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "3Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "4Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "5Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "6Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "7Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "8Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
    {
      desc: "9Having or showing the ability to make good judgments, based on a deep understanding and experience of life",
      translate: [
        { part: "adjective", trans: "지혜로운, 현명한, 슬기로운" },
        { part: "noun", trans: "현명함, 지혜" },
      ],
      answer: "wise",
      correct: false,
    },
  ];

  useEffect(() => {
    clearInterval(timer);
    if (index > 10) {
      return;
    }
    setTimer(
      setInterval(() => {
        if (index >= 10) return;
        document.querySelector(".timer-gauge").style.display = "none";
        document.querySelector(".timer-needle").style.display = "none";
        setIndedx((prev) => prev + 1);
      }, 10000),
    );

    return () => clearInterval(timer);
  }, [index]);

  const onNextClick = useCallback(() => {
    if (index < 10) {
      document.querySelector(".timer-gauge").style.display = "none";
      document.querySelector(".timer-needle").style.display = "none";
      setIndedx((prev) => prev + 1);
    }
    clearInterval(timer);
  }, [index]);

  return (
    <div className="speedquiz-container">
      <BackBtn />
      {index < 10 && (
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
            timer={timer}
          />
        </section>
      )}
    </div>
  );
}
