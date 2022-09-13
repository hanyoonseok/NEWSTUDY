import React from "react";
import { useState } from "react";
import "./style.scss";
import ArticleInside from "components/ArticleInside";
import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "https://cdn.skypack.dev/react-icons/ti";
import ArticleOutside from "components/ArticleOutside";

const MAX_VISIBILITY = 3;

function SectionTitle({ sectionTitle }) {
  const { blueTitle, blackTitle, desc } = sectionTitle;
  return (
    <div className="section">
      <h1 className="section-title">
        <span className="text-spotlight">{blueTitle}</span> {blackTitle}
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

function KeywordRanking({ keyword }) {
  const { word, rank, rankChange } = keyword;
  return (
    <>
      <div className="key-ranking">
        <div className="rank">{rank}</div>
        <div className="rank-content">
          <div className="keyword">{word}</div>
          <div
            className="rank-change"
            style={{
              "--color": rankChange >= 0 ? "#88C848" : "#FF7777",
            }}
          >
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
  console.log("count", count);
  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>
          <TiChevronLeftOutline />
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
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
}

function Landing() {
  const fitArticles = [
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
            {fitArticles.map((fitArticle, index) => (
              <ArticleInside Article={fitArticle} key={index}></ArticleInside>
            ))}
          </UserfitArticle>
        </div>
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
            <span className="article-category">SPORTS</span>
          </div>
          <div className="hottopic-right">
            <ArticleOutside Article={fitArticles[0]}></ArticleOutside>
            <ArticleOutside Article={fitArticles[1]}></ArticleOutside>
            <ArticleOutside Article={fitArticles[2]}></ArticleOutside>
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
          <div className="daily-right">ss</div>
        </div>
      </section>
    </div>
  );
}
export default Landing;
