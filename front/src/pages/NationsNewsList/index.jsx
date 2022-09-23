import React, { useCallback, useState, useEffect } from "react";

import "./style.scss";
import NewsCard from "components/NewsCard";
import Filter from "components/Filter";
import FilterModal from "components/FilterModal";
import Kor from "assets/kor.jpg";

import Globe from "./Globe";

export default function NationsNewsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [receiveIdx, setReceiveIdx] = useState(0); //globe에서 마커 클릭했을 때 클릭한 나라 id 값 받을 변수

  useEffect(() => {
    setSelectedIdx(receiveIdx);
    return () => {};
  }, [receiveIdx]);

  const nations = [
    {
      id: 0,
      kor: "대한민국",
      city: "SOUTH KOREA",
      color: "green",
      coordinates: [37.541, 126.986],
      value: 200,
    },
    {
      id: 1,
      kor: "일본",
      city: "JAPAN",
      color: "blue",
      coordinates: [35.6894, 139.692],
      value: 50,
    },
    {
      id: 2,
      kor: "싱가포르",
      city: "Singapore",
      color: "red",
      coordinates: [1.3521, 103.8198],
      value: 50,
    },
    {
      id: 3,
      kor: "뉴욕",
      city: "New York",
      color: "blue",
      coordinates: [40.73061, -73.935242],
      value: 25,
    },
    {
      id: 4,
      kor: "샌 프란시스코",
      city: "San Francisco",
      color: "orange",
      coordinates: [37.773972, -122.431297],
      value: 35,
    },
    {
      id: 5,
      kor: "베이징",
      city: "Beijing",
      color: "gold",
      coordinates: [39.9042, 116.4074],
      value: 0,
    },
    {
      id: 6,
      kor: "런던",
      city: "London",
      color: "green",
      coordinates: [51.5074, 0.1278],
      value: 80,
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
        <Globe
          className="globe"
          markers={nations}
          selectedIdx={selectedIdx}
          setReceiveIdx={setReceiveIdx}
        ></Globe>
      </article>
      <article className="nationsnews-list-container">
        <div className="list-title-container">
          <div className="arrow-btn-wrapper" onClick={onPrevClick}>
            <button className="left-arrow-btn"></button>
          </div>
          <div className="nations-name-container">
            <h1 className="nation-eng-name">{nations[selectedIdx].city}</h1>
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
