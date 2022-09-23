import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import "./style.scss";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      sidebar.current.style.left = "-185px";
      sidebar.current.style.opacity = "0";
    }
  };

  return (
    <>
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
                <img src={require("assets/logo_white.png")} alt="article"></img>
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
                      <Link to="/landing">HOME</Link>
                    </div>
                    <div className="nav-content nav-desc">
                      <i>
                        <FontAwesomeIcon icon={faSpellCheck} />
                      </i>
                      <Link to="/leveltest">단어테스트</Link>
                    </div>
                    <div className="nav-content nav-desc">
                      <i>
                        <FontAwesomeIcon icon={faRectangleList} />
                      </i>
                      <Link to="/news/list">기사목록</Link>
                    </div>
                    <div className="nav-content nav-desc">
                      <i>
                        <FontAwesomeIcon icon={faGlobe} />
                      </i>
                      <Link to="nationsnews">나라별 기사목록</Link>
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
                  <Link className="nav-content nav-desc" to="/landing">
                    HOME
                  </Link>
                  <Link className="nav-content nav-desc" to="/leveltest">
                    단어테스트
                  </Link>
                  <Link className="nav-content nav-desc" to="/news/list">
                    기사목록
                  </Link>
                  <Link className="nav-content nav-desc" to="nationsnews">
                    나라별 기사목록
                  </Link>
                </div>
                <div className="nav-content nav-desc">로그아웃</div>
              </div>
            </>
          )}
        </div>
      </nav>

      {isMobile && isMobileMenuOpen && (
        <div className="screen-wrapper" onClick={outHandler}></div>
      )}
    </>
  );
}
