import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faThumbTack,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Mypage() {
  const user = {
    name: "김싸피",
    email: "kimssafy@ssafy.com",
  };

  const articles = [
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
    {
      img: "assets/test.png",
      title: "An Overseas news story that fits the difficulty",
      level: "c",
    },
  ];

  const file = (url) => {
    return 'require("' + url + '")';
  };

  const vocas = [
    {
      word: "Subini",
      mean: "수콩수콩수콩수콩",
      part: 0,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 1,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 2,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 3,
    },
    {
      word: "Subini",
      mean: "Not having to follow or be affected by a rule, obligation, etc.",
      part: 1,
    },
  ];

  const badges = [
    {
      id: 0,
      name: "1일 출석 배지",
      img: "assets/1attendance_badge.png",
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
  useEffect(() => {
    getBadges();
    return () => {};
  }, []);

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

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: articles.length,
    },
    {
      title: "내 단어",
      count: vocas.length,
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
      <div className="voca-box">
        {vocas.map((voca, index) => (
          <div className="voca" key={index}>
            <div className="word">
              {voca.word}
              {voca.part === 0 && <p className="blue">형</p>}
              {voca.part === 1 && <p className="orange">명</p>}
              {voca.part === 2 && <p className="pink">부</p>}
              {voca.part === 3 && <p className="green">동</p>}
            </div>
            <div className="mean">{voca.mean}</div>
          </div>
        ))}
      </div>
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
            <div className="img-box">
              <img
                src={require("assets/user_globe.png")}
                alt="사용자 프로필 지구본"
              ></img>
              <div className="img-hover">이미지 수정</div>
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
            MY ARTICLE
          </button>
          <button
            className={`${activeId === 1 ? "active" : ""}`}
            onClick={() => onClickSwitchTab(1)}
          >
            MY VOCA
          </button>
          <button
            className={`${activeId === 2 ? "active" : ""}`}
            onClick={() => onClickSwitchTab(2)}
          >
            MY BADGE
          </button>
        </div>
        <div className="content">{tabContent[activeId]}</div>
      </div>
    </div>
  );
}
