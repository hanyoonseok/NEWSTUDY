import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import React, { useState, useCallback } from "react";

import "./style.scss";
import LevelContainer from "./LevelContainer";
import Filter from "components/Filter";
import NewsCard from "components/NewsCard";

export default function NewsList() {
  const [selectedLevel, setSelectedLevel] = useState("A1");

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const news = {
    img: "",
    title:
      "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
    body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
    date: "Wed, September 7, 2022",
    category: "SPORTS",
    level: "c",
  };

  const newses = [
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "A1",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the diffiA1ulty An Overseas news story that fits the diffiA1ulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "A1",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "B2",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "B2",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "C1",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "C1",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "A2",
    },
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "A2",
    },
  ];

  const onLevelClick = useCallback(
    (lv) => () => {
      if (lv === selectedLevel) return;
      setSelectedLevel(lv);
    },
    [selectedLevel],
  );

  return (
    <section className="newslist-container">
      {isMobile && (
        <div className="mobile-level-title">
          <h1 className="LEVEL-title">LEVEL</h1>
          <Filter />
        </div>
      )}
      <LevelContainer
        isMobile={isMobile}
        onLevelClick={onLevelClick}
        selectedLevel={selectedLevel}
      />
      <article className="newslist-body-container">
        <div className="newslist-top-area">
          <h3 className="hottest-article-depth">
            A1 Level <b>&gt;</b> SPORTS <b>&gt;</b> LOL
          </h3>
          {!isMobile && <Filter />}
        </div>
        <div className="newslist-mid-area">
          <div className="hottest-article">
            <i
              className={`hottest-article-level ${
                news.level.includes("A")
                  ? "Alv"
                  : news.level.includes("B")
                  ? "Blv"
                  : "Clv"
              }`}
            >
              {news.level}
            </i>
            {isMobile && (
              <div className="hottest-article-category mobile">
                <FontAwesomeIcon icon={faCircle} />
                {news.category}
              </div>
            )}
            <span className="hottest-article-img">d</span>
            <h1 className="hottest-article-title">{news.title}</h1>
            {!isMobile && (
              <div className="hottest-article-footer">
                <div className="hottest-article-category">
                  <FontAwesomeIcon icon={faCircle} />
                  {news.category}
                </div>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="hottest-article-bookmark"
                />
              </div>
            )}
          </div>
          {!isMobile && (
            <div className="sub-article-container">
              <NewsCard news={news} />
              <NewsCard news={news} />
            </div>
          )}
        </div>
        <div className="newslist-bot-area">
          {newses.map((e, i) => (
            <NewsCard news={e} stretch={!isMobile} key={i} />
          ))}
        </div>
        <div className="newslist-morebtn-container">
          <button className="newslist-morebtn">더보기</button>
        </div>
      </article>
    </section>
  );
}
