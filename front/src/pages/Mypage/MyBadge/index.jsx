import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

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

export default function MyBadge({ setBadgeLength }) {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    getBadges();
    return () => {};
  }, []);

  // 프론트에서 갖고 있을 배지 목록
  const badges = [
    {
      id: 1,
      name: "1일 출석 배지",
      img: Attendance1,
      isAchieve: false,
    },
    {
      id: 2,
      name: "50일 출석 배지",
      img: Attendance50,
      isAchieve: false,
    },
    {
      id: 3,
      name: "100일 출석 배지",
      img: Attendance100,
      isAchieve: false,
    },
    {
      id: 4,
      name: "레벨 A 달성 배지",
      img: LevelA,
      isAchieve: false,
    },
    {
      id: 5,
      name: "레벨 B 달성 배지",
      img: LevelB,
      isAchieve: false,
    },
    {
      id: 6,
      name: "레벨 C 달성 배지",
      img: LevelC,
      isAchieve: false,
    },
    {
      id: 7,
      name: "게임 50초 이내 클리어",
      img: GameClear50,
      isAchieve: false,
    },
    {
      id: 8,
      name: "게임 30초 이내 클리어",
      img: GameClear30,
      isAchieve: false,
    },
    {
      id: 9,
      name: "게임 10초 이내 클리어",
      img: GameClear10,
      isAchieve: false,
    },
    { id: 10, name: "뉴스 스크랩 1회", img: NewsScrap1, isAchieve: false },
    { id: 11, name: "뉴스 스크랩 10회", img: NewsScrap10, isAchieve: false },
    { id: 12, name: "뉴스 스크랩 50회", img: NewsScrap50, isAchieve: false },
    { id: 13, name: "단어 1개 저장", img: MyVoca1, isAchieve: false },
    { id: 14, name: "단어 100개 저장", img: MyVoca100, isAchieve: false },
    { id: 15, name: "단어 500개 저장", img: MyVoca500, isAchieve: false },
  ];

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
            }
          }
        }
        setUserBadges(badges);
        setBadgeLength(res.data.length);
      });
  };

  return (
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
  );
}
