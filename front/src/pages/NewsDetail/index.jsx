import React, { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import Test from "assets/article.png";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [selectedWord, setSelectedWord] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsKeywords, setNewsKeywords] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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

  const synth = window.speechSynthesis;

  const textToSpeech = () => {
    console.log("textToSpeech");
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof synth === "undefined"
    ) {
      console.log("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }
    const utterThis = new SpeechSynthesisUtterance(newsDetail.content);
    utterThis.lang = "en-US"; //언어설정
    utterThis.pitch = 1; //피치
    utterThis.rate = 1; //속도
    synth.speak(utterThis);
  };

  const speechPause = () => {
    //일시정지
    synth.pause();
  };

  const speechStop = () => {
    //정지
    synth.cancel();
  };

  const speechResume = () => {
    //이어서 시작
    synth.resume();
  };

  const [isTextToSpeechStatus, setIsTextToSpeechStatus] = useState(false); //발음듣기 상태 여부
  const [isPauseStatus, setIsPauseStatus] = useState(false); //일시정지 버튼 누른 여부

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser.accessToken}`;
      const newsDetailResponse = await axios.get(`/news/${newsId}`);
      setNewsDetail(newsDetailResponse.data);
      console.log(newsDetailResponse);

      const newsKeywordsResponse = await axios.get(`/news/keyword/${newsId}`);
      setNewsKeywords(newsKeywordsResponse.data);
      console.log(newsKeywordsResponse);

      const relatedNewsResponse = await axios.get(`/news/related/${newsId}`);
      setRelatedNews(relatedNewsResponse.data);
      console.log(relatedNewsResponse);
    };

    fetchData();
  }, []);

  const onScrapClick = useCallback(async () => {
    const payload = {
      Authorization: `Bearer ${currentUser.accessToken}`,
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
              {isMobile && (
                <section className="functions-container">
                  {!isTextToSpeechStatus ? (
                    <div
                      className="icon-row"
                      onClick={() => {
                        setIsTextToSpeechStatus(true);
                        textToSpeech();
                      }}
                    >
                      <i>
                        <FontAwesomeIcon icon={faVolumeUp} />
                      </i>
                      <div className="icon-desc">발음듣기</div>
                    </div>
                  ) : (
                    <>
                      <>
                        {!isPauseStatus ? (
                          <div
                            className="icon-row"
                            onClick={(e) => {
                              setIsPauseStatus(true);
                              speechPause(e);
                            }}
                          >
                            <i>
                              <FontAwesomeIcon icon={faPause} />
                            </i>
                            <div className="icon-desc">일시정지</div>
                          </div>
                        ) : (
                          <div
                            className="icon-row"
                            onClick={(e) => {
                              setIsPauseStatus(false);
                              speechResume(e);
                            }}
                          >
                            <i>
                              <FontAwesomeIcon icon={faPlay} />
                            </i>
                            <div className="icon-desc">이어서</div>
                          </div>
                        )}
                      </>
                      <div
                        className="icon-row"
                        onClick={(e) => {
                          setIsPauseStatus(false);
                          setIsTextToSpeechStatus(false);
                          speechStop();
                        }}
                      >
                        <i>
                          <FontAwesomeIcon icon={faStop} />
                        </i>
                        <div className="icon-desc">정지</div>
                      </div>
                    </>
                  )}

                  <div className="icon-row">
                    <i>
                      <FontAwesomeIcon icon={faGlobe} />
                    </i>
                    <div className="icon-desc">번역보기</div>
                  </div>
                  <div className="icon-row" onClick={onScrapClick}>
                    <i>
                      <FontAwesomeIcon icon={faBookmark} />
                    </i>
                    <div className="icon-desc">스크랩</div>
                  </div>
                </section>
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
                  <section className="functions-container">
                    {!isTextToSpeechStatus ? (
                      <div
                        className="icon-row"
                        onClick={() => {
                          setIsTextToSpeechStatus(true);
                          textToSpeech();
                        }}
                      >
                        <i>
                          <FontAwesomeIcon icon={faVolumeUp} />
                        </i>
                        <div className="icon-desc">발음듣기</div>
                      </div>
                    ) : (
                      <>
                        <>
                          {!isPauseStatus ? (
                            <div
                              className="icon-row"
                              onClick={(e) => {
                                setIsPauseStatus(true);
                                speechPause(e);
                              }}
                            >
                              <i>
                                <FontAwesomeIcon icon={faPause} />
                              </i>
                              <div className="icon-desc">일시정지</div>
                            </div>
                          ) : (
                            <div
                              className="icon-row"
                              onClick={(e) => {
                                setIsPauseStatus(false);
                                speechResume(e);
                              }}
                            >
                              <i>
                                <FontAwesomeIcon icon={faPlay} />
                              </i>
                              <div className="icon-desc">이어서</div>
                            </div>
                          )}
                        </>
                        <div
                          className="icon-row"
                          onClick={(e) => {
                            setIsPauseStatus(false);
                            setIsTextToSpeechStatus(false);
                            speechStop();
                          }}
                        >
                          <i>
                            <FontAwesomeIcon icon={faStop} />
                          </i>
                          <div className="icon-desc">정지</div>
                        </div>
                      </>
                    )}

                    <div className="icon-row">
                      <i>
                        <FontAwesomeIcon icon={faGlobe} />
                      </i>
                      <div className="icon-desc">번역보기</div>
                    </div>
                    <div className="icon-row" onClick={onScrapClick}>
                      <i>
                        <FontAwesomeIcon icon={faBookmark} />
                      </i>
                      <div className="icon-desc">스크랩</div>
                    </div>
                  </section>
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
                    src={Test}
                    // src={newsDetail.thumbnail}
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
