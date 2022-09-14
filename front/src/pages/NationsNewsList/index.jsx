import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import NewsCard from "components/NewsCard";
import Filter from "components/Filter";
import FilterModal from "components/FilterModal";
import Temp from "assets/temp.jpg";
import Kor from "assets/kor.jpg";
import TrendDesign from "assets/trend-circle-design.png";

export default function NationsNewsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const nations = [
    {
      eng: "SOUTH KOREA",
      kor: "대한민국",
    },
    {
      eng: "JAPAN",
      kor: "일본",
    },
    {
      eng: "SINGAPORE",
      kor: "싱가포르",
    },
    {
      eng: "UNITEDSTATE KINGDOM",
      kor: "영국",
    },
    {
      eng: "TAIWAN",
      kor: "대만",
    },
  ];

  let news = [
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
  ];

  const onPrevClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === 0 ? nations.length - 1 : prev - 1));
  }, []);

  const onNextClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === nations.length - 1 ? 0 : prev + 1));
  }, []);

  const onFilterClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onCloseClick = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section className="nationsnews-container">
      <article className="nationsnews-globe-container">
        <img src={Temp} alt="" className="globe-img" />
        <div className="nation-info-card">
          <img src={Kor} alt="" className="nation-info-flag" />
          <h1 className="nation-info-name">SOUTH KOREA, 대한민국</h1>
          <div className="nation-info-taglist">
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
          </div>
          <div className="nation-info-trendlist">
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="nationsnews-list-container">
        <div className="list-title-container">
          <div className="arrow-btn-wrapper" onClick={onPrevClick}>
            <button className="left-arrow-btn"></button>
          </div>
          <div className="nations-name-container">
            <h1 className="nation-eng-name">{nations[selectedIdx].eng}</h1>
            <h4 className="nation-kor-name">{nations[selectedIdx].kor}</h4>
          </div>
          <div className="arrow-btn-wrapper" onClick={onNextClick}>
            <button className="right-arrow-btn"></button>
          </div>
        </div>
        <div className="filter-container">
          <Filter clickHandler={onFilterClick} />
        </div>
        <div className="nationsnews-list">
          {news.map((e, i) => {
            return <NewsCard news={e} key={i} />;
          })}
        </div>
      </article>
      {isModalOpen && <FilterModal closeHandler={onCloseClick} />}
    </section>
  );
}
