import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Mypage() {
  const user = {
    name: "김싸피",
    email: "kimssafy@ssafy.com",
  };

  const articles = [
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
  ];

  const file = (url) => {
    return 'require("' + url + '")';
  };

  const vocas = [
    {
      word: "Subini",
      mean: "수콩수콩수콩수콩",
      part: 0,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 1,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 2,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 3,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 1,
    },
  ];

  const badges = [
    { isAcheive: true },
    { isAcheive: true },
    { isAcheive: true },
  ];

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: articles.length,
    },
    {
      title: "내 단어",
      count: vocas.length,
    },
    {
      title: "내 뱃지",
      count: badges.length,
    },
  ];

  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: (
      <div className="article-box">
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <span>{article.level}</span>
            <div className="img-box">
              <img src={require("assets/test.png")} alt="기사 이미지"></img>
            </div>
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    ),
    1: (
      <div className="voca-box">
        {vocas.map((voca, index) => (
          <div className="voca" key={index}>
            <div className="word">
              {voca.word}
              {voca.part === 0 && <p className="blue">형</p>}
              {voca.part === 1 && <p className="orange">명</p>}
              {voca.part === 2 && <p className="pink">부</p>}
              {voca.part === 3 && <p className="green">동</p>}
            </div>
            <div className="mean">{voca.mean}</div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="mypage">
      <div className="top-box">
        <div className="badge">
          <img
            src={require("assets/user_globe.png")}
            alt="사용자 프로필 지구본"
          ></img>
          <p>뱃지변경</p>
        </div>
        <div className="info-box">
          <p className="name">{user.name}</p>
          <p className="email">
            <FontAwesomeIcon icon={faEnvelope} /> {user.email}
          </p>
        </div>
      </div>
      <div className="bottom-box">
        <div className="left-box">
          <div className="current">
            {myRecord.map((item, index) => (
              <div key={index}>
                <FontAwesomeIcon icon={faThumbTack} />
                <p>{item.title}</p>
                <p>{item.count}개</p>
              </div>
            ))}
          </div>
          <div className="interest">dd</div>
        </div>
        <div className="right-box">
          <div className="tab">
            <button
              className={`${activeId === 0 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(0)}
            >
              MY ARTICLE
            </button>
            <button
              className={`${activeId === 1 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(1)}
            >
              MY VOCA
            </button>
          </div>
          <div className="content">{tabContent[activeId]}</div>
        </div>
      </div>
    </div>
  );
}
