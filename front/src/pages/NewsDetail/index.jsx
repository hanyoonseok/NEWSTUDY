import React, { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

import "./style.scss";
import NewsCard from "components/NewsCard";
import TextToSpeech from "./TextToSpeech";
import { intToLevel } from "constants";
import BadgeModal from "components/BadgeModal";
import Modal from "components/Modal";
import NewsContent from "./NewsContent";
import BackBtn from "components/BackBtn";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [selectedWord, setSelectedWord] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsKeywords, setNewsKeywords] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isScrapped, setIsScrapped] = useState(false);
  const [newBadgeInfo, setNewBadgeInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userState = useSelector((state) => state.user);

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userState.accessToken}`;
      const newsDetailResponse = await axios.get(`/news/${newsId}`);
      newsDetailResponse.data.date = moment(
        newsDetailResponse.data.date,
      ).format("ddd, MMMM, DD, YYYY");
      setNewsDetail(newsDetailResponse.data);
      console.log("뉴스 상세 : ", newsDetailResponse);

      const newsKeywordsResponse = await axios.get(`/news/keyword/${newsId}`);
      setNewsKeywords(newsKeywordsResponse.data);
      console.log("키워드 리스트 : ", newsKeywordsResponse);

      const relatedNewsResponse = await axios.get(`/news/related/${newsId}`);
      setRelatedNews(relatedNewsResponse.data);
      console.log("관련 기사 : ", relatedNewsResponse);

      const scrapListResponse = await axios.get("/scrap");

      setIsScrapped(
        scrapListResponse.data.filter((e) => e.n_id === parseInt(newsId))
          .length > 0,
      );

      if (!window.scrollY) return;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    fetchData();
  }, [newsId]);

  const onWordDrugClick = useCallback(
    (word) => {
      if (!isMobile) return;

      if (!selectedWord) setSelectedWord(word);
      else if (word.eng === selectedWord.eng) setSelectedWord(null);
      else setSelectedWord(word);
    },
    [isMobile, selectedWord],
  );

  const onScrapClick = useCallback(async () => {
    const payload = {
      n_id: parseInt(newsId),
    };
    isScrapped
      ? await axios.delete(`/scrap/${newsId}`, payload)
      : await axios.post("/scrap", payload);

    if (!isScrapped) {
      setIsModalOpen(true);

      setTimeout(async () => {
        setIsModalOpen(false);

        axios.get("/badge/new").then((res) => {
          res.data.length > 0 && setNewBadgeInfo(res.data[0]);
        });
      }, 1200);
    }

    setIsScrapped((prev) => !prev);
  }, [isScrapped]);

  return (
    <div className="newsdetail-container">
      <BackBtn />
      <div className="newsdetail-content-div">
        {newsDetail && (
          <>
            <section className="news-section">
              <h1 className="news-title">
                {" "}
                <i
                  className={`news-title-level ${
                    newsDetail.level <= 2
                      ? "Alv"
                      : newsDetail.level <= 4
                      ? "Blv"
                      : "Clv"
                  }`}
                >
                  {intToLevel[newsDetail.level]}
                </i>
                 {newsDetail.title}
              </h1>
              <p className="news-date">{newsDetail.date}</p>
              {isMobile && (
                <TextToSpeech
                  isScrapped={isScrapped}
                  setIsScrapped={setIsScrapped}
                  news={newsDetail}
                  onScrapClick={onScrapClick}
                />
              )}
              <h3 className="news-subtitle change">VOCABULARY</h3>
              <div className="news-hot-word">
                <section className="words-container">
                  {newsKeywords.length > 0 &&
                    newsKeywords.map((e, i) => {
                      return (
                        <div
                          className={`word-drug ${
                            selectedWord && selectedWord.eng === e.eng
                              ? "on"
                              : ""
                          }`}
                          onClick={() => onWordDrugClick(e)}
                          key={i}
                        >
                          {e}
                        </div>
                      );
                    })}
                </section>
                {!isMobile && (
                  <TextToSpeech
                    isScrapped={isScrapped}
                    setIsScrapped={setIsScrapped}
                    news={newsDetail}
                    onScrapClick={onScrapClick}
                  />
                )}
                {selectedWord && (
                  <div className="word-mean-container">
                    <h3 className="word-mean-title">{selectedWord.eng}</h3>
                    <h4 className="word-mean">{selectedWord.mean}</h4>
                  </div>
                )}
              </div>
              {isMobile && <h3 className="news-subtitle change">ARTICLE</h3>}
              {newsDetail.thumbnail && (
                <div className="newsdetail-thumbnail-wrapper">
                  <img
                    src={newsDetail.thumbnail}
                    alt="뉴스 상세 썸네일"
                    className="newsdetail-thumbnail"
                  />
                </div>
              )}
              <div className="news-article">
                <NewsContent content={newsDetail.content} />
              </div>
            </section>
            <section className="related-article-section">
              <h3 className="news-subtitle">Related Articles</h3>
              <div className="news-card-wrapper">
                {relatedNews.length > 0 &&
                  relatedNews.map((e) => {
                    return <NewsCard news={e} key={e.n_id} />;
                  })}
              </div>
            </section>
          </>
        )}
      </div>
      {newBadgeInfo && (
        <BadgeModal
          index={newBadgeInfo.b_id}
          text={newBadgeInfo.name}
          setStatus={setNewBadgeInfo}
        />
      )}

      {isModalOpen && (
        <Modal text="스크랩 되었습니다!" setStatus={setIsModalOpen} />
      )}
    </div>
  );
}
