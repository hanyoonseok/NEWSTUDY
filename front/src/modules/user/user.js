import axios from "axios";

/*********************** 액션 타입 만들기 ***********************/
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const AUTH_EMAIL = "user/AUTH_EMAIL";
const SIGNUP_USER = "user/SIGNUP_USER";
const LOGIN_USER = "user/LOGIN_USER";

/*********************** 액션 생성함수 만들기 ***********************/
export const authEmail = async (data) => {
  console.log("authemail");
  console.log(data);
  const request = await axios
    .post(`${process.env.REACT_APP_API_URL}/user/mail`, data)
    .then((res) => console.log(res));
  return {
    type: AUTH_EMAIL,
    payload: request,
  };
};

export const signupUser = async (data) => {
  console.log("signupuser");
  console.log(data);
  const request = await axios
    .post(`${process.env.REACT_APP_API_URL}/user/signup`, data)
    .then((res) => console.log(res));
  return {
    type: SIGNUP_USER,
    payload: request,
  };
};

export const loginUser = async (data) => {
  console.log("loginUser");
  console.log(data);
  const request = await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
    .then((res) => {
      console.log(res);

      const { accessToken } = res.data;
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      localStorage.setItem("isLogin", true);
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
};

// accessToken 만료됐을 경우 호출
export const requestAccessToken = async (refresh_token) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/reissue`, {
      refresh: refresh_token,
    })
    .then((response) => {
      return response.data.access;
    })
    .catch((e) => {
      console.log(e.response.data);
    });
};

// accessToken이 필요할 때 호출
export const checkAccessToken = async (refresh_token) => {
  // undefined일 경우 새로 불러서 설정
  if (axios.defaults.headers.common["Authorization"] === undefined) {
    return await requestAccessToken(refresh_token).then((response) => {
      return response;
    });
  } else {
    // 인증타입 떼고 반환하기 위해 split(" ")[1] 함
    return axios.defaults.headers.common["Authorization"].split(" ")[1];
  }
};

/*********************** 리듀서 선언 ***********************/
export default function user(state = {}, action) {
  switch (action.type) {
    case AUTH_EMAIL:
      return { ...state, emailSuccess: action.payload };
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
