import React, { useState, useEffect } from "react";
import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children }) {
  const localStorageItem = localStorage.getItem("isLogin");
  const localStorageDark = localStorage.getItem("dark");
  const [isLogin, setIsLogin] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, [localStorageItem]);

  useEffect(() => {
    if (localStorageDark === null || localStorageDark === "false")
      setIsDark(false);
    else setIsDark(true);
  }, [localStorageDark]);

  return (
    <div className={`layout-div ${isDark ? "dark" : ""}`}>
      {isLogin && (
        <>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Sidebar isDark={isDark} setIsDark={setIsDark} />
        </>
      )}
      {children}
    </div>
  );
}
