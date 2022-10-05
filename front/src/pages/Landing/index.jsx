import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import BadgeModal from "components/BadgeModal";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { category } from "constants/category";
import { Link } from "react-router-dom";

import {
  faBorderAll,
  faBaseballBatBall,
  faCircle,
  faMicrochip,
  faGlobe,
  faEllipsis,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import Wordcloud from "./WordCloud";
import ArticleInside from "./ArticleInside";
import TopBtn from "components/TopBtn";
import UserfitArticle from "./UserfitArticle";
import NewsCard from "components/NewsCard";

function SectionTitle({ sectionTitle }) {
  const user = useSelector((state) => state.user);

  const { blueTitle, blackTitle, desc } = sectionTitle;
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
    </>
  );
}

function KeywordRanking({ item, rank, selectedKeyword }) {
  return (
    <>
      <div
        className={`key-ranking ${
          selectedKeyword === item.eng ? "active" : ""
        }`}
      >
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

function Landing() {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];
  const user = useSelector((state) => state.user);
  const [activeId, setActiveId] = useState(0);
  const [wordRanking, setWordRanking] = useState(null);
  const [userFitNews, setUserFitNews] = useState([]);
  const [hotNews, setHotNews] = useState([]);
  const [active, setActive] = useState(1);
  const [nowDate, setNowDate] = useState(new Date());
  const [keywordArticle, setKeywordArticle] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [badgeContent, setBadgeContent] = useState({});
  const [isBadgeModal, setIsBadgeModal] = useState(false);
  const [scrapList, setScrapList] = useState([]);

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

  const categoryNumber = [0, 1, 62, 67, 40, 28];

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
        // 초기화시켜주기
        setUserFitNews([]);
        setHotNews([]);
        setWordRanking(null);
        // setAllRanking(null);

        // 사용자 맞춤 기사
        const fitNewsResponse = await axios.get(`/news/recommend`);
        console.log(fitNewsResponse.data);
        setUserFitNews(fitNewsResponse.data);
        // 핫토픽 기사
        const hotNewsResponse = await axios.get(`/news/hot`);
        setHotNews(hotNewsResponse.data);
        // 데일리 워드클라우드
        getWordCloud();
        setSelectedKeyword(wordRanking.length > 0 ? wordRanking[0].eng : ""); //키워드 첫번째꺼로 설정
        getSelectedKeywordArticle();
      } catch (e) {}
    };

    fetchData();

    const getBadge = async () => {
      await axios
        .get("/badge/new", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.length > 0) {
            setBadgeContent({
              text: res.data[0].name,
              index: res.data[0].b_id,
            });
            setIsBadgeModal(true);
          }
        });
    };

    const getScrapList = async () => {
      const scrapListResponse = await axios.get("/scrap");
      console.log(scrapListResponse);
      setScrapList(scrapListResponse.data.map((e) => e.n_id));
    };
    getBadge();
    getScrapList();
  }, []);
  // 워드 클라우드 데이터 가져오는 함수
  const getWordCloud = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.accessToken}`;
    const wordCloudResponse = await axios.get(
      `/daily/${categoryNumber[activeId]}`,
    );

    console.log(wordCloudResponse.data);
    setWordRanking(wordCloudResponse.data);
    setSelectedKeyword(
      wordCloudResponse.data.length > 0 ? wordCloudResponse.data[0].eng : "",
    );
  }, [activeId]);

  useEffect(() => {
    console.log("activeID", activeId);
    getWordCloud();
  }, [activeId]);

  // 현재 선택한 키워드에 대한 기사 4개 가져오기
  const getSelectedKeywordArticle = async () => {
    if (selectedKeyword) {
      console.log("selectedKeyword", selectedKeyword);
      const filter = {
        per_page: 10,
        page: 1,
        titlekeyword: selectedKeyword,
      };
      console.log("filter", filter);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      const keywordArticleResponse = await axios.post("/news", filter);
      console.log(
        "가져온 기사덜",
        keywordArticleResponse.data.newsList.slice(0, 4),
      );
      setKeywordArticle(keywordArticleResponse.data.newsList.slice(0, 4));
    }
  };

  useEffect(() => {
    // 선택한 키워드 바뀔때마다 제목에 키워드 들어간 기사 가져오기
    getSelectedKeywordArticle();
  }, [selectedKeyword]);

  return (
    <div className="landing-wrapper">
      <div className="landing-header">
        <div>Date | {nowDate.toUTCString().substring(0, 16)}</div>
      </div>
      {/* 사용자 맞춤 기사 */}

      <section className="userfit" data-aos="fade-up" data-aos-delay="300">
        <SectionTitle sectionTitle={sectionTitle[0]}></SectionTitle>
        {userFitNews.length > 0 && (
          <>
            <div className="userfit-articles">
              <UserfitArticle setActive={setActive} active={active}>
                {userFitNews.length > 0 &&
                  userFitNews.map((fitArticle, index) => (
                    <ArticleInside
                      Article={fitArticle}
                      key={index}
                    ></ArticleInside>
                  ))}
              </UserfitArticle>
            </div>
            <div className="userfit-order">
              {active + 1}/{userFitNews.length}
            </div>
          </>
        )}
      </section>
      {/* 핫토픽 */}
      <section className="hottopic">
        <SectionTitle sectionTitle={sectionTitle[1]}></SectionTitle>

        {hotNews && hotNews.length > 0 && (
          <>
            <div className="hottopic-articles">
              <Link
                to={`/news/${hotNews[0].n_id}`}
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
                  <span className="article-category sub">
                    <i>
                      <FontAwesomeIcon icon={faCircle} />
                    </i>
                    {category[hotNews[0].c_id].sub}
                  </span>{" "}
                  <span className="article-category">
                    <i>
                      <FontAwesomeIcon icon={faCircle} />
                    </i>
                    {category[hotNews[0].c_id].main}
                  </span>
                </>
              </Link>
              <div
                className="hottopic-right"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {hotNews.slice(1, 4).map((news, index) => (
                  <NewsCard
                    news={news}
                    key={index}
                    isScrap={scrapList.includes(news.n_id)}
                  />
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
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedKeyword(item.eng);
                    }}
                  >
                    <KeywordRanking
                      selectedKeyword={selectedKeyword}
                      item={item}
                      rank={index + 1}
                    />
                  </div>
                );
              })}
          </div>
          <div className="daily-right">
            <div className="wordcloud-wrapper" data-aos="fade-in">
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
        <div className="wordcloud-article">
          {keywordArticle &&
            keywordArticle.length > 0 &&
            keywordArticle.map((item, index) => {
              return (
                <NewsCard news={item} key={index} query={selectedKeyword} />
              );
            })}
        </div>
      </section>
      <TopBtn></TopBtn>
      {isBadgeModal && (
        <BadgeModal
          setStatus={setIsBadgeModal}
          text={badgeContent.text}
          index={badgeContent.index}
        />
      )}
    </div>
  );
}
export default Landing;
