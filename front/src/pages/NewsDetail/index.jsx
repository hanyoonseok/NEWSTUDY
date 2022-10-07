import React, { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import NewsCard from "components/NewsCard";
import TextToSpeech from "./TextToSpeech";
import { intToLevel, constTrans } from "constants";
import BadgeModal from "components/BadgeModal";
import Modal from "components/Modal";
import NewsContent from "./NewsContent";
import BackBtn from "components/BackBtn";
import WordDrug from "./WordDrug";
import Loading from "components/Loading";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [selectedWord, setSelectedWord] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsKeywords, setNewsKeywords] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [scrapList, setScrapList] = useState([]);
  const [isScrapped, setIsScrapped] = useState(false);
  const [newBadgeInfo, setNewBadgeInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [engContent, setEngContent] = useState("");
  const [korContent, setKorContent] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(null);
  const [vocaSet, setVocaSet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const constNID = "204180";

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
      setEngContent(newsDetailResponse.data.content);

      const newsKeywordsResponse = await axios.get(`/news/keyword/${newsId}`);
      setNewsKeywords(newsKeywordsResponse.data);

      const scrapListResponse = await axios.get("/scrap");
      const scrapListNidArr = scrapListResponse.data.map((e) => e.n_id);
      setScrapList(scrapListNidArr);
      setIsScrapped(scrapListNidArr.includes(parseInt(newsId)));

      const relatedNewsResponse = await axios.get(`/news/related/${newsId}`);
      setRelatedNews(relatedNewsResponse.data);

      if (!window.scrollY) return;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    fetchData();
  }, [newsId]);

  const onWordDrugClick = useCallback(
    async (word) => {
      if (vocaSet[word]) {
        setSelectedWord({ eng: word, kor: vocaSet[word] });
        setIsLoading(false);
      } else {
        await axios
          .post("/translate", {
            input: word,
          })
          .then((res) => {
            if (res.data.errorCode === "010") {
              setIsAlertOpen(
                "일일 쿼리 한도를 초과해서 해석이 불가합니다 ㅜㅜ",
              );

              return null;
            } else if (res.data.errorCode === "-10001") {
              setIsAlertOpen("해석이 불가한 구문이 포함되어 있습니다");

              return null;
            }

            const kor = res.data.message.result.translatedText;
            setVocaSet({ ...vocaSet, [word]: kor });
            setSelectedWord({ eng: word, kor });
          });
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [isMobile, vocaSet],
  );

  const onAddWordClick = useCallback(async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userState.accessToken}`,
      },
    };
    await axios
      .post("/vocaburary", { eng: selectedWord.eng }, headers)
      .then(() => {
        setIsModalOpen("단어장에 추가 완료");

        axios.get("/badge/new", headers).then((res) => {
          if (res.data.length > 0) {
            setNewBadgeInfo(res.data[0]);
          }
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setIsModalOpen("이미 추가된 단어입니다");
        }
      });
  }, [selectedWord]);

  const onScrapClick = useCallback(async () => {
    const payload = {
      n_id: parseInt(newsId),
    };
    isScrapped
      ? await axios.delete(`/scrap/${newsId}`, payload)
      : await axios.post("/scrap", payload);

    if (!isScrapped) {
      setIsModalOpen("스크랩 되었습니다!");

      axios.get("/badge/new").then((res) => {
        res.data.length > 0 && setNewBadgeInfo(res.data[0]);
      });
    }

    setIsScrapped((prev) => !prev);
  }, [isScrapped]);

  const onTransClick = useCallback(async () => {
    if (isTranslated) {
      setIsTranslated(false);
    } else {
      /// for 발표
      if (newsId === constNID) {
        const korArchitect = [];
        constTrans.forEach((e, i) => {
          if (e.tag === "p") {
            korArchitect.push(
              <p className="newsdetail-content-body" key={i}>
                {e.kor}
              </p>,
            );
          } else if (e.tag === "img") {
            korArchitect.push(
              <div className="newsdetail-content-img-wrapper" key={i}>
                <img
                  src={e.kor}
                  alt="기사 본문 이미지"
                  className="newsdetail-content-img"
                />
              </div>,
            );
          } else if (e.tag === "h3") {
            korArchitect.push(
              <h3 className="newsdetail-content-subtitle" key={i}>
                <b>“</b> {e.kor} <b>”</b>
              </h3>,
            );
          }
        });
        setIsTranslated(true);
        setKorContent(korArchitect);
        return;
      }
      ///

      if (korContent.length === 0) {
        const korArchitect = [];

        const splitDetail = newsDetail.content.split("@@div");
        for (let i = 0; i < splitDetail.length; i++) {
          if (splitDetail[i] !== "") {
            if (splitDetail[i].substring(0, 3) === "img") {
              if (
                splitDetail[i].substring(
                  splitDetail[i].length - (splitDetail[i].length - 3) !==
                    newsDetail.thumbnail,
                )
              ) {
                korArchitect.push(
                  <div className="newsdetail-content-img-wrapper" key={i}>
                    <img
                      src={splitDetail[i].substring(
                        splitDetail[i].length - (splitDetail[i].length - 3),
                      )}
                      alt="기사 본문 이미지"
                      className="newsdetail-content-img"
                    />
                  </div>,
                );
              }
            } else if (splitDetail[i].substring(0, 8) === "subtitle") {
              const subtitle = getTranslated(
                splitDetail[i].substring(
                  splitDetail[i].length - (splitDetail[i].length - 8),
                ),
              );

              korArchitect.push(
                <h3 className="newsdetail-content-subtitle" key={i}>
                  <b>“</b> {subtitle} <b>”</b>
                </h3>,
              );
            } else {
              const dotDivide = splitDetail[i].split(".");
              let curString = "";
              let completeString = "";

              dotDivide.forEach(async (e, i) => {
                if (curString.length + e.length < 250) curString += e + ".";
                else {
                  const translated = getTranslated(curString);
                  if (!translated) return;
                  completeString += translated;
                  curString = e + ".";
                }
              });

              if (curString !== "") {
                const translated = getTranslated(curString);
                if (!translated) return;
                completeString += translated;
              }

              korArchitect.push(
                <p className="newsdetail-content-body" key={i}>
                  {completeString.replace(/(?:\r\n|\r|\n)/g, "\n\n")}
                </p>,
              );
            }
          }
        }

        setKorContent(korArchitect);
      } else setIsTranslated(true);
      setIsTranslated(true);
    }
  }, [engContent, korContent, isTranslated]);

  const getTranslated = (string) => {
    axios
      .post("/translate", {
        input: string,
      })
      .then((res) => {
        if (res.data.errorCode === "010") {
          setIsAlertOpen("일일 쿼리 한도를 초과해서 해석이 불가합니다 ㅜㅜ");

          return null;
        } else if (res.data.errorCode === "-10001") {
          setIsAlertOpen("해석이 불가한 구문이 포함되어 있습니다");

          return null;
        }

        return res.data.message.result.translatedText;
      });
  };

  return (
    <div className="newsdetail-container">
      <BackBtn />
      <div className="newsdetail-content-div">
        {isLoading ? (
          <Loading />
        ) : (
          newsDetail && (
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
                    news={newsDetail}
                    onScrapClick={onScrapClick}
                    onTransClick={onTransClick}
                    isTranslated={isTranslated}
                  />
                )}
                <h3 className="news-subtitle change">VOCABULARY</h3>
                <div className="news-hot-word">
                  <section className="words-container">
                    {newsKeywords.length > 0 &&
                      newsKeywords.map((e, i) => {
                        return (
                          <WordDrug
                            word={e}
                            selectedWord={selectedWord}
                            onWordDrugClick={onWordDrugClick}
                            onAddWordClick={onAddWordClick}
                            key={i}
                          />
                        );
                      })}
                  </section>
                  {!isMobile && (
                    <TextToSpeech
                      isScrapped={isScrapped}
                      news={newsDetail}
                      onScrapClick={onScrapClick}
                      onTransClick={onTransClick}
                      isTranslated={isTranslated}
                    />
                  )}
                </div>
                {selectedWord && (
                  <div className="news-voca-container">
                    <h3 className="news-subtitle change">MEAN ?</h3>
                    <label className="news-selectedword-kor">
                      {selectedWord.kor} &nbsp;
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="selectedword-addbtn"
                        onClick={onAddWordClick}
                      />
                    </label>
                  </div>
                )}
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
                  <NewsContent
                    content={isTranslated ? korContent : engContent}
                    newsKeywords={newsKeywords}
                    isTranslated={isTranslated}
                    thumbnail={newsDetail.thumbnail}
                    onWordDrugClick={onWordDrugClick}
                  />
                </div>
                <footer className="newsdetail-content-footer">
                  {`[출처 : ${newsDetail.origin.toUpperCase()}]`}
                </footer>
              </section>
              <section className="related-article-section">
                <h3 className="news-subtitle">Related Articles</h3>
                <div className="news-card-wrapper">
                  {relatedNews.length > 0 &&
                    relatedNews.map((e) => {
                      return (
                        <NewsCard
                          news={e}
                          key={e.n_id}
                          isScrap={scrapList.includes(e.n_id)}
                        />
                      );
                    })}
                </div>
              </section>
            </>
          )
        )}
      </div>
      {newBadgeInfo && (
        <BadgeModal
          index={newBadgeInfo.b_id}
          text={newBadgeInfo.name}
          setStatus={setNewBadgeInfo}
        />
      )}

      {isAlertOpen && <Modal text={isAlertOpen} setStatus={setIsAlertOpen} />}

      {isAlertOpen && <Modal text={isModalOpen} setStatus={setIsModalOpen} />}
    </div>
  );
}
