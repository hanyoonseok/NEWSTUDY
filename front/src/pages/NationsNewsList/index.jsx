import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

import "./style.scss";
import NewsCard from "components/NewsCard";
import Loading from "components/Loading";
import Globe from "./Globe";
import { category } from "constants/category";

export default function NationsNewsList() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(25); //globe에서 마커 클릭했을 때 클릭한 나라 id 값 받을 변수
  const [nationsNews, setNationsNews] = useState([]); //선택 국가의 뉴스 담긴 배열
  const [nations, setNations] = useState([]); //국가 정보 담긴 배열
  const [dataIdx, setDataIdx] = useState(1);
  const [userScrapList, setUserScrapList] = useState([]);
  const [hasMoreNews, setHasMoreNews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const perPage = 10;
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const idxGap = 67; // category내의 c_id와 nations의 인덱스 차이

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userState.accessToken}`;

    if (category.length > 0) {
      const worldArr = category.filter((e) => e && e.main === "world");
      worldArr.forEach((e, i) => {
        let hex = "#";

        for (let i = 0; i < 6; i++) {
          const index = Math.floor(Math.random() * hexValues.length);
          hex += hexValues[index];
        }
        e.color = hex;
        e.value = 100;
        e.city = e.sub.toUpperCase();
        e.id = i;
      });
      setNations(worldArr);
    }

    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userState.accessToken}`;
      const userScrapResponse = await axios.get(`/scrap`);
      setUserScrapList(
        userScrapResponse.data.map((news) => {
          return news.n_id;
        }),
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // selectedIdx가 바뀔 때마다 해당 국가의 뉴스 리스트를 받아온다
    const fetchData = async () => {
      const nationsNewsResponse = await axios.post("/news", {
        per_page: perPage,
        categoryid: [selectedIdx + idxGap],
        page: 1,
        startdate: moment().subtract(6, "months").format("YYYY-MM-DD"),
        enddate: moment().format("YYYY-MM-DD"),
      });
      setNationsNews(nationsNewsResponse.data.newsList);
      setHasMoreNews(nationsNewsResponse.data.totalCnt > perPage);
      setDataIdx(2);
      setIsLoading(false);
    };

    fetchData();
    return () => {};
  }, [selectedIdx]);

  const onMoreClick = useCallback(async () => {
    const moreNewsResponse = await axios.post("/news", {
      per_page: perPage,
      categoryid: [selectedIdx + idxGap],
      page: dataIdx,
      startdate: moment().subtract(6, "months").format("YYYY-MM-DD"),
      enddate: moment().format("YYYY-MM-DD"),
    });
    console.log(moreNewsResponse);
    setNationsNews(nationsNews.concat(moreNewsResponse.data.newsList));
    setHasMoreNews(moreNewsResponse.data.totalCnt > perPage * dataIdx);
    setDataIdx((prev) => prev + 1);
  }, [dataIdx, nationsNews, selectedIdx]);

  const onPrevClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === 0 ? nations.length - 1 : prev - 1));
  }, [nations.length]);

  const onNextClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === nations.length - 1 ? 0 : prev + 1));
  }, [nations.length]);

  return (
    <section className="nationsnews-container">
      {nations.length > 0 && (
        <>
          <article className="nationsnews-globe-container">
            <Globe
              className="globe"
              markers={nations}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
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
            {/* <div className="filter-container">
              <Filter clickHandler={onFilterClick} />
            </div> */}
            <div className="nationsnews-list">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="nationsnews-list-list">
                  {nationsNews.length > 0 &&
                    nationsNews.map((e, i) => {
                      return (
                        <NewsCard
                          news={e}
                          key={i}
                          isScrap={userScrapList.includes(e.n_id)}
                        />
                      );
                    })}
                  {hasMoreNews && (
                    <div className="nationsnews-btn-wrapper">
                      <button
                        className="nationsnews-morebtn"
                        onClick={onMoreClick}
                      >
                        더보기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        </>
      )}
    </section>
  );
}
