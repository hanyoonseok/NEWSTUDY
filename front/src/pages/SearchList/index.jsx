import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCircle,
  faEllipsis,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

import { category } from "constants/category";
import NewsCard from "components/NewsCard";
import HotNewsCard from "./HotNewsCard";
import Filter from "components/Filter";
import FilterModal from "components/FilterModal";
import LevelRange from "./LevelRange";
import TopBtn from "components/TopBtn";
import PieChart from "./PieChart";
import Modal from "components/Modal";

function SearchList() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });
  const user = useSelector((state) => state.user);
  const [newsList, setNewsList] = useState([]); // 뉴스 기사 리스트
  const [scrapList, setScrapList] = useState([]); // 내가 스크랩한 기사 리스트
  const [totalCnt, setTotalCnt] = useState(0); // 검색 키워드의 기사 전체 개수
  const [isExistMoreNews, setIsExistMoreNews] = useState(false); // 남은 기사 더 있는지
  const [categoryCnt, setCategoryCnt] = useState(null); // 키워드의 타 카테고리 언급량
  const params = useParams(); // 검색 키워드

  // 검색 필터 관련
  const [page, setPage] = useState(1); // 기사 불러온 페이지
  const [activeTitleBtn, setActiveTitleBtn] = useState(true); // 필터 제목 활성화 여부
  const [activeContentBtn, setActiveContentBtn] = useState(true); //필터 본문 활성화 여부
  const [isFilterModal, setIsFilterModal] = useState(false); //필터 모달 활성화 여부
  const [selectedCategory, setSelectedCategory] = useState([]); // 필터에서 선택한 카테고리
  const [filter, setFilter] = useState({
    // api body에 들어갈 필터 옵션
    per_page: 10,
    page: 1,
    titlekeyword: params.query,
    contentkeyword: params.query,
  });
  const [dataZero, setDataZero] = useState(false); // 검색했을 때 결과 있는지

  // 달력 관련
  const [activeSelectDate, setActiveSelectDate] = useState(false); //달력 열려있는지 여부
  const [startDay, setStartDay] = useState(new Date()); //시작 날짜
  const [endDay, setEndDay] = useState(new Date()); // 끝 날짜
  const [activeStartDate, setActiveStartDate] = useState(false); //시작 달력 활성화 여부
  const [activeEndDate, setActiveEndDate] = useState(false); //끝 달력 활성화 여부

  // 캘린더 관련 함수들
  const showSelectDate = (checked) => {
    if (checked)
      // 만약 선택됐다면 캘린더를 보여주자.
      setActiveSelectDate(true);
  };

  const dateFormat = (date) => {
    return new Date(+new Date(date) + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "")
      .split(" ")[0];
  };

  const selectDate = (checked, filter) => {
    if (checked) {
      const d = new Date();
      // 오늘날의 년, 월, 일 데이터
      const day = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();
      let date;
      if (filter === "day") {
        // 어제 날짜 구하기
        date = dateFormat(new Date().setDate(day - 1));
      } else if (filter === "week") {
        date = dateFormat(new Date().setDate(day - 7));
        console.log(date);
      } else if (filter === "month") {
        date = dateFormat(new Date().setMonth(month - 1));
        console.log(date);
      } else if (filter === "year") {
        date = dateFormat(new Date().setYear(year - 1));
        console.log(date);
      }
      setInitialization();
      setFilter((current) => {
        let newCondition = { ...current };
        newCondition["startdate"] = date;
        newCondition["enddate"] = dateFormat(new Date());
        return newCondition;
      });
      console.log(filter);
    }
    setActiveSelectDate(false);
  };

  const setFilterSeletedDate = () => {
    const selectStartDay = moment(startDay).format("YYYY-MM-DD");
    const selectEndDay = moment(endDay).format("YYYY-MM-DD");
    setInitialization();
    setFilter((current) => {
      let newCondition = { ...current };
      newCondition["startdate"] = selectStartDay;
      newCondition["enddate"] = selectEndDay;
      return newCondition;
    });
  };

  const onEndCalendar = () => {
    setActiveEndDate(!activeEndDate);
    setActiveStartDate(false);
  };
  const onStartCalendar = () => {
    setActiveStartDate(!activeStartDate);
    setActiveEndDate(false);
  };

  const closeCalendar = () => {
    setActiveEndDate(false);
    setActiveStartDate(false);
  };

  // 뉴스리스트 가져오는 함수들
  const getMoreNewsList = async (data) => {
    console.log("????", data);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.accessToken}`;
    const newsListResponse = await axios.post(`/news`, data);
    const result = newsListResponse.data;
    console.log("뉴스 결과아아아", result.newsList);
    if (result.newsList.length === 0) {
      console.log("데이터 제로임ㅜ");
      setDataZero(true);
      return;
    } else {
      setDataZero(false);
    }
    console.log(
      "카테고리 분석 결과 가져오앙",
      newsListResponse.data.categoryCnt,
    );
    setCategoryCnt(newsListResponse.data.categoryCnt);
    setNewsList([...newsList, ...result.newsList]);
    setTotalCnt(result.totalCnt);

    if (result.totalCnt > newsList.length + result.newsList.length) {
      setIsExistMoreNews(true);
    } else {
      setIsExistMoreNews(false);
    }
  };

  // 페이지는 1로, newsList는 초기화해주라
  const setInitialization = () => {
    setNewsList([]);
    setPage(1);
  };

  // 필터 관련 함수들
  const clickTitleToggle = (checked) => {
    if (checked) {
      setInitialization();
      setFilter({
        ...filter,
        titlekeyword: params.query,
      });
    } else {
      if (!activeContentBtn) {
        setActiveTitleBtn(true);
        return;
      }
      // 여기서는 titlekeyword를 빼야하는데..
      const { titlekeyword, ...data } = filter;
      console.log(data);
      setInitialization();
      setFilter(data);
    }
    setActiveTitleBtn((prev) => !prev);
  };

  const getSelectedLevel = (startLevel, endLevel) => {
    console.log("선택된 레벨 시작 " + startLevel + "끝 : " + endLevel);
    setInitialization();
    setFilter((current) => {
      let newCondition = { ...current };
      newCondition["startlevel"] = startLevel;
      newCondition["endlevel"] = endLevel;
      return newCondition;
    });
  };
  const clickContentToggle = (checked) => {
    if (checked) {
      setInitialization();
      setFilter({
        ...filter,
        contentkeyword: params.query,
      });
    } else {
      if (!activeTitleBtn) {
        setActiveContentBtn(true);
        return;
      }
      // contentkeyword를 빼주자.
      const { contentkeyword, ...data } = filter;
      console.log(data);
      setInitialization();
      setFilter(data);
    }
    setActiveContentBtn(!activeContentBtn);
  };
  const doCategoryFilter = (cidArray) => {
    const categories = [];
    cidArray.map((i) => {
      categories.push(category[i]);
    });
    setSelectedCategory(categories);
    console.log(category);
    setInitialization();
    setFilter((current) => {
      let newCondition = { ...current };
      newCondition["categoryid"] = cidArray;
      return newCondition;
    });
  };
  const onCloseClick = useCallback(() => {
    setIsFilterModal(false);
  }, []);

  const getScrapList = async () => {
    const scrapListResponse = await axios.get("/scrap");

    setScrapList(scrapListResponse.data.map((e) => e.n_id));
  };

  // search query가 변했을 때. scroll을 맨위로 올려준다.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setInitialization();
    setFilter((current) => {
      let newCondition = { ...current };
      newCondition["titlekeyword"] = params.query;
      newCondition["contentkeyword"] = params.query;
      return newCondition;
    });
    getScrapList();
    getMoreNewsList(filter);
  }, [params.query]);

  // more버튼을 눌렀을 때.
  useEffect(() => {
    setFilter((current) => {
      let newCondition = { ...current };
      newCondition["page"] = page;
      return newCondition;
    });
  }, [page]);

  // 필터를 변경했을 때.
  useEffect(() => {
    console.log("filter 찍어봐라", filter);
    getMoreNewsList(filter);
    getScrapList();
  }, [filter]);

  return (
    <div className="searchlist-container">
      {(activeStartDate || activeEndDate) && (
        <div className="screen" onClick={closeCalendar}></div>
      )}
      <h4>
        검색어 <b>{params.query}</b>(으)로 검색한 결과입니다.
      </h4>
      <>
        {/* {dataZero ? (
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            요청하신 {params.query}에 대한 검색 결과가 없습니다.
          </div>
        ) : ( */}
        <>
          <div className="search-analysis">
            {categoryCnt && <PieChart categoryCnt={categoryCnt} />}
          </div>
          <div className="search-header">
            <div className="filter-title">KEY</div>
            <div className="search-toggle">
              <div>제목</div>
              <input
                type="checkbox"
                id="Title"
                checked={activeTitleBtn}
                onChange={(e) => clickTitleToggle(e.target.checked)}
              />
              <label htmlFor="Title"></label>
            </div>
            <div className="search-toggle">
              <div>본문</div>
              <input
                type="checkbox"
                id="Content"
                checked={activeContentBtn}
                onChange={(e) => clickContentToggle(e.target.checked)}
              />
              <label htmlFor="Content"></label>
            </div>
            <div className="search-dates-container">
              {/* 많이 검색하는 날짜 먼저 보여준 후 직접 입력하게 한다. */}
              <div className="search-dates">
                <div className="filter-title">TIME</div>
                <label
                  className="date-btn"
                  onChange={(e) => selectDate(e.target.checked)}
                >
                  <input type="radio" className="date-btn" name="date" />
                  <i>
                    {!isMobile && <FontAwesomeIcon icon={faCircle} />}
                    <span>&nbsp; 전체</span>
                  </i>
                </label>
                <label
                  className="date-btn"
                  onChange={(e) => selectDate(e.target.checked, "day")}
                >
                  <input type="radio" className="date-btn" name="date" />
                  <i>
                    {!isMobile && <FontAwesomeIcon icon={faCircle} />}
                    <span>&nbsp; 1일</span>
                  </i>
                </label>
                <label
                  className="date-btn"
                  onChange={(e) => selectDate(e.target.checked, "week")}
                >
                  <input type="radio" className="date-btn" name="date" />
                  <i>
                    {!isMobile && <FontAwesomeIcon icon={faCircle} />}
                    <span>&nbsp; 1주</span>
                  </i>
                </label>
                <label
                  className="date-btn"
                  onChange={(e) => selectDate(e.target.checked, "month")}
                >
                  <input type="radio" className="date-btn" name="date" />
                  <i>
                    {!isMobile && <FontAwesomeIcon icon={faCircle} />}
                    <span>&nbsp; 1개월</span>
                  </i>
                </label>
                <label
                  className="date-btn"
                  onChange={(e) => selectDate(e.target.checked, "year")}
                >
                  <input type="radio" className="date-btn" name="date" />
                  <i>
                    {!isMobile && <FontAwesomeIcon icon={faCircle} />}
                    <span>&nbsp; 1년</span>
                  </i>
                </label>
                <label
                  className="date-btn"
                  onChange={(e) => {
                    showSelectDate(e.target.checked);
                  }}
                >
                  <input type="radio" className="date-btn" name="date" />

                  {isMobile ? (
                    <>
                      <i>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </i>
                    </>
                  ) : (
                    <i>
                      <FontAwesomeIcon icon={faCircle} />
                      <span>&nbsp; 직접입력</span>
                    </i>
                  )}
                </label>
              </div>

              {activeSelectDate && (
                <div className="user-select-date">
                  <div className="search-date">
                    <div className="date-icon" onClick={onStartCalendar}>
                      <i>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </i>
                    </div>
                    <div>
                      {!isMobile ? (
                        <div className="date">
                          {moment(startDay).format("YYYY년 MM월 DD일")}
                        </div>
                      ) : (
                        <div className="date">
                          {moment(startDay).format("YY.MM.DD")}
                        </div>
                      )}

                      <div
                        className={`calendar ${
                          activeStartDate ? "visible" : "hidden"
                        }`}
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
                    {!isMobile ? (
                      <div className="date">
                        {moment(startDay).format("YYYY년 MM월 DD일")}
                      </div>
                    ) : (
                      <div className="date">
                        {moment(startDay).format("YY.MM.DD")}
                      </div>
                    )}

                    <div
                      className={`calendar ${
                        activeEndDate ? "visible" : "hidden"
                      }`}
                    >
                      <Calendar onChange={setEndDay} value={endDay} />
                    </div>
                  </div>
                  <button
                    className="show-result"
                    onClick={setFilterSeletedDate}
                  >
                    완료
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="search-level-container">
            <div className="filter-title">LEVEL</div>
            <div className="level-range">
              <LevelRange getSelectedLevel={getSelectedLevel} />
            </div>
          </div>
          {newsList && (
            <>
              <div className="search-result">
                <span>검색 결과: {totalCnt}건 </span>
                <div onClick={() => setIsFilterModal(true)}>
                  <Filter />
                </div>
              </div>
              <div className="search-top-news">
                {newsList &&
                  newsList.slice(0, 3).map((news, i) => (
                    <div className="top-news" key={i}>
                      <HotNewsCard
                        news={news}
                        isMobile={isMobile}
                        query={params.query}
                        isScrap={scrapList.includes(news.n_id)}
                      ></HotNewsCard>
                    </div>
                  ))}
              </div>

              <div className="search-newslist">
                {newsList &&
                  newsList.slice(3).map((e, i) => (
                    <div className="news-result" key={i}>
                      <NewsCard
                        news={e}
                        stretch={!isMobile}
                        query={params.query}
                        isScrap={scrapList.includes(e.n_id)}
                      />
                    </div>
                  ))}
              </div>
              {isExistMoreNews && (
                <div
                  className="newslist-morebtn-container"
                  onClick={() => setPage((page) => page + 1)}
                >
                  <button className="newslist-morebtn">더보기</button>
                </div>
              )}
            </>
          )}
          <TopBtn></TopBtn>
          {isFilterModal && (
            <FilterModal
              text={"수정하기"}
              closeHandler={onCloseClick}
              sendApi={doCategoryFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </>
        {/* )} */}
      </>
    </div>
  );
}

export default SearchList;
