import "./style.scss";
import { useEffect, useState } from "react";
export default function Header() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, []);

  return (
    <nav className="header-nav">
      <input />
      <button>login 되어잇음</button>
    </nav>
  );
}
