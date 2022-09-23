import React, { useState, useEffect } from "react";
import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const localStorageItem = localStorage.getItem("isLogin");

  useEffect(() => {
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, [isLogin]);

  return (
    <div className="layout-div">
      {isLogin && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      {children}
    </div>
  );
}
