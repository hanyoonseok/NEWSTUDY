import "./style.scss";
import Dailyword from "assets/dailyword.jpg";

export default function Page3() {
  return (
    <div className="page-color-div">
      <div className="contents-div">
        <h1 className="title-h1">
          데일리 콘텐츠를 통해
          <br /> <b>오늘의 단어</b>를 공부할 수 있습니다.sdasd
        </h1>
        <h3 className="subdescription-h3">
          매일매일 새로운 단어를 배워봐용 <br /> 너무 좋을 것 같아용
        </h3>
      </div>
      <img src={Dailyword} alt="" className="dailyword-img" />
    </div>
  );
}
