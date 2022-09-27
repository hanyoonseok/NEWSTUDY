import React, { useEffect } from "react";
import { useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
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
          <div className="keyword">{item.eng}</div>
          {/* 지금은 빈도수로 해놨는데 만약 관련기사 수로 할거면 나중에 추가하셍요 */}
          <div className="rank-change">{item.cnt}건</div>
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
          key={i}
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
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(0);
  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };
  // 데일리 빈출단어는 DB에서 한꺼번에 가져옴
  const [allRanking, setAllRanking] = useState([]);
  const [lifeRanking, setLifeRanking] = useState([]);
  const [newsRanking, setNewsRanking] = useState([]);
  const [sportsRanking, setSportsRanking] = useState([]);
  const [techRanking, setTechRanking] = useState([]);
  const [worldRanking, setWorldRanking] = useState([]);
  const [otherRanking, setOtherRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const [userFitNews, setUserFitNews] = useState(null);
  const [hotNews, setHotNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser.accessToken}`;
      try {
        // 로딩값을 true로 변경
        setLoading(true);
        // 초기화시켜주기
        setUserFitNews(null);
        setHotNews(null);
        setAllRanking(null);

        // 사용자 맞춤 기사
        const fitNewsResponse = await axios.get(`/news/recommend`);
        console.log(fitNewsResponse.data);
        setUserFitNews(fitNewsResponse.data);
        // 핫토픽 기사
        const hotNewsResponse = await axios.get(`/news/hot`);
        console.log(hotNewsResponse.data);
        setHotNews(hotNewsResponse.data);
        // 데일리 워드클라우드
        const allWordCloudResponse = await axios.get(`/daily/${0}`);
        console.log("길이 " + allWordCloudResponse.data.length);
        setAllRanking(allWordCloudResponse.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // const onCategoryClick = useCallback(async (c_id) => {
  //   const payload = {
  //     Authorization: `Bearer ${currentUser.accessToken}`,
  //     n_id: newsId,
  //   };
  //   const addScrapResponse = await axios.post(`/daily/${c_id}`, payload);
  //   console.log(addScrapResponse);
  // }, []);

  const ranking = {
    0: (
      <>
        {allRanking &&
          allRanking.slice(0, 5).map((item, index) => {
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
        {lifeRanking.slice(0, 5).map((item, index) => {
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
        {techRanking.slice(0, 5).map((item, index) => {
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
        {worldRanking.slice(0, 5).map((item, index) => {
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
    1: <>{lifeRanking && <Wordcloud words={lifeRanking}></Wordcloud>}</>,
    2: <>{techRanking && <Wordcloud words={techRanking}></Wordcloud>}</>,
    3: <>{worldRanking && <Wordcloud words={worldRanking}></Wordcloud>}</>,
    4: <>{sportsRanking && <Wordcloud words={sportsRanking}></Wordcloud>}</>,
  };

  if (error) return <div>{error} 에러가 발생했습니다.</div>;
  if (loading) return <div>로딩중..</div>;
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
            {userFitNews &&
              userFitNews.map((fitArticle, index) => (
                <ArticleInside Article={fitArticle} key={index}></ArticleInside>
              ))}
          </UserfitArticle>
        </div>
        {userFitNews && (
          <div className="userfit-order">1/{userFitNews.length}</div>
        )}
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
            <h3 className="hottopic-title"></h3>
            <span className="article-category">
              <i>
                <FontAwesomeIcon icon={faCircle} />
              </i>
              SPORTS
            </span>
          </div>
          {hotNews && (
            <div className="hottopic-right">
              <ArticleOutside Article={hotNews[1]}></ArticleOutside>
              <ArticleOutside Article={hotNews[2]}></ArticleOutside>
              <ArticleOutside Article={hotNews[3]}></ArticleOutside>
            </div>
          )}
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
                  <span className="category-name">&nbsp; LIFE</span>
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
                  <span className="category-name">&nbsp; TECH</span>
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
                  <span className="category-name">&nbsp; WORLD</span>
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
