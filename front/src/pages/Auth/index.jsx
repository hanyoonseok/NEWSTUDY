import "./style.scss";
import React, { useState, useEffect } from "react";
import PaperBg from "assets/paper-background.png";
import Modal from "components/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DarkToggle from "components/DarkToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  const localStorageDark = localStorage.getItem("dark");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorageDark === null || localStorageDark === "false")
      setIsDark(false);
    else setIsDark(true);
  }, [localStorageDark]);

  return (
    <div className={`auth-wrapper ${isDark ? "dark" : ""}`}>
      <div className="auth-body">
        <div className="auth-top-div">
          <DarkToggle isDark={isDark} setIsDark={setIsDark} />
          <Link to="/" className="home">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>
        <div className="auth-bottom-div">
          <div className="left-div">
            <div className="logo-img"></div>
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
            <div className="content">
              <img
                src={PaperBg}
                alt="종이 배경이미지"
                className="content-backgroundimg"
              />
              {tabContent[activeId]}
            </div>
          </div>
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
    </div>
  );
}
