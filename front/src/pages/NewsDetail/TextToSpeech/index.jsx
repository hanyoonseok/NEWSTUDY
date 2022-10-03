import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faGlobe,
  faBookmark,
  faPause,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";

export default function TextToSpeech({ news, onScrapClick, isScrapped }) {
  const synth = window.speechSynthesis;

  const textToSpeech = useCallback(() => {
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof synth === "undefined"
    ) {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }
    const byteLength = news.content.replace(
      /[\0-\x7f]:([0-\u07ff]:(.))/g,
      "$&$1$2",
    ).length;
    if (byteLength >= 32000) {
      alert("너무 길어서 지원이 안됩니다 ㅠㅠ");
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(news.content);
    utterThis.lang = "en-US"; //언어설정
    utterThis.pitch = 1; //피치
    utterThis.rate = 1; //속도
    synth.speak(utterThis);
  }, [news.content]);

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
    speechStop();
  }, []);

  return (
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
        <div className="icon-desc">{isScrapped ? "스크랩 취소" : "스크랩"}</div>
      </div>
    </section>
  );
}
