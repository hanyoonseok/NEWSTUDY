import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faThumbTack,
  faPencil,
  faNewspaper,
  faFileWord,
  faCertificate,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";

import Attendance1 from "assets/1attendance_badge.png";
import DefaultUserImage from "assets/user_globe.png";
import A1 from "assets/A1.png";
import A2 from "assets/A2.png";
import B1 from "assets/B1.png";
import B2 from "assets/B2.png";
import C1 from "assets/C1.png";
import C2 from "assets/C2.png";

import Word from "components/Word";

const user = {
  name: "김싸피",
  email: "kimssafy@ssafy.com",
  level: "A1",
};

export default function Mypage() {
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

  const articles = [
    {
      img: "assets/test.png",
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
  ];

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
      img: "assets/50attendance_badge.png",
      isAchieve: false,
    },
    {
      id: 2,
      name: "100일 출석 배지",
      img: "assets/100attendance_badge.png",
      isAchieve: false,
    },
    {
      id: 3,
      name: "레벨 A 달성 배지",
      img: "assets/A_level_badge.png",
      isAchieve: false,
    },
    {
      id: 4,
      name: "레벨 B 달성 배지",
      img: "assets/B_level_badge.png",
      isAchieve: false,
    },
    {
      id: 5,
      name: "레벨 C 달성 배지",
      img: "assets/C_level_badge.png",
      isAchieve: false,
    },
    {
      id: 6,
      name: "10개의 나라 뉴스 열람 배지",
      img: "assets/",
      isAchieve: false,
    },
    {
      id: 7,
      name: "50개의 나라 뉴스 열람 배지",
      img: "assets/",
      isAchieve: false,
    },
    {
      id: 8,
      name: "100개의 나라 뉴스 열람 배지",
      img: "assets/",
      isAchieve: false,
    },
    { id: 9, name: "게임 50초 이내 클리어", img: "assets/", isAchieve: false },
    { id: 10, name: "게임 30초 이내 클리어", img: "assets/", isAchieve: false },
    { id: 11, name: "게임 10초 이내 클리어", img: "assets/", isAchieve: false },
    { id: 12, name: "뉴스 스크랩 1회", img: "assets/", isAchieve: false },
    { id: 13, name: "뉴스 스크랩 10회", img: "assets/", isAchieve: false },
    { id: 14, name: "뉴스 스크랩 50회", img: "assets/", isAchieve: false },
    { id: 15, name: "단어 1개 저장", img: "assets/", isAchieve: false },
    { id: 16, name: "단어 50개 저장", img: "assets/", isAchieve: false },
    { id: 17, name: "단어 100개 저장", img: "assets/", isAchieve: false },
  ];

  const [userBadges, setUserBadges] = useState(null);
  const [userVocas, setUserVocas] = useState([]);
  const [filterVocas, setFilterVocas] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [wordMemorizeStatus, setWordMemorizeStatus] = useState(false); //단어 외움 상태 바꿨는지 감지할 변수

  useEffect(() => {
    getBadges();
    getVocas();
    return () => {};
  }, []);

  useEffect(() => {
    changeFilterVocas();
    return () => {};
  }, [isChecked, userVocas]);

  useEffect(() => {
    changeFilterVocas();
    setWordMemorizeStatus(false);
    return () => {};
  }, [wordMemorizeStatus]);

  const changeFilterVocas = () => {
    if (isChecked) {
      setFilterVocas(userVocas.filter((voca) => voca.memorize));
    } else {
      setFilterVocas(userVocas.filter((voca) => !voca.memorize));
    }
  };

  const getBadges = () => {
    const data = [{ id: 0 }, { id: 9 }, { id: 2 }];
    for (const badge of badges) {
      for (const item of data) {
        if (item.id === badge.id) {
          badge.isAchieve = true;
        }
      }
    }
    setUserBadges(badges);
  };

  const getVocas = () => {
    const vocas = [
      {
        word: "Administration",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: true,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩수콩수콩수콩수콩수콩수콩",
          },
          {
            id: 3,
            mean: "수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩",
          },
        ],
        memorize: true,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: false,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: true,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: false,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: false,
      },
      {
        word: "SubiniSubiniSi",
        part: [
          {
            id: 0,
            mean: "수콩수콩수콩",
          },
          {
            id: 3,
            mean: "화연연ㅇ여연",
          },
        ],
        memorize: false,
      },
    ];
    setUserVocas(vocas);
  };

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: articles.length,
    },
    {
      title: "내 단어",
      count: userVocas.length,
    },
    {
      title: "내 뱃지",
      count: badges.length,
    },
  ];

  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: (
      <div className="article-box">
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <span>{article.level}</span>
            <div className="img-box">
              <img src={require("assets/test.png")} alt="기사 이미지"></img>
            </div>
            <p>{article.title}</p>
          </div>
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
        {filterVocas && (
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
          <p className="name">{user.name}</p>
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
    case "A1":
      return <img src={A1} alt="A1"></img>;
    case "A2":
      return <img src={A2} alt="A2"></img>;
    case "B1":
      return <img src={B1} alt="B1"></img>;
    case "B2":
      return <img src={B2} alt="B2"></img>;
    case "C1":
      return <img src={C1} alt="C1"></img>;
    case "C2":
      return <img src={C2} alt="C2"></img>;
    default:
      break;
  }
}
