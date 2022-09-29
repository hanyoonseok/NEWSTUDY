import React, { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faGlobe,
  faBookmark,
  faPause,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import NewsCard from "components/NewsCard";
import TextToSpeech from "./TextToSpeech";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [selectedWord, setSelectedWord] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsKeywords, setNewsKeywords] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const userState = useSelector((state) => state.user);

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const onWordDrugClick = useCallback(
    (word) => {
      if (!isMobile) return;

      if (!selectedWord) setSelectedWord(word);
      else if (word.eng === selectedWord.eng) setSelectedWord(null);
      else setSelectedWord(word);
    },
    [isMobile, selectedWord],
  );


  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userState.accessToken}`;
      const newsDetailResponse = await axios.get(`/news/${newsId}`);
      newsDetailResponse.data.date = moment(newsDetailResponse.data.date).format("ddd, MMMM, DD, YYYY");
      setNewsDetail(newsDetailResponse.data);
      console.log("뉴스 상세 : ", newsDetailResponse);

      const newsKeywordsResponse = await axios.get(`/news/keyword/${newsId}`);
      setNewsKeywords(newsKeywordsResponse.data);
      console.log("키워드 리스트 : ",newsKeywordsResponse);

      const relatedNewsResponse = await axios.get(`/news/related/${newsId}`);
      setRelatedNews(relatedNewsResponse.data);
      console.log("관련 기사 : ",relatedNewsResponse);
    };

    fetchData();
  }, []);


  const onScrapClick = useCallback(async () => {
    const payload = {
      Authorization: `Bearer ${userState.accessToken}`,
      n_id: newsId,
    };
    const addScrapResponse = await axios.post("/scrap", payload);
    console.log(addScrapResponse);
  }, []);

  return (
    <div className="newsdetail-container">
      <div className="back-btn-wrapper">
        <button className="back-btn"></button>
      </div>
      <div className="newsdetail-content-div">
        {newsDetail && (
          <>
            <section className="news-section">
              <h1 className="news-title">{newsDetail.title}</h1>
              <p className="news-date">{newsDetail.date}</p>
              {isMobile && <TextToSpeech news={newsDetail} />}
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
                {!isMobile && <TextToSpeech news={newsDetail} />}
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
              <p className="news-article">{newsDetail.content}</p>
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
    </div>
  );
}
