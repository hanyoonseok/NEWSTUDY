import React, { useState, useEffect } from "react";
import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children }) {
  const localStorageItem = localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(localStorageItem);
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, [localStorageItem]);

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
