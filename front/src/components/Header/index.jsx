import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

import { faSearch, faXmark, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import DailyWordModal from "./DailyWordModal";
import SearchResult from "./SearchResult";
export default function Header({ isDark, setIsDark }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });
  const [activeSearch, setActiveSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const clickDarkToggle = (checked) => {
    if (checked) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const searchArticle = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    // api불러와랑~
  };
  // 검색창 열엉~
  const onSearchBar = () => {
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
    console.log("검색해라");
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
      setActiveSearch(false);
    }
  };

  const searchArticles = [
    {
      title: "Faker win the world championship !! pleaseㅠㅠ",
      thumbnail:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/348/196/Alek-Manoah2.jpg?ve=1&tl=1",
      level: "A1",
    },
    {
      title: "Faker win the world championship please pleaseㅠㅠ",
      thumbnail:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/348/196/Alek-Manoah2.jpg?ve=1&tl=1",
      level: "A1",
    },
    {
      title: "Faker win the world championship",
      thumbnail:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/348/196/Alek-Manoah2.jpg?ve=1&tl=1",
      level: "A1",
    },
    {
      title: "Faker win the world championship",
      thumbnail:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/348/196/Alek-Manoah2.jpg?ve=1&tl=1",
      level: "A1",
    },
    {
      title: "Faker win the world championship",
      thumbnail:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/348/196/Alek-Manoah2.jpg?ve=1&tl=1",
      level: "A1",
    },
  ];

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
          <div className="dark-toggle" key={"darkmode"}>
            <div>
              <FontAwesomeIcon icon={faMoon} />
            </div>
            <input
              type="checkbox"
              id="darkmode"
              checked={isDark}
              onChange={(e) => clickDarkToggle(e.target.checked)}
            />
            <label htmlFor="darkmode"></label>
          </div>
          <button className="daily-word" onClick={openModal}>
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
      <div className={`search-list ${activeSearch ? "visible" : "hidden"}`}>
        <ul>
          {searchArticles.map((article, index) => (
            <li key={index}>
              <SearchResult article={article} query={searchQuery} />
            </li>
          ))}
        </ul>
      </div>
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
