import React from "react";
import { useState } from "react";
import "./style.scss";
import ArticleInside from "components/ArticleInside";

import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "https://cdn.skypack.dev/react-icons/ti";

const MAX_VISIBILITY = 3;
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
        <h1 className="section-title">
          USER <span className="text-spotlight">FIT</span> NEWS
        </h1>
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
        <h1 className="section-title">
          <span className="text-spotlight">HOT</span> TOPIC
        </h1>
        <div className="hottopic-articles">
          <div className="hottopic-left"></div>
          <div className="hottopic-right"></div>
        </div>
      </section>
    </div>
  );
}
export default Landing;
