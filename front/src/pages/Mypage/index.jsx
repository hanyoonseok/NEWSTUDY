import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faThumbTack,
  faPencil,
  faNewspaper,
  faFileWord,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";
import Attendance1 from "assets/1attendance_badge.png";
import Attendance50 from "assets/50attendance_badge.png";
import Attendance100 from "assets/100attendance_badge.png";
import LevelA from "assets/A_level_badge.png";
import LevelB from "assets/B_level_badge.png";
import LevelC from "assets/C_level_badge.png";
import GameClear50 from "assets/50game_clear.png";
import GameClear30 from "assets/30game_clear.png";
import GameClear10 from "assets/10game_clear.png";
import NewsScrap1 from "assets/1news_scrap.png";
import NewsScrap10 from "assets/10news_scrap.png";
import NewsScrap50 from "assets/50news_scrap.png";
import MyVoca1 from "assets/1word_add.png";
import MyVoca100 from "assets/100word_add.png";
import MyVoca500 from "assets/500word_add.png";
import DefaultUserImage from "assets/user_globe.png";
import A1 from "assets/A1.png";
import A2 from "assets/A2.png";
import B1 from "assets/B1.png";
import B2 from "assets/B2.png";
import C1 from "assets/C1.png";
import C2 from "assets/C2.png";

