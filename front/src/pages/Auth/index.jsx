import "./style.scss";
import { useState } from "react";
import React from "react";

import PaperBg from "assets/paper-background.png";
import Modal from "components/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const [isEmailModal, setIsEmailModal] = useState(false);

  const tabContent = {
    0: <SignIn />,
    1: <SignUp setIsEmailModal={setIsEmailModal} />,
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
          <div className="content"><img src={PaperBg} alt="종이 배경이미지" className="content-backgroundimg"/>{tabContent[activeId]}</div>
        </div>
      </div>
      {isEmailModal && (
        <Modal
          text={
            "이메일로 인증키가 발송됐습니다.\n인증키를 확인하고 입력해주세요!"
          }
          setStatus={setIsEmailModal}
        />
      )}
    </>
  );
}
