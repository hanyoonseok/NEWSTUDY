import React, { useEffect } from "react";
import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import ArticleInside from "./ArticleInside";
import ArticleOutside from "./ArticleOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faBorderAll,
  faHandshake,
  faBaseballBatBall,
  faChevronRight,
  faChevronLeft,
  faCircle,
  faFaceGrin,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import Wordcloud from "./WordCloud";
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

function KeywordRanking({ item, rank }) {
  return (
    <>
      <div className="key-ranking">
        <div className="rank">{rank}</div>
        <div className="rank-content">
          <div className="keyword">{item.text}</div>
          {/* 지금은 빈도수로 해놨는데 만약 관련기사 수로 할거면 나중에 추가하셍요 */}
          <div className="rank-change">{item.value}건</div>
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
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(0);
  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };
  // 데일리 빈출단어는 DB에서 한꺼번에 가져옴
  const [allRanking, setAllRanking] = useState([]);
  const [politicsRanking, setPoliticsRanking] = useState([]);
  const [economyRanking, setEconomyRanking] = useState([]);
  const [entertainRanking, setEntertainRanking] = useState([]);
  const [sportsRanking, setSportsRanking] = useState([]);
  const [userFitNews, setUserFitNews] = useState([]);
  const [hotNews, setHotNews] = useState([]);
  const [dailyWordCloud, setDailyWordCloud] = useState([]);
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
      blackTitle: "WORDCLOUD",
      desc: "매일 수집된 뉴스를 바탕으로 많이 언급된 단어들을 보여줍니다.",
    },
  ];

  const getKeywordsRanking = () => {
    // value 크기 따라 정렬
    const sortValue = (a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    };

    // 카테고리별로 구분
    const setCategory = (category) => {
      let array = [];
      wordcloud.forEach((word) => {
        if (word.category === category) {
          let temp = {
            text: word.text,
            value: word.value,
          };
          array.push(temp);
        }
      });
      return array.sort(sortValue);
    };

    const wordcloud = [
      {
        text: "all",
        category: "politics",
        value: 64,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "politics",
        value: 16,
      },
      {
        text: "bad",
        category: "politics",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 30,
      },
      {
        text: "DaBin",
        category: "economy",
        value: 50,
      },
      {
        text: "thought",
        category: "economy",
        value: 16,
      },
      {
        text: "bad",
        category: "economy",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "economy",
        value: 30,
      },
      {
        text: "DaBin",
        category: "economy",
        value: 60,
      },
      {
        text: "thought",
        category: "economy",
        value: 6,
      },
      {
        text: "bad",
        category: "economy",
        value: 19,
      },
      {
        text: "HwaYeon",
        category: "economy",
        value: 25,
      },
      {
        text: "DaBin",
        category: "entertain",
        value: 54,
      },
      {
        text: "thought",
        category: "entertain",
        value: 100,
      },
      {
        text: "bad",
        category: "entertain",
        value: 90,
      },
      {
        text: "HwaYeon",
        category: "entertain",
        value: 30,
      },
      {
        text: "DaBin",
        category: "entertain",
        value: 50,
      },
      {
        text: "thought",
        category: "entertain",
        value: 40,
      },
      {
        text: "bad",
        category: "entertain",
        value: 10,
      },

      {
        text: "politics",
        category: "entertain",
        value: 64,
      },
      {
        text: "DaBin",
        category: "entertain",
        value: 50,
      },
      {
        text: "thought",
        category: "entertain",
        value: 16,
      },
      {
        text: "bad",
        category: "entertain",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 30,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 50,
      },
      {
        text: "thought",
        category: "sports",
        value: 16,
      },
      {
        text: "bad",
        category: "sports",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 30,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 60,
      },
      {
        text: "thought",
        category: "sports",
        value: 6,
      },
      {
        text: "bad",
        category: "sports",
        value: 19,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 25,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 54,
      },
      {
        text: "thought",
        category: "sports",
        value: 100,
      },
      {
        text: "bad",
        category: "sports",
        value: 90,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 30,
      },
      {
        text: "DaBin",
        category: "economy",
        value: 50,
      },
      {
        text: "thought",
        category: "economy",
        value: 40,
      },
      {
        text: "bad",
        category: "economy",

        value: 10,
      },
      {
        text: "economy",
        category: "economy",

        value: 64,
      },
      {
        text: "DaBin",
        category: "entertain",

        value: 50,
      },
      {
        text: "thought",
        category: "entertain",
        value: 16,
      },
      {
        text: "bad",
        category: "entertain",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "entertain",
        value: 30,
      },
      {
        text: "DaBin",
        category: "entertain",
        value: 50,
      },
      {
        text: "thought",
        category: "entertain",
        value: 16,
      },
      {
        text: "bad",
        category: "entertain",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "entertain",
        value: 30,
      },
      {
        text: "DaBin",
        category: "entertain",
        value: 60,
      },
      {
        text: "thought",
        category: "entertain",
        value: 6,
      },
      {
        text: "bad",
        category: "entertain",
        value: 19,
      },
      {
        text: "HwaYeon",
        category: "entertain",
        value: 25,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 54,
      },
      {
        text: "thought",
        category: "politics",
        value: 100,
      },
      {
        text: "bad",
        category: "politics",
        value: 90,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 30,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "politics",
        value: 40,
      },
      {
        text: "bad",
        category: "politics",
        value: 10,
      },

      {
        text: "entertain",
        category: "politics",
        value: 64,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "politics",
        value: 16,
      },
      {
        text: "bad",
        category: "politics",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 30,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "politics",
        value: 16,
      },
      {
        text: "bad",
        category: "politics",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 30,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 60,
      },
      {
        text: "thought",
        category: "politics",
        value: 6,
      },
      {
        text: "bad",
        category: "politics",
        value: 19,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 25,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 54,
      },
      {
        text: "thought",
        category: "politics",
        value: 100,
      },
      {
        text: "bad",
        category: "politics",
        value: 90,
      },
      {
        text: "HwaYeon",
        category: "politics",
        value: 30,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "politics",
        value: 40,
      },
      {
        text: "bad",
        category: "politics",
        value: 10,
      },

      {
        text: "sports",
        category: "politics",
        value: 64,
      },
      {
        text: "DaBin",
        category: "politics",
        value: 50,
      },
      {
        text: "thought",
        category: "economy",
        value: 16,
      },
      {
        text: "bad",
        category: "economy",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "economy",
        value: 30,
      },
      {
        text: "DaBin",
        category: "economy",
        value: 50,
      },
      {
        text: "thought",
        category: "economy",
        value: 16,
      },
      {
        text: "bad",
        category: "economy",
        value: 17,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 30,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 60,
      },
      {
        text: "thought",
        category: "sports",
        value: 6,
      },
      {
        text: "bad",
        category: "sports",
        value: 19,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 25,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 54,
      },
      {
        text: "thought",
        category: "sports",
        value: 100,
      },
      {
        text: "bad",
        category: "sports",
        value: 90,
      },
      {
        text: "HwaYeon",
        category: "sports",
        value: 30,
      },
      {
        text: "DaBin",
        category: "sports",
        value: 50,
      },
      {
        text: "thought",
        category: "sports",
        value: 40,
      },
      {
        text: "bad",
        category: "sports",
        value: 10,
      },
    ];
    const setAll = () => {
      let array = [];
      const init = [...wordcloud.sort(sortValue)];
      init.forEach((word, index) => {
        if (index <= 25) {
          let temp = {
            text: word.text,
            value: word.value,
          };
          array.push(temp);
        }
      });
      return array;
    };

    setAllRanking(setAll);
    setPoliticsRanking(setCategory("politics"));
    setEconomyRanking(setCategory("economy"));
    setEntertainRanking(setCategory("entertain"));
    setSportsRanking(setCategory("sports"));
  };
  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${currentUser}`;

      const fitNewsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/news/recommend`,
      );
      setUserFitNews(fitNewsResponse.data);
      console.log("사용자맞춤임!!!", userFitNews);
      const hotNewsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/news/hot`,
      );
      setHotNews(hotNewsResponse.data);
      console.log("핫뉴스임!!!", hotNews);
      // 핫뉴스는 한꺼번에 받아와서, 키워드별로 여기서 나눠도 될것같은데.
      const dailyWordCloudResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/daily`,
      );
      setHotNews(dailyWordCloudResponse.data);
      console.log("데일리워드클라우드임!!!!", dailyWordCloud);
    };

    fetchData();
    getKeywordsRanking();
  }, []);

  const ranking = {
    0: (
      <>
        {allRanking.slice(0, 5).map((item, index) => {
          return (
            <KeywordRanking
              item={item}
              rank={index + 1}
              key={index}
            ></KeywordRanking>
          );
        })}
      </>
    ),
    1: (
      <>
        {politicsRanking.slice(0, 5).map((item, index) => {
          return (
            <KeywordRanking
              item={item}
              rank={index + 1}
              key={index}
            ></KeywordRanking>
          );
        })}
      </>
    ),
    2: (
      <>
        {economyRanking.slice(0, 5).map((item, index) => {
          return (
            <KeywordRanking
              item={item}
              rank={index + 1}
              key={index}
            ></KeywordRanking>
          );
        })}
      </>
    ),
    3: (
      <>
        {entertainRanking.slice(0, 5).map((item, index) => {
          return (
            <KeywordRanking
              item={item}
              rank={index + 1}
              key={index}
            ></KeywordRanking>
          );
        })}
      </>
    ),
    4: (
      <>
        {sportsRanking.slice(0, 5).map((item, index) => {
          return (
            <KeywordRanking
              item={item}
              rank={index + 1}
              key={index}
            ></KeywordRanking>
          );
        })}
      </>
    ),
  };
  const tabContent = {
    0: <>{allRanking && <Wordcloud words={allRanking}></Wordcloud>}</>,
    1: (
      <>{politicsRanking && <Wordcloud words={politicsRanking}></Wordcloud>}</>
    ),
    2: <>{economyRanking && <Wordcloud words={economyRanking}></Wordcloud>}</>,
    3: (
      <>
        {entertainRanking && <Wordcloud words={entertainRanking}></Wordcloud>}
      </>
    ),
    4: <>{sportsRanking && <Wordcloud words={sportsRanking}></Wordcloud>}</>,
  };

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
        <div className="userfit-order">1/{userFitNews.length}</div>
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
            <h3 className="hottopic-title">Articles[0].title</h3>
            <span className="article-category">
              <i>
                <FontAwesomeIcon icon={faCircle} />
              </i>
              SPORTS
            </span>
          </div>
          <div className="hottopic-right">
            <ArticleOutside Article={Articles[1]}></ArticleOutside>
            <ArticleOutside Article={Articles[2]}></ArticleOutside>
            <ArticleOutside Article={Articles[3]}></ArticleOutside>
          </div>
        </div>
      </section>
      <section className="daily-keyword">
        <SectionTitle sectionTitle={sectionTitle[2]}></SectionTitle>
        <div className="daily-wrapper">
          <div className="daily-left">{ranking[activeId]}</div>
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
              <div className="wordcloud">{tabContent[activeId]}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Landing;
