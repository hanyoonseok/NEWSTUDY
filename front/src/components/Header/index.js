import { useState, useEffect } from "react";
import "./style.scss";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, []);

  return (
    <>
      {isLogin && (
        <nav className="header-nav">
          <input />
          <button>login 되어잇음</button>
        </nav>
      )}
    </>
  );
}
