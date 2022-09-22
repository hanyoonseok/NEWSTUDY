import axios from "axios";

/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const AUTH_EMAIL = "AUTH_EMAIL";
const SIGNUP_USER = "SIGNUP_USER";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export function authEmail(data) {
  console.log("authemail");
  console.log(data);
  const request = axios
    .post(`${process.env.REACT_APP_URL}/user/mail`, data)
    .then((res) => console.log(res));
  return {
    type: AUTH_EMAIL,
    payload: request,
  };
}
export function signupUser(data) {
  console.log(data);
  console.log("signupuser");
  const request = axios
    .post(`${process.env.REACT_APP_URL}/user/signup`, data)
    .then((res) => console.log(res));
  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

/* 초기 상태 선언 */
// const initialState = {
//   number: 0,
//   diff: 1,
// };

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function user(state = {}, action) {
  switch (action.type) {
    case AUTH_EMAIL:
      return { ...state };
    case SIGNUP_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
