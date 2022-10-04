import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import LevelContainer from "./LevelContainer";
import Filter from "components/Filter";
import FilterModal from "components/FilterModal";
import { category } from "constants/category";
import { intToLevel } from "constants";
import { useNavigate } from "react-router-dom";

import NewsCard from "components/NewsCard";
import DefaultThumb from "assets/default-thumb.png";
import axios from "axios";
import TopBtn from "components/TopBtn";

export default function NewsList() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [selectedLevel, setSelectedLevel] = useState(
    user.level === 0 ? 1 : user.level,
  );

  const [newsList, setNewsList] = useState([]);
  const [isExistMoreNews, setIsExistMoreNews] = useState(false);
  const [page, setPage] = useState(1);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [cidArray, setCidArray] = useState([]);
  const [userScrapList, setUserScrapList] = useState([]);
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const onCloseClick = useCallback(() => {
    setIsFilterModal(false);
  }, []);

  const onLinkClick = (n_id) => {
    navigate(`/news/${n_id}`);
  };

  const doCategoryFilter = (cidArray) => {
    setNewsList([]);
    const categories = [];
    cidArray.map((i) => {
      categories.push(category[i]);
    });
    setCidArray(cidArray);
    setSelectedCategory(categories);
    console.log(category);
  };

  const onLevelClick = useCallback(
    (lv) => () => {
      if (lv === selectedLevel) return;
      setSelectedLevel(lv);
      setPage(1);
      setNewsList([]);
      // 선택한 카테고리 리스트를 삭제해주장
      setCidArray([]);
      setSelectedCategory([]);
      setUserScrapList([]);
    },
    [selectedLevel],
  );

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;

      // 뉴스 목록 불러오기.
      let data;
      if (cidArray.length === 0) {
        data = {
          per_page: 10,
          startlevel: selectedLevel,
          endlevel: selectedLevel,
          page: page,
        };
      } else {
        // cidArray가 있으면
        data = {
          per_page: 10,
          startlevel: selectedLevel,
          endlevel: selectedLevel,
          page: page,
          categoryid: cidArray,
        };
      }

      const newsListResponse = await axios.post(`/news`, data);
      const result = newsListResponse.data;
      setNewsList([...newsList, ...result.newsList]);

      if (result.totalCnt > newsList.length + result.newsList.length) {
        setIsExistMoreNews(true);
      } else {
        setIsExistMoreNews(false);
      }
      setTotalNews(result.totalCnt);
    };
    fetchData();
  }, [selectedLevel, page, cidArray]);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      const userScrapResponse = await axios.get(`/scrap`);
      setUserScrapList(
        userScrapResponse.data.map((news) => {
          return news.n_id;
        }),
      );
    };
    fetchData();
  }, []);

  return (
    <section className="newslist-container">
      {isMobile && (
        <div className="mobile-level-title">
          <h1 className="LEVEL-title">LEVEL</h1>
          <div onClick={() => setIsFilterModal(true)}>
            <Filter onClick={() => setIsFilterModal(true)} />
          </div>
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
            {intToLevel[selectedLevel]} Level {totalNews}건
          </h3>
          {!isMobile && (
            <div
              onClick={() => {
                setIsFilterModal(true);
              }}
            >
              <Filter />
            </div>
          )}
        </div>
        {newsList && (
          <>
            <div className="newslist-mid-area">
              {newsList.length > 0 && (
                <>
                  <div
                    className="hottest-article"
                    onClick={() => onLinkClick(newsList[0].n_id)}
                  >
                    <i
                      className={`hottest-article-level ${
                        level_value[newsList[0].level].includes("A")
                          ? "Alv"
                          : level_value[newsList[0].level].includes("B")
                          ? "Blv"
                          : "Clv"
                      }`}
                    >
                      {level_value[newsList[0].level]}
                    </i>
                    {isMobile && (
                      <div className="hottest-article-category mobile">
                        <FontAwesomeIcon icon={faCircle} />
                        {category[newsList[0].c_id].main}
                      </div>
                    )}
                    <span className="hottest-article-img">
                      <img
                        src={
                          newsList[0].thumbnail
                            ? newsList[0].thumbnail
                            : DefaultThumb
                        }
                        alt="hottest article 이미지"
                      ></img>
                    </span>
                    <h1 className="hottest-article-title">
                      {newsList[0].title}
                    </h1>
                    {!isMobile && (
                      <div className="hottest-article-footer">
                        <div className="hottest-article-category">
                          <FontAwesomeIcon icon={faCircle} />
                          {category[newsList[0].c_id].main}
                        </div>{" "}
                        <div className="hottest-article-category sub">
                          <FontAwesomeIcon icon={faCircle} />
                          {category[newsList[0].c_id].sub}
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
                        <NewsCard
                          news={news}
                          key={index}
                          isScrap={userScrapList.includes(news.n_id)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="newslist-bot-area">
              {newsList.slice(3).map((e, i) => (
                <NewsCard
                  news={e}
                  stretch={!isMobile}
                  key={i}
                  isScrap={userScrapList.includes(e.n_id)}
                />
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
      {isFilterModal && (
        <FilterModal
          text={"결과 보기"}
          closeHandler={onCloseClick}
          sendApi={doCategoryFilter}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <TopBtn></TopBtn>
    </section>
  );
}
