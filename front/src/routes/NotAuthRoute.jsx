import { Navigate } from "react-router-dom";
import React from "react";

// 온보딩에만
export const NotAuthRoute = ({ component: Component }) => {
  const me = localStorage.getItem("isLogin");

  return me === "false" || me === null ? Component : <Navigate to="/landing" />;
};
