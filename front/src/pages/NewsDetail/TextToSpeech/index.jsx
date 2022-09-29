import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faGlobe,
  faBookmark,
  faPause,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export default function TextToSpeech({ news }) {
  const synth = window.speechSynthesis;

  const textToSpeech = () => {
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof synth === "undefined"
    ) {
      console.log("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }
    const utterThis = new SpeechSynthesisUtterance(news.content);
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
      <div className="icon-row">
        <i>
          <FontAwesomeIcon icon={faBookmark} />
        </i>
        <div className="icon-desc">스크랩</div>
      </div>
    </section>
  );
}
