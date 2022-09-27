import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import moment from "moment";

import NewsCard from "components/NewsCard";
import HotNewsCard from "./HotNewsCard";
import Filter from "components/Filter";

function SearchList() {
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(false);
  const [activeEndDate, setActiveEndDate] = useState(false);
  const params = useParams();
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const onEndCalendar = () => {
    setActiveEndDate(!activeEndDate);
    setActiveStartDate(false);
  };
  const onStartCalendar = () => {
    setActiveStartDate(!activeStartDate);
    setActiveEndDate(false);
  };

  const news = [
    {
      img: "",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: "",
      title: "TI and Faker win the world championship !!",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: "",
      title: "TI and Faker win the world championship !! ",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
  ];
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
  const closeCalendar = () => {
    setActiveEndDate(false);
    setActiveStartDate(false);
  };
  useEffect(() => {
    closeCalendar();
  }, []);
  return (
    <div className="searchlist-container">
      {(activeStartDate || activeEndDate) && (
        <div className="screen" onClick={closeCalendar}></div>
      )}
      <h4>
        검색어 <b>{params.query}</b>(으)로 검색한 결과입니다.
      </h4>
      <div className="search-analysis"></div>
      <div className="search-header">
        <div className="search-toggle" key={"new"}>
          <div>최신순</div>
          <input type="checkbox" id="new" />
          <label htmlFor="new"></label>
        </div>
        <div className="search-toggle" key={"title"}>
          <div>제목</div>
          <input type="checkbox" id="title" />
          <label htmlFor="title"></label>
        </div>
        <div className="search-toggle" key={"content"}>
          <div>본문</div>
          <input type="checkbox" id="content" />
          <label htmlFor="content"></label>
        </div>
        <div className="search-dates">
          <div className="search-date">
            <div className="date-icon" onClick={onStartCalendar}>
              <i>
                <FontAwesomeIcon icon={faCalendarDays} />
              </i>
            </div>
            <div>
              <div className="date">
                {moment(startDay).format("YYYY년 MM월 DD일")}
              </div>
              <div
                className={`calendar ${activeStartDate ? "visible" : "hidden"}`}
              >
                <Calendar onChange={setStartDay} value={startDay} />
              </div>
            </div>
          </div>

          <div className="search-separator">-</div>

          <div className="search-date">
            <div className="date-icon" onClick={onEndCalendar}>
              <i>
                <FontAwesomeIcon icon={faCalendarDays} />
              </i>
            </div>
            <div className="date">
              {moment(endDay).format("YYYY년 MM월 DD일")}
            </div>

            <div className={`calendar ${activeEndDate ? "visible" : "hidden"}`}>
              <Calendar onChange={setEndDay} value={endDay} />
            </div>
          </div>
        </div>
      </div>

      <div className="search-result">
        <span>검색 결과: {newses.length}건</span>
        <Filter />
      </div>
      <div className="search-top-news">
        {news.map((e, i) => (
          <div className="top-news" key={i}>
            <HotNewsCard
              news={news[0]}
              isMobile={isMobile}
              query={params.query}
            ></HotNewsCard>
          </div>
        ))}
      </div>
      <div className="search-newslist">
        {newses.map((e, i) => (
          <div className="news-result" key={i}>
            <NewsCard news={e} stretch={!isMobile} />
          </div>
        ))}
      </div>
      <div className="newslist-morebtn-container">
        <button className="newslist-morebtn">더보기</button>
      </div>
    </div>
  );
}

export default SearchList;
