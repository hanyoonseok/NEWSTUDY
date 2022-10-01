import axios from "axios";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

/*********************** 액션 타입 만들기 ***********************/
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SIGNUP_USER = "user/SIGNUP_USER";
const LOGIN_USER = "user/LOGIN_USER";
const GET_USER = "user/GET_USER";
const LOGOUT_USER = "user/LOGOUT_USER";
const CHANGE_LEVEL = "uset/CHANGE_LEVEL";

/*********************** 액션 생성함수 만들기 ***********************/
export const signupUser = async (data) => {
  console.log("signupuser");
  const request = await axios
    .post(`/user/signup`, data)
    .then((res) => console.log(res));
  return {
    type: SIGNUP_USER,
    payload: request,
  };
};

export const loginUser = async (data) => {
  console.log("loginUser");
  let accessToken = null;
  // 로그인 처리
  await axios.post(`/auth/login`, data).then((res) => {
    console.log("로그인 시 ", res);
    accessToken = loginSuccess(res);
    console.log("로그인", res);
  });
  // 회원정보 조회
  return getUser(accessToken);
};

export const getUser = async (token) => {
  const userInfo = {
    email: null,
    level: null,
    nickname: null,
    src: null,
    accessToken: null,
  };
  const request = await axios
    .get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      userInfo.email = res.data.data.email;
      userInfo.level = res.data.data.level;
      userInfo.nickname = res.data.data.nickname;
      userInfo.src = res.data.data.src;
      userInfo.accessToken = token;
    });
  return {
    type: GET_USER,
    payload: userInfo,
  };
};

export const loginSuccess = (res) => {
  console.log("loginSuccess");
  const { accessToken } = res.data;
  // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  // accessToken 만료하기 1분 전에 로그인 연장
  localStorage.setItem("isLogin", true);
  return accessToken;
};

export const logoutUser = async () => {
  console.log("logoutUser");
  const request = await axios.create({
    transformRequest: (data, headers) => {
      // or just the auth header
      delete headers.common.Authorization;
    },
  });
  localStorage.removeItem("isLogin");
  storage.removeItem("persist:root"); // storage에 저장된 데이터 날리기
  return {
    type: LOGOUT_USER,
    payload: request,
  };
};

export const changeLevel = async (level) => {
  console.log("changeLevel");
  const request = await axios
    .put(`/user/level/${level}`, null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => console.log(res));
  return {
    type: CHANGE_LEVEL,
    payload: level,
  };
};

/* 리덕스에서 관리 할 상태 정의 */
const userState = {
  email: null,
  level: null,
  nickname: null,
  src: null,
  accessToken: null,
};

/*********************** 리듀서 선언 ***********************/
export default function user(state = userState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state };
    case LOGIN_USER:
      return {
        ...state,
        email: action.payload.email,
        level: action.payload.level,
        nickname: action.payload.nickname,
        src: action.payload.src,
        accessToken: action.payload.accessToken,
      };
    case GET_USER:
      return {
        ...state,
        email: action.payload.email,
        level: action.payload.level,
        nickname: action.payload.nickname,
        src: action.payload.src,
        accessToken: action.payload.accessToken,
      };
    case LOGOUT_USER:
      return {
        ...state,
        email: null,
        level: null,
        nickname: null,
        src: null,
        accessToken: null,
      };
    case CHANGE_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    default:
      return state;
  }
}
