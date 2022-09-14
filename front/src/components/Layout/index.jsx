import { useState, useEffect } from "react";
import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(true);
    else setIsLogin(false);
  }, []);

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
