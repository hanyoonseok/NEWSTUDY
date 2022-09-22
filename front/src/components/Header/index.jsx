import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import DailyWordModal from "./DailyWordModal";
export default function Header() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });
  const [activeSearch, setActiveSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className={activeSearch ? "header-nav active-search" : "header-nav"}>
        {/* <div className="header-search">
          <input className="input-search" placeholder="검색어를 입력하세요." /> */}
        <div
          className={
            activeSearch ? "search-icon-wrapper hidden" : "search-icon-wrapper"
          }
          onClick={() => setActiveSearch(true)}
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
                className="input-search"
                placeholder="검색어를 입력하세요."
              />
            </div>
            <i
              className="header-icon"
              onClick={() => {
                setActiveSearch(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </i>
          </div>
        </div>
      </nav>

      <div
        className={activeSearch ? "fade-screen" : "screen"}
        onClick={() => setActiveSearch(false)}
      ></div>
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
