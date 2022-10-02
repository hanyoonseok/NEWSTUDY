import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import {
  faSearch,
  faXmark,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import DailyWordModal from "./DailyWordModal";
import SearchResult from "./SearchResult";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });
  const [activeSearch, setActiveSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const user = useSelector((state) => state.user);
  const [searchResults, setSearchResults] = useState(null);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSearchResults(null);
  };
  const searchArticle = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // 검색창 열엉~
  const onSearchBar = () => {
    setSearchResults(null);
    searchInput.current.value = "";
    setActiveSearch(true);
    console.log(searchInput.current);
    setTimeout(() => {
      searchInput.current.focus();
    }, 500);

    console.log(searchInput);
  };

  const closeSearchBar = () => {
    setActiveSearch(false);
  };

  const onSubmitSearch = (e) => {
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
      setSearchResults(null);
      const newsListResponse = await axios.post(`/news`, data);
      const result = newsListResponse.data.newsList;
      if (result && result.length > 5) {
        result.splice(0, 5);
      }
      if (result && result.length === 0) {
        setSearchResults(null);
      }
      setSearchResults(result);
    };
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <nav className={activeSearch ? "header-nav active-search" : "header-nav"}>
        {/* <div className="header-search">
          <input className="input-search" placeholder="검색어를 입력하세요." /> */}
        <div
          className={
            activeSearch ? "search-icon-wrapper hidden" : "search-icon-wrapper"
          }
          onClick={onSearchBar}
        >
          <i className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </i>
        </div>
        {/* </div> */}

        <div
          className={
            activeSearch ? "header-right hidden" : "header-right visible"
          }
        >
          <button className="daily-word" onClick={openModal}>
            <i>
              <FontAwesomeIcon icon={faClipboardList} />
            </i>{" "}
            오늘의 단어
          </button>
          <Link to="/mypage" className="profile-img">
            <img src={require("assets/profile.png")} alt="article"></img>
          </Link>
        </div>
        <div
          className={
            activeSearch
              ? "search-container active"
              : "search-container visible"
          }
        >
          <div className="search">
            <i className="search-icon header-icon">
              <FontAwesomeIcon icon={faSearch} />
            </i>
            <div className="header-search">
              <input
                ref={searchInput}
                className="input-search"
                placeholder="검색어를 입력하세요."
                onChange={(e) => searchArticle(e)}
                onKeyPress={onSubmitSearch}
              />
            </div>
            <i className="header-icon" onClick={closeSearchBar}>
              <FontAwesomeIcon icon={faXmark} />
            </i>
          </div>
        </div>
      </nav>

      {activeSearch && (
        <div className="fade-screen" onClick={() => closeSearchBar()}></div>
      )}
      {searchResults && (
        <div className={`search-list ${activeSearch ? "visible" : "hidden"}`}>
          <ul>
            {searchResults.slice(0, 5).map((article, index) => (
              <li key={index}>
                <Link to={`/news/${article.n_id}`}>
                  <SearchResult article={article} query={searchQuery} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isMobile && (
        <>
          <div className="mobileHeader-wrapper">
            <div className="mobileHeader-dailyword" onClick={openModal}>
              오늘의단어
            </div>
            <Link to="/mypage" className="earth-img">
              <img src={require("assets/user_globe.png")} alt="article"></img>
            </Link>
          </div>
        </>
      )}
      {modalOpen && <DailyWordModal close={closeModal} />}
    </>
  );
}
