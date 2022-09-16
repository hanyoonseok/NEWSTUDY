import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DailyWordModal from "./DailyWordModal";
export default function Header() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className="header-nav">
        <div className="header-search">
          <input className="input-search" placeholder="검색어를 입력하세요." />
          <i className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </i>
        </div>
        <div className="header-right">
          <button className="daily-word" onClick={openModal}>
            오늘의 단어
          </button>
          <div className="profile-img">
            <img src={require("assets/profile.png")} alt="article"></img>
          </div>
        </div>
      </nav>

      {isMobile && (
        <>
          <div className="mobileHeader-wrapper">
            <div className="mobileHeader-dailyword" onClick={openModal}>
              오늘의단어
            </div>
            <div className="earth-img">
              <img src={require("assets/user_globe.png")} alt="article"></img>
            </div>
          </div>
        </>
      )}
      {modalOpen && <DailyWordModal close={closeModal} />}
    </>
  );
}
