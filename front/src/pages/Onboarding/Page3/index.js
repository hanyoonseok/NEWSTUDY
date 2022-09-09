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
      </div>
      <img src={Dailyword} alt="" className="dailyword-img" />
    </div>
  );
}
