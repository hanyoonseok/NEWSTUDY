import { useEffect } from "react";
import { Route } from "react-router-dom";
import React from "react";

import Signup from "pages/Auth";
import NewsList from "pages/NewsList";
import Auth from "pages/Auth";

const RedirectComponent = ({ needAuth }) => {
  useEffect(() => {
    needAuth
      ? alert("로그인이 필요한 서비스입니다.")
      : alert("이미 로그인 되어있습니다.");
  });
  return (
    <>
      {needAuth ? (
        <Route to="/signup" element={<Auth />} />
      ) : (
        <Route to="/news/list" element={<NewsList />} />
      )}
    </>
  );
};

export default RedirectComponent;
