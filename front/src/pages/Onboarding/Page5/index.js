import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "pages/Onboarding/Page5/style.scss";
import Page5Img from "assets/page5-img.png";

export default function Page5() {
  return (
    <div className="page-color-div">
      <div className="contents-div">
        <h1 className="title-h1">
          <b>핵심단어, TTS, 번역</b>기능을 이용해서
          <br /> 기사를 쉽게 읽어보세요.
        </h1>
        <h3 className="subdescription-h3">
          기사의 빈출 단어를 제공해드려요
          <br /> 모르는 단어는 마우스만 올리세요 <br /> TTS 기능을 통해 따라
          읽어보세요
        </h3>

        <div className="iconset-div">
          <div className="icon-row">
            <i>
              <FontAwesomeIcon icon={faVolumeUp} />
            </i>
            <div className="icon-desc">영문장을 읽어주는 TTS</div>
          </div>
        </div>
      </div>
      <img src={Page5Img} alt="" className="main-img" />
    </div>
  );
}
