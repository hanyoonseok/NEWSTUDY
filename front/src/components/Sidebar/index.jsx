import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useMediaQuery } from "react-responsive";

import {
  faHome,
  faSpellCheck,
  faRectangleList,
  faGlobe,
  faRightFromBracket,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const sidebar = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(true);
    else setIsLogin(false);
  }, []);

  const hoverHandler = () => {
    if (isMobile) {
      sidebar.current.style.left = "0px";
      sidebar.current.style.opacity = "1";
      setIsMobileMenuOpen(true);
      console.log(isMobileMenuOpen);
    } else {
      sidebar.current.style.left = "65px";
      sidebar.current.style.opacity = "1";
    }
  };

  const outHandler = () => {
    if (isMobile) {
      sidebar.current.style.left = "-320px";
      sidebar.current.style.opacity = "0";
      setIsMobileMenuOpen(false);
    } else {
      sidebar.current.style.left = "-120px";
      sidebar.current.style.opacity = "0";
    }
  };

  return (
    <>
      {isLogin && (
        <nav
          className="sidebar-nav"
          onMouseOver={isMobile ? null : hoverHandler}
          onMouseOut={isMobile ? null : outHandler}
          // onMouseOver={hoverHandler}
          // onMouseOut={outHandler}
        >
          <div className="sidebar-contents">
            {isMobile ? (
              <>
                <i className="nav-btn" onClick={hoverHandler}>
                  <FontAwesomeIcon icon={faBars} />
                </i>
                <div className="logo-img">
                  <img
                    src={require("assets/logo_white.png")}
                    alt="article"
                  ></img>
                </div>
                <i className="nav-btn">
                  <FontAwesomeIcon icon={faSearch} />
                </i>
                <>
                  <div className="sidebar-div sidebar" ref={sidebar}>
                    <div>
                      <div className="nav-content">
                        <img
                          src={require("assets/logo_white.png")}
                          alt="article"
                        ></img>
                      </div>
                      <div className="nav-content nav-desc">
                        <i>
                          <FontAwesomeIcon icon={faHome} />
                        </i>
                        <div>HOME</div>
                      </div>
                      <div className="nav-content nav-desc">
                        <i>
                          <FontAwesomeIcon icon={faSpellCheck} />
                        </i>
                        <div>단어테스트</div>
                      </div>
                      <div className="nav-content nav-desc">
                        <i>
                          <FontAwesomeIcon icon={faRectangleList} />
                        </i>
                        <div>기사목록</div>
                      </div>
                      <div className="nav-content nav-desc">
                        <i>
                          <FontAwesomeIcon icon={faGlobe} />
                        </i>
                        <div>나라별 기사목록</div>
                      </div>
                    </div>
                    <div className="nav-content nav-desc">
                      <i>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </i>
                      <div>로그아웃</div>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                <div className="sidebar-content sidebar">
                  <div>
                    <i className="nav-content">
                      <FontAwesomeIcon icon={faHome} />
                    </i>
                    <i className="nav-content">
                      <FontAwesomeIcon icon={faSpellCheck} />
                    </i>
                    <i className="nav-content">
                      <FontAwesomeIcon icon={faRectangleList} />
                    </i>
                    <i className="nav-content">
                      <FontAwesomeIcon icon={faGlobe} />
                    </i>
                  </div>
                  <div>
                    <i className="nav-content">
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </i>
                  </div>
                </div>
                <div className="sidebar-div sidebar" ref={sidebar}>
                  <div>
                    <div className="nav-content nav-desc">HOME</div>
                    <div className="nav-content nav-desc">단어테스트</div>
                    <div className="nav-content nav-desc">기사목록</div>
                    <div className="nav-content nav-desc">나라별 기사목록</div>
                  </div>
                  <div className="nav-content nav-desc">로그아웃</div>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
      {isMobile && isMobileMenuOpen && (
        <div className="screen-wrapper" onClick={outHandler}></div>
      )}
    </>
  );
}