import Word from "components/Word";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Mypage() {
  const user = useSelector((state) => state.user.currentUser);

  const [userImage, setUserImage] = useState(DefaultUserImage);
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      // setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setUserImage(DefaultUserImage);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        //이미지 정상적으로 불러오면 변경하기
        setUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // 프론트에서 갖고 있을 배지 목록
  const badges = [
    {
      id: 0,
      name: "1일 출석 배지",
      img: Attendance1,
      isAchieve: false,
    },
    {
      id: 1,
      name: "50일 출석 배지",
      img: Attendance50,
      isAchieve: false,
    },
    {
      id: 2,
      name: "100일 출석 배지",
      img: Attendance100,
      isAchieve: false,
    },
    {
      id: 3,
      name: "레벨 A 달성 배지",
      img: LevelA,
      isAchieve: false,
    },
    {
      id: 4,
      name: "레벨 B 달성 배지",
      img: LevelB,
      isAchieve: false,
    },
    {
      id: 5,
      name: "레벨 C 달성 배지",
      img: LevelC,
      isAchieve: false,
    },
    {
      id: 6,
      name: "게임 50초 이내 클리어",
      img: GameClear50,
      isAchieve: false,
    },
    {
      id: 7,
      name: "게임 30초 이내 클리어",
      img: GameClear30,
      isAchieve: false,
    },
    {
      id: 8,
      name: "게임 10초 이내 클리어",
      img: GameClear10,
      isAchieve: false,
    },
    { id: 9, name: "뉴스 스크랩 1회", img: NewsScrap1, isAchieve: false },
    { id: 10, name: "뉴스 스크랩 10회", img: NewsScrap10, isAchieve: false },
    { id: 11, name: "뉴스 스크랩 50회", img: NewsScrap50, isAchieve: false },
    { id: 12, name: "단어 1개 저장", img: MyVoca1, isAchieve: false },
    { id: 13, name: "단어 100개 저장", img: MyVoca100, isAchieve: false },
    { id: 14, name: "단어 500개 저장", img: MyVoca500, isAchieve: false },
  ];

  const [userBadges, setUserBadges] = useState([]);
  const [userBadgesCount, setUserBadgesCount] = useState(0);
  const [userVocas, setUserVocas] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [filterVocas, setFilterVocas] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [wordMemorizeStatus, setWordMemorizeStatus] = useState(false); //단어 외움 상태 바꿨는지 감지할 변수

  useEffect(() => {
    getBadges();
    getVocas();
    getArticles();
    return () => {};
  }, []);

  useEffect(() => {
    changeFilterVocas();
    return () => {};
  }, [isChecked, userVocas]);

  useEffect(() => {
    changeFilterVocas();
    getVocas();
    return () => {};
  }, [wordMemorizeStatus]);

  const changeFilterVocas = () => {
    if (isChecked) {
      setFilterVocas(userVocas.filter((voca) => voca.done));
    } else {
      setFilterVocas(userVocas.filter((voca) => !voca.done));
    }
  };

  //배지목록 가져오기
  const getBadges = async () => {
    await axios
      .get(`/badge`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data;
        for (const badge of badges) {
          for (const item of data) {
            if (item.b_id === badge.id) {
              badge.isAchieve = true;
              setUserBadgesCount((count) => count + 1);
            }
          }
        }
        setUserBadges(badges);
      });
  };

  // 단어 목록 가져오기
  const getVocas = async () => {
    await axios
      .get(`/vocaburary`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserVocas(res.data);
        console.log(res.data);
      });
  };

  //기사 목록 가져오기
  const getArticles = async () => {
    await axios
      .get(`/scrap`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserArticles(res.data);
      });
  };

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: userArticles.length,
    },
    {
      title: "내 단어",
      count: userVocas.length,
    },
    {
      title: "내 뱃지",
      count: userBadgesCount,
    },
  ];

  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: (
      <div className="article-box">
        {userArticles.map((article, index) => (
          <Link
            to="/news/:id"
            params={{ id: article.n_id }}
            className="article"
            key={index}
          >
            <span>{article.level}</span>
            <div className="img-box">
              <img src={require("assets/test.png")} alt="기사 이미지"></img>
            </div>
            <p>{article.title}</p>
          </Link>
        ))}
      </div>
    ),
    1: (
      <>
        <div className="wrap">
          <input
            type="checkbox"
            id="memorize"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
            checked={isChecked}
          />
          <label htmlFor="memorize">외운 단어 보기</label>
        </div>
        {filterVocas.length > 0 && (
          <Word
            vocas={filterVocas}
            setWordMemorizeStatus={setWordMemorizeStatus}
          />
        )}
      </>
    ),
    2: (
      <div className="badge-box">
        {userBadges &&
          userBadges.map((badge, index) => (
            <div key={index}>
              {badge.isAchieve ? (
                <img src={badge.img} alt="배지"></img>
              ) : (
                <img src={require("assets/badge_rock.png")} alt="배지"></img>
              )}
              <p>{badge.name}</p>
            </div>
          ))}
      </div>
    ),
  };

  return (
    <div className="mypage">
      <div className="left-box">
        <div className="info-box">
          <div className="profile-img">
            <div className="level-box">{level(user.level)}</div>
            <div className="img-box">
              <img src={userImage} alt="사용자 프로필 지구본"></img>
              <div
                className="img-hover"
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                이미지 수정
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                name="profile_img"
                onChange={onChange}
                ref={fileInput}
              />
            </div>
          </div>
          <p className="name">{user.nickname}</p>
          <p className="email">
            <FontAwesomeIcon icon={faEnvelope} /> {user.email}
          </p>
        </div>
        <div className="current">
          {myRecord.map((item, index) => (
            <div key={index}>
              <FontAwesomeIcon icon={faThumbTack} />
              <p>{item.title}</p>
              <p>{item.count}개</p>
            </div>
          ))}
        </div>
        <div className="interest">
          <div className="title">
            MY&nbsp; <b> INTEREST</b>
            <FontAwesomeIcon icon={faPencil} />
          </div>
          <div className="list"></div>
        </div>
      </div>
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
  );
}

function level(level) {
  switch (level) {
    case 1:
      return <img src={A1} alt="A1"></img>;
    case 2:
      return <img src={A2} alt="A2"></img>;
    case 3:
      return <img src={B1} alt="B1"></img>;
    case 4:
      return <img src={B2} alt="B2"></img>;
    case 5:
      return <img src={C1} alt="C1"></img>;
    case 6:
      return <img src={C2} alt="C2"></img>;
    default:
      break;
  }
}
