import { Navigate } from "react-router-dom";
import React from "react";

const AuthRoute = ({ component: Component }) => {
  const me = localStorage.getItem("isLogin");

  return me === "true" ? (
    Component
  ) : (
    <Navigate to="/" {...alert("접근할 수 없는 페이지입니다.")} />
  );
};

export default AuthRoute;
