import React from "react";
import { useState } from "react";
import { loginUser } from "modules/user/user";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    const user = {
      email: Email,
      pw: Password,
    };
    dispatch(loginUser(user))
      .then((res) => {
        console.log("로그인 성공 ");
        window.location.replace("/landing");
      })
      .catch((error) => {
        console.log(error);
        setIsCorrect(false);
      });
  };

  return (
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
      {!isCorrect ? (
        <p className="error">
          <FontAwesomeIcon icon={faTriangleExclamation} /> 아이디 또는
          비밀번호가 맞지 않습니다.
        </p>
      ) : (
        <p>&nbsp;</p>
      )}
      <button className="login-btn">로그인</button>
      <p></p>
    </form>
  );
}
