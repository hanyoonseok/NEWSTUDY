import React, { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
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

export default function NewsDetail() {
  const { newsId } = useParams();
  const [selectedWord, setSelectedWord] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsKeywords, setNewsKeywords] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const news = {
    img: "",
    title:
      "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
    body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
    date: "Wed, September 7, 2022",
    category: "SPORTS",
    level: "c",
  };

  const words = [
    {
      id: 1,
      eng: "ant",
      mean: "개미",
    },
    { id: 2, eng: "champion", mean: "탬피언" },
    { id: 3, eng: "world biggest fan", mean: "세계 제일 큰 팬" },
    { id: 4, eng: "ant1", mean: "개미1" },
    { id: 5, eng: "champion1", mean: "탬피언1" },
    { id: 6, eng: "world biggest fan1", mean: "세계 제일 큰 팬1" },
    { id: 7, eng: "ant2", mean: "개미2" },
    { id: 8, eng: "champion2", mean: "탬피언2" },
    { id: 9, eng: "world biggest fan2", mean: "세계 제일 큰 팬2" },
  ];

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
    const utterThis = new SpeechSynthesisUtterance(news.body);
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
      const newsDetailResponse = await axios.get(`/news/${newsId}`);
      setNewsDetail(newsDetailResponse.data);

      const newsKeywordsResponse = await axios.get(`/news/keyword/${newsId}`);
      setNewsKeywords(newsKeywordsResponse.data);

      const relatedNewsResponse = await axios.get(`/news/related/${newsId}`);
      setRelatedNews(relatedNewsResponse.data);
    };

    fetchData();
  }, []);

  const onScrapClick = useCallback(async () => {
    const addScrapResponse = await axios.post("/scrap");
    console.log(addScrapResponse);
  }, []);

  return (
    <div className="newsdetail-container">
      <div className="back-btn-wrapper">
        <button className="back-btn"></button>
      </div>
      <div className="newsdetail-content-div">
        <section className="news-section">
          <h1 className="news-title">
            An Overseas news story that fits the difficulty
          </h1>
          <p className="news-date">Wed, September 7, 2022</p>
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
              {words.map((e) => {
                return (
                  <div
                    className={`word-drug ${
                      selectedWord && selectedWord.eng === e.eng ? "on" : ""
                    }`}
                    onClick={() => onWordDrugClick(e)}
                    key={e.id}
                  >
                    {e.eng}
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
                <div className="icon-row">
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
          <p className="news-article">
            This weekend, we’ll be back at STAPLES Center going against Samsung
            Galaxy in the world championship final. As always, we expect to win.
            <br />
            My time with SKT has already been such an amazing journey, and I’m
            thankful for every day of it. Earlier this year, I felt myself
            gradually getting weaker. It was like my skills were getting worse
            and the rest of the world was gaining on me. I’ve often wondered
            what makes me great at League of Legends, and the best way I can
            describe it is that I structure my playstyle through calculation and
            intuition. I’m always learning new things. I can predict events
            before they happen, and that helps me to be in the right place and
            make the right play a step sooner than everyone else. For a while
            there it felt like my intuition was off, and I didn’t know if I
            could recover. But right now I feel like I can play forever. At the
          </p>
        </section>
        <section className="related-article-section">
          <h3 className="news-subtitle">Related Articles</h3>
          <div className="news-card-wrapper">
            <NewsCard news={news} />
            <NewsCard news={news} />
            <NewsCard news={news} />
          </div>
        </section>
      </div>
    </div>
  );
}
