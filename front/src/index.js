import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const DEFAULT_ACCEPT_TYPE =
  "application/json; charset=utf-8; application/x-www-form-urlencoded;";
axios.defaults.headers.common["Content-Type"] = DEFAULT_ACCEPT_TYPE;
axios.defaults.withCredentials = true; // refreshToken 주고받기 위한 처리

// react v 17 버전용
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
