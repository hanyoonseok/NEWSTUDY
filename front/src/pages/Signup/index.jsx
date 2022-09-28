import "./style.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "modules/user/user";
import { authEmail } from "modules/user/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import axios from "axios";
import Modal from "components/Modal";

export default function Signup() {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const [Email, setEmail] = useState("");
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false); //이메일 중복 여부
  const [AuthKey, setAuthKey] = useState("");
  const [receiveAuthKey, setReceiveAuthKey] = useState("1"); //백에서 보내줄 인증키
  const [isAuthKey, setIsAuthKey] = useState(true); //인증키 일치 여부
  const [Password, setPassword] = useState("");
  const [ConfirmPw, setConfirmPw] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(true); //비밀번호 일치 여부
  const [Nickname, setNickname] = useState("");
  const [isEmailModal, setIsEmailModal] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onAuthKeyHandler = (e) => {
    setAuthKey(e.currentTarget.value);
  };
  const onAuthKeyUp = () => {
    // 인증키 일치 검사
    if (receiveAuthKey === AuthKey) {
      setIsAuthKey(true);
    } else {
      setIsAuthKey(false);
    }
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPwHandler = (e) => {
    setConfirmPw(e.currentTarget.value);
  };
  const onConfirmPwKeyup = (e) => {
    console.log(Password, ConfirmPw);
    //비밀번호 일치 검사
    if (Password !== ConfirmPw) {
      setIsConfirmed(false);
    } else {
      setIsConfirmed(true);
    }
    setConfirmPw(e.currentTarget.value);
  };
  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  const onClickAuthEmail = async (e) => {
    e.preventDefault();
    console.log("이메일 인증 클릭함");
    setIsEmailModal(true);
    // 중복검사 했는데 중복 이메일일 경우
    // await axios
    //   .post(`${process.env.REACT_APP_API_URL}/user/mail`, {
    //     email: Email,
    //   })
    //   .then((res) => {
    //     console.log("res", res); // 여기서 넘어오는 key를 receiveAuthKey에 저장
    //     setIsDuplicateEmail(true);
    //     setIsEmailModal(true);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     setIsDuplicateEmail(false);
    //   });
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    const user = {
      email: Email,
      pw: Password,
    };
    dispatch(loginUser(user)).then((res) => {
      console.log("로그인 성공 ");
      window.location.replace("/landing");
    });
  };

  const onSignupHandler = (e) => {
    e.preventDefault();
    if (isConfirmed) {
      const user = {
        email: Email,
        pw: Password,
        nickname: Nickname,
        level: 1,
      };
      dispatch(signupUser(user)).then((res) => {
        console.log("회원가입 성공 ", res);
        //회원가입 성공하면 바로 로그인처리
        dispatch(loginUser(user)).then((res) => {
          //로그인끝나면 레벨테스트로 이동
          window.location.replace("/leveltest");
        });
      });
    }
  };

  const tabContent = {
    0: (
      <form className="login" onSubmit={onLoginHandler}>
        <p></p>
        <div className="input-div">
          <div className="box"></div>
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            value={Email}
            onChange={onEmailHandler}
            required
          />
        </div>
        <div className="input-div">
          <div className="box"></div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={Password}
            onChange={onPasswordHandler}
            required
          />
        </div>
        <button className="login-btn">로그인</button>
        <p></p>
      </form>
    ),
    1: (
      <form className="signup" onSubmit={onSignupHandler}>
        <div className="email-box">
          <div className="input-div">
            <div className="box"></div>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              value={Email}
              onChange={onEmailHandler}
              required
            />
          </div>
          <button onClick={(e) => onClickAuthEmail(e)}>인증</button>
        </div>
        {isDuplicateEmail ? (
          <p className="error">
            <FontAwesomeIcon icon={faTriangleExclamation} /> 중복된
            이메일입니다.
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
        <div className="input-div">
          <div className="box"></div>
          <input
            type="text"
            placeholder="인증키를 입력하세요."
            value={AuthKey}
            onChange={onAuthKeyHandler}
            onKeyUp={onAuthKeyUp}
            required
          />
        </div>
        {!isAuthKey ? (
          <p className="error">
            <FontAwesomeIcon icon={faTriangleExclamation} /> 인증키가 맞지
            않습니다.
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
        <div className="input-div">
          <div className="box"></div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={Password}
            onChange={onPasswordHandler}
            required
          />
        </div>
        <div className="input-div">
          <div className="box"></div>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            value={ConfirmPw}
            onChange={onConfirmPwHandler}
            onKeyUp={onConfirmPwKeyup}
            required
          />
        </div>
        {!isConfirmed ? (
          <p className="error">
            <FontAwesomeIcon icon={faTriangleExclamation} /> 비밀번호가 일치하지
            않습니다.
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
        <div className="input-div">
          <div className="box"></div>
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            value={Nickname}
            onChange={onNicknameHandler}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          가입하기
        </button>
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
