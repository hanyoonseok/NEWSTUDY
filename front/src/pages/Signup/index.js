import "./style.scss";
import Input from "./input";
import { useEffect, useState } from "react";

export default function Signup() {
  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: (
      <div className="login">
        <Input placeholder="이메일을 입력하세요." />
        <Input placeholder="비밀번호를 입력하세요." />
        <button className="login-btn">로그인</button>
      </div>
    ),
    1: (
      <div className="signup">
        <div className="email-box">
          <Input placeholder="이메일을 입력하세요." />
          <button>인증</button>
        </div>
        <Input placeholder="인증키를 입력하세요." />
        <Input placeholder="비밀번호를 입력하세요." />
        <Input placeholder="비밀번호를 다시 입력하세요." />
        <Input placeholder="닉네임을 입력하세요." />
        <button className="signup-btn">가입하기</button>
      </div>
    ),
  };

  return (
    <>
      <div className="background-div">
        <div className="left-div">
          <div className="logo-img">
            <img src={require("assets/logo.png")}></img>
          </div>
          <div className="earth-img">
            <img src={require("assets/earth-component.png")}></img>
          </div>
        </div>
        <div className="right-div">
          <div className="tab">
            <button
              className={`${activeId === 0 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(0)}
            >
              로그인
            </button>
            <button
              className={`${activeId === 1 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(1)}
            >
              회원가입
            </button>
          </div>
          <div className="content">{tabContent[activeId]}</div>
        </div>
      </div>
    </>
  );
}
