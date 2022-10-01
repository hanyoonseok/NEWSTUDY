import React from "react";
import { useState } from "react";
import { loginUser } from "modules/user/user";
import { useDispatch } from "react-redux";
import { signupUser } from "modules/user/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SignUp({ setIsEmailModal }) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false); //이메일 중복 여부
  const [AuthKey, setAuthKey] = useState("");
  const [receiveAuthKey, setReceiveAuthKey] = useState("1"); //백에서 보내줄 인증키
  const [isAuthKey, setIsAuthKey] = useState(true); //인증키 일치 여부
  const [Password, setPassword] = useState("");
  const [ConfirmPw, setConfirmPw] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(true); //비밀번호 일치 여부
  const [Nickname, setNickname] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  const onConfirmPwHandler = (e) => {
    setConfirmPw(e.currentTarget.value);
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
  const onClickAuthEmail = async (e) => {
    e.preventDefault();
    console.log("이메일 인증 클릭함");
    await axios
      .post(`/user/mail`, {
        email: Email,
      })
      .then((res) => {
        console.log("res", res);
        setReceiveAuthKey(res.data.data.tempPassword); // 여기서 넘어오는 key를 receiveAuthKey에 저장
        setIsDuplicateEmail(false);
        setIsEmailModal(true);
        console.log("AuthKey", AuthKey);
      })
      .catch((error) => {
        // 중복검사 했는데 중복 이메일일 경우
        console.log("error", error);
        setIsDuplicateEmail(true);
        setIsEmailModal(false);
      });
  };
  const onSignupHandler = (e) => {
    e.preventDefault();
    if (isConfirmed && isAuthKey) {
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

  return (
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
          <FontAwesomeIcon icon={faTriangleExclamation} /> 중복된 이메일입니다.
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
  );
}
