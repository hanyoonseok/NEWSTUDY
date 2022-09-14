import React from "react";
import { useState } from "react";
import "./style.scss";
import ArticleInside from "./ArticleInside";
import ArticleOutside from "./ArticleOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleArrowUp,
  faCircleArrowDown,
  faBorderAll,
  faHandshake,
  faBaseballBatBall,
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCircleMinus,
  faFaceGrin,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
const MAX_VISIBILITY = 3;

function SectionTitle({ sectionTitle }) {
  const { blueTitle, blackTitle, desc } = sectionTitle;
  return (
    <div className="section">
      <h1 className="section-title">
        <span className="text-spotlight">{blueTitle}&nbsp; </span> {blackTitle}
      </h1>
      <div className="section-desc">
        {desc}
        <img
          className="check-img"
          src={require("assets/check.png")}
          alt="check"
        ></img>
      </div>
    </div>
  );
}

const rankingUpDown = {
  up: (
    <i>
      <FontAwesomeIcon icon={faCircleArrowUp} />
    </i>
  ),
  down: (
    <i>
      <FontAwesomeIcon icon={faCircleArrowDown} />
    </i>
  ),
  zero: (
    <i>
      <FontAwesomeIcon icon={faCircleMinus} />
    </i>
  ),
};

function KeywordRanking({ keyword }) {
  let { word, rank, rankChange } = keyword;
  var nowRankingState = "zero";
  var rankingChangeColor = "#3F414B";
  if (rankChange > 0) {
    nowRankingState = "up";
    rankingChangeColor = "#88C848";
  } else if (rankChange < 0) {
    nowRankingState = "down";
    rankingChangeColor = "#FF7777";
    rankChange *= -1;
  }
  return (
    <>
      <div className="key-ranking">
        <div className="rank">{rank}</div>
        <div className="rank-content">
          <div className="keyword">{word}</div>
          <div
            className="rank-change"
            style={{
              "--color": rankingChangeColor,
            }}
          >
            {rankingUpDown[nowRankingState]} &nbsp;
            {rankChange}
          </div>
        </div>
      </div>
    </>
  );
}

function UserfitArticle({ children }) {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>
          <i>
            <FontAwesomeIcon icon={faChevronLeft} />
          </i>
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>
          <i>
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
        </button>
      )}
    </div>
  );
}

function Landing() {
  const [activeId, setActiveId] = useState(0);
  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };
  // const [activeFitArticle, setActiveFitArticle] = useState(0);
  // const onClickSwitchFitArticle = (id) => {
  //   setActiveFitArticle(id);
  // };
  const Articles = [
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      category: "SPORTS",
      level: "C",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      category: "SPORTS",
      level: "C",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
    {
      title: `Two in flooded basement parking lot found alive`,
      content: `My name is Lee Sang-hyeok. My American fans call me “God.” My Korean fans know me as “the Unkillable Demon King.” I actually prefer God, because it feels just a little bit higher.`,
      level: "C",
      category: "SPORTS",
    },
  ];

  const sectionTitle = [
    {
      blueTitle: "USER FIT ",
      blackTitle: "NEWS",
      desc: "사용자의 관심사에 맞춘 기사입니다.",
    },
    {
      blueTitle: "HOT ",
      blackTitle: "TOPIC",
      desc: "현재 HOT TOPIC인 주제 ‘SUBINI’에 대한 기사입니다.",
    },
    {
      blueTitle: "DAILY ",
      blackTitle: "KEYWORD",
      desc: "매일 수집된 뉴스를 바탕으로 많이 언급된 키워드들을 보여줍니다.",
    },
  ];
  const keywords = [
    {
      word: "subini",
      rank: 1,
      rankChange: 0,
    },
    {
      word: "subini",
      rank: 2,
      rankChange: 0,
    },
    {
      word: "subini",
      rank: 3,
      rankChange: 2,
    },
    {
      word: "subini",
      rank: 4,
      rankChange: -2,
    },
    {
      word: "subini",
      rank: 5,
      rankChange: -2,
    },
  ];

  return (
    <div className="landing-wrapper">
      <div className="landing-header">
        {/* <div className="logo-img">
          <img src={require("assets/logo.png")} alt="article"></img>
        </div> */}
        <div>Wednesday, September 7, 2022</div>
      </div>
      {/* 사용자 맞춤 기사 */}
      <section className="userfit">
        <SectionTitle sectionTitle={sectionTitle[0]}></SectionTitle>

        <div className="userfit-articles">
          <UserfitArticle>
            {Articles.map((fitArticle, index) => (
              <ArticleInside Article={fitArticle} key={index}></ArticleInside>
            ))}
          </UserfitArticle>
        </div>
        <div className="userfit-order">1/20</div>
      </section>
      {/* 핫토픽 */}
      <section className="hottopic">
        <SectionTitle sectionTitle={sectionTitle[1]}></SectionTitle>
        <div className="hottopic-articles">
          <div className="hottopic-left">
            <div className="hottopic-img">
              <img src={require("assets/article2.png")} alt="article"></img>
              <span className="article-level">C</span>
            </div>
            <h3 className="hottopic-title">
              Two in flooded basement parking lot found aliveasdsad dasdasd
            </h3>
            <span className="article-category">
              <i>
                <FontAwesomeIcon icon={faCircle} />
              </i>
              SPORTS
            </span>
          </div>
          <div className="hottopic-right">
            <ArticleOutside Article={Articles[0]}></ArticleOutside>
            <ArticleOutside Article={Articles[1]}></ArticleOutside>
            <ArticleOutside Article={Articles[2]}></ArticleOutside>
          </div>
        </div>
      </section>
      <section className="daily-keyword">
        <SectionTitle sectionTitle={sectionTitle[2]}></SectionTitle>
        <div className="daily-wrapper">
          <div className="daily-left">
            {keywords.map((keyword, index) => (
              <KeywordRanking keyword={keyword} key={index}></KeywordRanking>
            ))}
          </div>
          <div className="daily-right">
            <div className="wordcloud-wrapper">
              <ul className="wordcloud-nav">
                <li
                  className={`${
                    activeId === 0 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(0)}
                >
                  <i>
                    <FontAwesomeIcon icon={faBorderAll} />
                  </i>
                  <span className="category-name"> &nbsp; ALL</span>
                </li>
                <li
                  className={`${
                    activeId === 1 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(1)}
                >
                  {" "}
                  <i>
                    <FontAwesomeIcon icon={faHandshake} />
                  </i>
                  <span className="category-name">&nbsp; POLITICS</span>
                </li>
                <li
                  className={`${
                    activeId === 2 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(2)}
                >
                  <i>
                    <FontAwesomeIcon icon={faSackDollar} />
                  </i>
                  <span className="category-name">&nbsp; ECONOMY</span>
                </li>
                <li
                  className={`${
                    activeId === 3 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(3)}
                >
                  <i>
                    <FontAwesomeIcon icon={faFaceGrin} />
                  </i>
                  <span className="category-name">&nbsp; ENTERTAIN</span>
                </li>
                <li
                  className={`${
                    activeId === 4 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(4)}
                >
                  <i>
                    <FontAwesomeIcon icon={faBaseballBatBall} />
                  </i>
                  <span className="category-name">&nbsp;SPORTS</span>
                </li>
              </ul>
              <div className="wordcloud"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Landing;
