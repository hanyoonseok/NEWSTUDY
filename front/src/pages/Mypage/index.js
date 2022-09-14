import "./style.scss";

export default function Mypage() {
  const user = {
    name: "김싸피",
    email: "kimssafy@ssafy.com",
  };

  return (
    <div className="mypage">
      <div className="top-box">
        <div className="badge">
          <img
            src={require("assets/user_globe.png")}
            alt="사용자 프로필 지구본"
          ></img>
          <p>배지변경</p>
        </div>
        <div className="info-box">
          <p className="name">{user.name}</p>
          <p className="email">이메일 폰트어썸 들어갈자리이 {user.email}</p>
        </div>
      </div>
      <div className="bottom-box">
        <div className="left-box">
          dd
          <div className="current"></div>
          <div className="interest"></div>
        </div>
        <div className="right-box">dd</div>
      </div>
    </div>
  );
}
