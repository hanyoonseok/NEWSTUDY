import { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(true);
    else setIsLogin(false);
  }, []);

  return (
    <>
      {isLogin && (
        <nav className="header-nav">
          <div className="header-search">
            <input
              className="input-search"
              placeholder="검색어를 입력하세요."
            />
            <i className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </i>
          </div>
          <div className="header-right">
            <button className="daily-word">오늘의 단어</button>
            <div className="profile-img">
              <img src={require("assets/profile.png")} alt="article"></img>
            </div>
          </div>
        </nav>
      )}

      {isMobile && (
        <>
          <div className="mobileHeader-wrapper">
            <div className="mobileHeader-dailyword">오늘의단어</div>
            <div className="earth-img">
              <img src={require("assets/user_globe.png")} alt="article"></img>
            </div>
          </div>
        </>
      )}
    </>
  );
}
