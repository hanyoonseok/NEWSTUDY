import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import LevelContainer from "./LevelContainer";
import Filter from "components/Filter";
import NewsCard from "components/NewsCard";
import axios from "axios";

export default function NewsList() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedLevel, setSelectedLevel] = useState(
    currentUser.level === 0 ? 1 : currentUser.level,
  );

  const [newsList, setNewsList] = useState([]);
  const [hotNewsList, setHotNewsList] = useState(null);
  const [isExistMoreNews, setIsExistMoreNews] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const onLevelClick = useCallback(
    (lv) => () => {
      if (lv === selectedLevel) return;
      setSelectedLevel(lv);
      setPage(1);
      setNewsList([]);
    },
    [selectedLevel],
  );

  useEffect(() => {
    console.log("유저정보 찍기 ", currentUser);
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser.accessToken}`;
      console.log(selectedLevel);

      // 뉴스 목록 불러오기.
      const data = {
        startlevel: selectedLevel,
        endlevel: selectedLevel,
        page: page,
      };

      const newsListResponse = await axios.post(`/news`, data);
      const result = newsListResponse.data;
      setNewsList([...newsList, ...result.newsList]);
      if (result.totalCnt > newsList.length + result.newsList.length) {
        setIsExistMoreNews(true);
      } else {
        setIsExistMoreNews(false);
      }

      console.log(result.totalCnt);
    };

    fetchData();
  }, [selectedLevel, page]);

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
        {newsList && (
          <>
            <div className="newslist-mid-area">
              {newsList.length > 0 && (
                <>
                  <div className="hottest-article">
                    <i
                      // className={`hottest-article-level ${
                      //   news.level.includes("A")
                      //     ? "Alv"
                      //     : news.level.includes("B")
                      //     ? "Blv"
                      //     : "Clv"
                      // }`}
                      // 이거는 ... 나중에 정제된 데이터 들어오면 넣기.
                      className="hottest-article-level"
                    >
                      {newsList.level}
                    </i>
                    {isMobile && (
                      <div className="hottest-article-category mobile">
                        <FontAwesomeIcon icon={faCircle} />
                        {newsList[0].c_id}
                      </div>
                    )}
                    <span className="hottest-article-img">
                      <img src={newsList[0].thumbnail}></img>
                    </span>
                    <h1 className="hottest-article-title">
                      {newsList[0].title}
                    </h1>
                    {!isMobile && (
                      <div className="hottest-article-footer">
                        <div className="hottest-article-category">
                          <FontAwesomeIcon icon={faCircle} />
                          {newsList[0].c_id}
                        </div>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="hottest-article-bookmark"
                        />
                      </div>
                    )}
                  </div>
                  {!isMobile && newsList && (
                    <div className="sub-article-container">
                      {newsList.slice(1, 3).map((news, index) => (
                        <NewsCard news={news} key={index} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="newslist-bot-area">
              {newsList.slice(3).map((e, i) => (
                <NewsCard news={e} stretch={!isMobile} key={i} />
              ))}
            </div>
            {isExistMoreNews && (
              <div
                className="newslist-morebtn-container"
                onClick={() => setPage(page + 1)}
              >
                <button className="newslist-morebtn">더보기</button>
              </div>
            )}
          </>
        )}
      </article>
    </section>
  );
}
