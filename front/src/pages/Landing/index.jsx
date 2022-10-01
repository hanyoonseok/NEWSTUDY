import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import BadgeModal from "components/BadgeModal";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { category } from "constants/category";
import {
  faBorderAll,
  faBaseballBatBall,
  faChevronRight,
  faChevronLeft,
  faCircle,
  faMicrochip,
  faGlobe,
  faEllipsis,
  faFileWord,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import Wordcloud from "./WordCloud";
import ArticleInside from "./ArticleInside";
import ArticleOutside from "./ArticleOutside";
import TopBtn from "components/TopBtn";

const MAX_VISIBILITY = 3;

function SectionTitle({ sectionTitle }) {
  const user = useSelector((state) => state.user);

  const { blueTitle, blackTitle, desc } = sectionTitle;
  const [badgeContent, setBadgeContent] = useState({});
  const [isBadgeModal, setIsBadgeModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/badge/new", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setBadgeContent({
              text: res.data[0].name,
              index: res.data[0].b_id,
            });
            setIsBadgeModal(true);
          }
        });
    };
    fetchData();
    return () => {};
  }, []);
  return (
    <>
      <div className="section">
        <h1 className="section-title">
          <span className="text-spotlight">{blueTitle}&nbsp; </span>{" "}
          {blackTitle}
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
      {isBadgeModal && (
        <BadgeModal
          setStatus={setIsBadgeModal}
          text={badgeContent.text}
          index={badgeContent.index}
        />
      )}
    </>
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
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [activeId, setActiveId] = useState(0);
  const [wordRanking, setWordRanking] = useState(null);
  const [userFitNews, setUserFitNews] = useState(null);
  const [hotNews, setHotNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };
  const sectionTitle = [
    {
      blueTitle: "USER FIT ",
      blackTitle: "NEWS",
      desc: "사용자의 관심사에 맞춘 기사입니다.",
    },
    {
      blueTitle: "HOT ",
      blackTitle: "TOPIC",
      desc: "오늘 가장 인기있는 기사를 보여줍니다.",
    },
    {
      blueTitle: "DAILY ",
      blackTitle: "WORDCLOUD",
      desc: "매일 수집된 뉴스를 바탕으로 많이 언급된 단어들을 보여줍니다.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      const wordCloudResponse = await axios.get(`/daily/${activeId}`);
      console.log(wordCloudResponse.data);
      setWordRanking(wordCloudResponse.data);
    };
    fetchData();
  }, [activeId]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      try {
        // 로딩값을 true로 변경
        setLoading(true);
        // 초기화시켜주기
        setUserFitNews(null);
        setHotNews(null);
        setWordRanking(null);
        // setAllRanking(null);

        // 사용자 맞춤 기사
        const fitNewsResponse = await axios.get(`/news/recommend`);
        console.log(fitNewsResponse.data);
        setUserFitNews(fitNewsResponse.data);
        // 핫토픽 기사
        const hotNewsResponse = await axios.get(`/news/hot`);
        console.log(hotNewsResponse.data);
        setHotNews(hotNewsResponse.data);
        // 데일리 워드클라우드
        const wordCloudResponse = await axios.get(`/daily/${activeId}`);
        setWordRanking(wordCloudResponse.data);
        console.log("워드데이터", wordCloudResponse.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (error) return <div>{error} 에러가 발생했습니다.</div>;
  if (loading) return <div>로딩중..</div>;
  return (
    <div className="landing-wrapper">
      <div className="landing-header">
        <div>Wednesday, September 7, 2022</div>
      </div>
      <div className="recommend-word">
        <i>
          <FontAwesomeIcon icon={faFileWord} />
        </i>
        &nbsp;&nbsp; 어떤걸 추가하고싶긴 한데..
      </div>
      {/* 사용자 맞춤 기사 */}
      <section className="userfit" data-aos="fade-up" data-aos-delay="300">
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

        {hotNews && hotNews.length > 0 && (
          <>
            <div className="hottopic-articles">
              <div
                className="hottopic-left"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <>
                  <div className="hottopic-img">
                    <img src={hotNews[0].thumbnail} alt="article"></img>
                    <span
                      className={`article-level ${
                        level_value[hotNews[0].level].includes("A")
                          ? "Alv"
                          : level_value[hotNews[0].level].includes("B")
                          ? "Blv"
                          : "Clv"
                      }`}
                    >
                      {level_value[hotNews[0].level]}
                    </span>
                  </div>
                  <h3 className="hottopic-title">{hotNews[0].title}</h3>
                  <span className="article-category">
                    <i>
                      <FontAwesomeIcon icon={faCircle} />
                    </i>
                    {category[hotNews[0].c_id].main}
                  </span>
                </>
              </div>
              <div
                className="hottopic-right"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {hotNews.slice(1, 4).map((news, index) => (
                  <ArticleOutside Article={news} key={index}></ArticleOutside>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <section className="daily-keyword">
        <SectionTitle sectionTitle={sectionTitle[2]}></SectionTitle>
        <div className="daily-wrapper">
          <div className="daily-left" data-aos="fade-right">
            {wordRanking &&
              wordRanking.slice(0, 5).map((item, index) => {
                return (
                  <KeywordRanking
                    item={item}
                    rank={index + 1}
                    key={index}
                  ></KeywordRanking>
                );
              })}
          </div>
          <div className="daily-right">
            <div className="wordcloud-wrapper" data-aos="fade-left">
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
                  <i>
                    <FontAwesomeIcon icon={faLeaf} />
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
                    <FontAwesomeIcon icon={faMicrochip} />
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
                    <FontAwesomeIcon icon={faGlobe} />
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
                <li
                  className={`${
                    activeId === 5 ? "active word-category" : "word-category"
                  }`}
                  onClick={() => onClickSwitchTab(5)}
                >
                  <i>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </i>
                  <span className="category-name">&nbsp;OTHER</span>
                </li>
              </ul>
              <div className="wordcloud">
                {wordRanking && (
                  <Wordcloud wordRanking={wordRanking}></Wordcloud>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopBtn></TopBtn>
    </div>
  );
}
export default Landing;
