import { useEffect } from "react";
import { Route } from "react-router-dom";

import Signup from "pages/Signup";
import NewsList from "pages/NewsList";

const RedirectComponent = ({ needAuth }) => {
  useEffect(() => {
    needAuth
      ? alert("로그인이 필요한 서비스입니다.")
      : alert("이미 로그인 되어있습니다.");
  });
  return (
    <>
      {needAuth ? (
        <Route to="/signup" element={<Signup />} />
      ) : (
        <Route to="/news/list" element={<NewsList />} />
      )}
    </>
  );
};

export default RedirectComponent;
