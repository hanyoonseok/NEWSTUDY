import React, { useState, useEffect } from "react";
import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children, isDark, setIsDark }) {
  const localStorageItem = localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, [localStorageItem]);

  return (
    <div className={`layout-div ${isDark ? "dark" : ""}`}>
      {isLogin && (
        <>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Sidebar />
        </>
      )}
      {children}
    </div>
  );
}
