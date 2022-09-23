import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import RedirectComponent from "./RedirectComponent";

const AuthRoute = ({ path, element }) => {
  const me = localStorage.getItem("isLogin");

  return me === "true" ? ( // 로그인 했을 시 접근 불가 페이지들
    <Route path={path} element={element}></Route>
  ) : (
    <RedirectComponent needAuth={true} />
  );
};

export default AuthRoute;
