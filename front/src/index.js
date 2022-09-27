import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_LOCAL_API_URL;

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

reportWebVitals();

// react v 17 버전용
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
