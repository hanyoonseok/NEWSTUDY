import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faFileWord,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useCallback } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import MyArticle from "./MyArticle";
import MyVoca from "./MyVoca";
import MyBadge from "./MyBadge";
import MyInfo from "./MyInfo";

export default function Mypage() {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [myRecords, setMyRecords] = useState({
    article: 0,
    voca: 0,
    badge: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    const getArticlesLength = async () => {
      await axios
        .get(`/scrap`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(({ data }) => {
          setMyRecords((current) => {
            let newCondition = { ...current };
            newCondition["article"] = data.length;
            return newCondition;
          });
        });
    };
    const getBadgesLength = async () => {
      await axios
        .get(`/badge`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(({ data }) => {
          setMyRecords((current) => {
            let newCondition = { ...current };
            newCondition["badge"] = data.length;
            return newCondition;
          });
        });
    };
    const getVocasLength = async () => {
      await axios
        .get(`/vocaburary`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(({ data }) => {
          setMyRecords((current) => {
            let newCondition = { ...current };
            newCondition["voca"] = data.length;
            return newCondition;
          });
        });
    };
    getArticlesLength();
    getBadgesLength();
    getVocasLength();
    return () => {};
  }, []);

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: myRecords.article,
    },
    {
      title: "내 단어",
      count: myRecords.voca,
    },
    {
      title: "내 뱃지",
      count: myRecords.badge,
    },
  ];

  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: <MyArticle myRecord={myRecord} />,
    1: <MyVoca />,
    2: <MyBadge />,
  };

  return (
    <>
      <div className="mypage">
        <MyInfo
          myRecord={myRecord}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="right-box">
          <div className="tab">
            <button
              className={`${activeId === 0 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(0)}
            >
              <FontAwesomeIcon icon={faNewspaper} />
              MY <span>ARTICLE</span>
            </button>
            <button
              className={`${activeId === 1 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(1)}
            >
              <FontAwesomeIcon icon={faFileWord} />
              MY <span>VOCA</span>
            </button>
            <button
              className={`${activeId === 2 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(2)}
            >
              <FontAwesomeIcon icon={faCertificate} />
              MY <span>BADGE</span>
            </button>
          </div>
          <div className="content">{tabContent[activeId]}</div>
        </div>
      </div>
    </>
  );
}
