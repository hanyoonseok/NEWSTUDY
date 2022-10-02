import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.scss";

import {
  faHome,
  faSpellCheck,
  faRectangleList,
  faGlobe,
  faRightFromBracket,
  faBars,
  faSearch,
  faXmark,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import SearchResult from "components/Header/SearchResult";
import { logoutUser } from "modules/user/user";

export default function Sidebar() {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const sidebar = useRef();
  const searchInput = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
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
  // 검색창 열엉
  const onSearchBar = () => {
    searchInput.current.value = "";
    setActiveSearch(true);
    searchInput.current.focus();
  };

  // 검색창 닫엉
  const closeSearchBar = () => {
    setActiveSearch(false);
  };
  const searchArticle = (e) => {
    setSearchQuery(e.target.value);
  };
  const onSubmitSearch = (e) => {
    console.log("검색해라");
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
      setActiveSearch(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery === "") {
        setSearchResults(null);
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;

      const data = {
        page: 1,
        titlekeyword: searchQuery,
        contentkeyword: searchQuery,
      };
      const newsListResponse = await axios.post(`/news`, data);
      const result = newsListResponse.data.newsList;
      if (result && result.length > 5) {
        result.splice(0, 5);
      }
      console.log("검색결과는 여깄어", result);
      if (result && result.length === 0) {
        setSearchResults(null);
      }
      setSearchResults(result);
    };
    fetchData();
  }, [searchQuery]);

  const onClickLogout = () => {
    dispatch(logoutUser).then((res) => {
      window.location.replace("/");
    });
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
              <i
                className={`nav-btn ${activeSearch ? "hidden" : "visible"}`}
                onClick={onSearchBar}
              >
                <FontAwesomeIcon icon={faSearch} />
              </i>
              <div
                className={`search-container ${
                  activeSearch ? "visible" : "hidden"
                }`}
              >
                <i>
                  <FontAwesomeIcon icon={faSearch} />
                </i>
                <div className="header-search">
                  <input
                    className="input-search"
                    ref={searchInput}
                    placeholder="검색어를 입력하세요."
                    onChange={(e) => searchArticle(e)}
                    onKeyPress={onSubmitSearch}
                  />
                </div>
                <i
                  className="header-icon"
                  onClick={() => {
                    closeSearchBar();
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </i>
              </div>
              {searchResults && (
                <div
                  className={`search-list-mobile ${
                    activeSearch ? "visible" : "hidden"
                  }`}
                >
                  <ul>
                    {searchResults.map((article, index) => (
                      <li key={index}>
                        <SearchResult article={article} query={searchQuery} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                    <div className="nav-content nav-desc">
                      <i>
                        <FontAwesomeIcon icon={faPuzzlePiece} />
                      </i>
                      <Link to="/game/menu">영어 게임</Link>
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
                  <i className="nav-content">
                    <FontAwesomeIcon icon={faPuzzlePiece} />
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
                  <Link className="nav-content nav-desc" to="/game/menu">
                    영어 게임
                  </Link>
                </div>
                <div
                  className="nav-content nav-desc"
                  onClick={() => onClickLogout()}
                >
                  로그아웃
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {isMobile && isMobileMenuOpen && (
        <div className="screen-wrapper" onClick={outHandler}></div>
      )}
      {activeSearch && (
        <div className="fade-screen" onClick={() => closeSearchBar()}></div>
      )}
    </>
  );
}
