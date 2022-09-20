import "./style.scss";
import Input from "./input";
import { useState } from "react";
import React from "react";

export default function Signup() {
  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: (
      <form className="login">
        <p></p>
        <Input type="email" placeholder="이메일을 입력하세요." />
        <Input type="password" placeholder="비밀번호를 입력하세요." />
        <button className="login-btn">로그인</button>
        <p></p>
      </form>
    ),
    1: (
      <form className="signup">
        <div className="email-box">
          <Input type="email" placeholder="이메일을 입력하세요." />
          <button>인증</button>
        </div>
        <Input type="text" placeholder="인증키를 입력하세요." />
        <Input type="password" placeholder="비밀번호를 입력하세요." />
        <Input type="password" placeholder="비밀번호를 다시 입력하세요." />
        <Input type="text" placeholder="닉네임을 입력하세요." />
        <button className="signup-btn">가입하기</button>
      </form>
    ),
  };

  return (
    <>
      <div className="background-div">
        <div className="left-div">
          <div className="logo-img">
            <img src={require("assets/logo.png")} alt="로고이미지"></img>
          </div>
          <div className="earth-img">
            <img
              src={require("assets/earth-component.png")}
              alt="지구 컴포넌트 이미지"
            ></img>
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
