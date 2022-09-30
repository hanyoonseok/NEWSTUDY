import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faThumbTack,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "modules/user/user";
import FilterModal from "components/FilterModal";
import "./style.scss";

import DefaultUserImage from "assets/user_globe.png";
import A1 from "assets/A1.png";
import A2 from "assets/A2.png";
import B1 from "assets/B1.png";
import B2 from "assets/B2.png";
import C1 from "assets/C1.png";
import C2 from "assets/C2.png";
import { useCallback } from "react";
export default function MyInfo({ myRecord, userCategory }) {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState("");
  const fileInput = useRef(null);
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [isFilterModal, setIsFilterModal] = useState(false);

  useEffect(() => {
    if (user && !user.src) {
      setUserImage(DefaultUserImage);
    } else {
      setUserImage(user.src);
    }
    const fetchData = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const testWordsResponse = await axios.get(`/user/avatar`, headers);
      console.log(testWordsResponse);
      setUserImage(
        testWordsResponse.data.slice(10, testWordsResponse.data.length - 10),
      );
    };

    fetchData();
    return () => {};
  }, []);

  const category = [
    null,
    { c_id: 1, main: "life", sub: "business" },
    { c_id: 2, main: "life", sub: "culture" },
    { c_id: 3, main: "life", sub: "entertainment" },
    { c_id: 4, main: "life", sub: "etc" },
    { c_id: 5, main: "life", sub: "family" },
    { c_id: 6, main: "life", sub: "fitness" },
    { c_id: 7, main: "life", sub: "food" },
    { c_id: 8, main: "life", sub: "health" },
    { c_id: 9, main: "life", sub: "home" },
    { c_id: 10, main: "life", sub: "movies" },
    { c_id: 11, main: "life", sub: "music" },
    { c_id: 12, main: "life", sub: "people" },
    { c_id: 13, main: "life", sub: "pets" },
    { c_id: 14, main: "life", sub: "real estate" },
    { c_id: 15, main: "life", sub: "shopping" },
    { c_id: 16, main: "life", sub: "style" },
    { c_id: 17, main: "life", sub: "travel" },
    { c_id: 18, main: "life", sub: "tv" },
    { c_id: 19, main: "life", sub: "wedding" },
    { c_id: 20, main: "news", sub: "columns" },
    { c_id: 21, main: "news", sub: "etc" },
    { c_id: 22, main: "news", sub: "factcheck" },
    { c_id: 23, main: "news", sub: "nation" },
    { c_id: 24, main: "news", sub: "opinion" },
    { c_id: 25, main: "news", sub: "politics" },
    { c_id: 26, main: "news", sub: "shows" },
    { c_id: 27, main: "news", sub: "social" },
    { c_id: 28, main: "other", sub: "auto" },
    { c_id: 29, main: "other", sub: "business" },
    { c_id: 30, main: "other", sub: "climate" },
    { c_id: 31, main: "other", sub: "college" },
    { c_id: 32, main: "other", sub: "companies" },
    { c_id: 33, main: "other", sub: "covid-19" },
    { c_id: 34, main: "other", sub: "economy" },
    { c_id: 35, main: "other", sub: "education" },
    { c_id: 36, main: "other", sub: "environment" },
    { c_id: 37, main: "other", sub: "etc" },
    { c_id: 38, main: "other", sub: "law" },
    { c_id: 39, main: "other", sub: "science" },
    { c_id: 40, main: "sport", sub: "gaelic-games" },
    { c_id: 41, main: "sports", sub: "american-football" },
    { c_id: 42, main: "sports", sub: "athletics" },
    { c_id: 43, main: "sports", sub: "baseball" },
    { c_id: 44, main: "sports", sub: "basketball" },
    { c_id: 45, main: "sports", sub: "boxing" },
    { c_id: 46, main: "sports", sub: "cricket" },
    { c_id: 47, main: "sports", sub: "cycling" },
    { c_id: 48, main: "sports", sub: "etc" },
    { c_id: 49, main: "sports", sub: "fighting" },
    { c_id: 50, main: "sports", sub: "football" },
    { c_id: 51, main: "sports", sub: "golf" },
    { c_id: 52, main: "sports", sub: "gymnastics" },
    { c_id: 53, main: "sports", sub: "hockey" },
    { c_id: 54, main: "sports", sub: "horseracing" },
    { c_id: 55, main: "sports", sub: "motorsport" },
    { c_id: 56, main: "sports", sub: "olympics" },
    { c_id: 57, main: "sports", sub: "rugby" },
    { c_id: 58, main: "sports", sub: "snooker" },
    { c_id: 59, main: "sports", sub: "soccer" },
    { c_id: 60, main: "sports", sub: "swimming" },
    { c_id: 61, main: "sports", sub: "tennis" },
    { c_id: 62, main: "tech", sub: "companies" },
    { c_id: 63, main: "tech", sub: "etc" },
    { c_id: 64, main: "tech", sub: "fbi" },
    { c_id: 65, main: "tech", sub: "review" },
    { c_id: 66, main: "tech", sub: "sns" },
    { c_id: 67, main: "world", sub: "africa" },
    { c_id: 68, main: "world", sub: "americas" },
    { c_id: 69, main: "world", sub: "asia" },
    { c_id: 70, main: "world", sub: "australia" },
    { c_id: 71, main: "world", sub: "brazil" },
    { c_id: 72, main: "world", sub: "canada" },
    { c_id: 73, main: "world", sub: "china" },
    { c_id: 74, main: "world", sub: "etc" },
    { c_id: 75, main: "world", sub: "europe" },
    { c_id: 76, main: "world", sub: "france" },
    { c_id: 77, main: "world", sub: "germany" },
    { c_id: 78, main: "world", sub: "hongkong" },
    { c_id: 79, main: "world", sub: "india" },
    { c_id: 80, main: "world", sub: "iran" },
    { c_id: 81, main: "world", sub: "iraq" },
    { c_id: 82, main: "world", sub: "israel" },
    { c_id: 83, main: "world", sub: "italy" },
    { c_id: 84, main: "world", sub: "japan" },
    { c_id: 85, main: "world", sub: "lebanon" },
    { c_id: 86, main: "world", sub: "mexico" },
    { c_id: 87, main: "world", sub: "middle east" },
    { c_id: 88, main: "world", sub: "north korea" },
    { c_id: 89, main: "world", sub: "northern ireland" },
    { c_id: 90, main: "world", sub: "russia" },
    { c_id: 91, main: "world", sub: "saudiarabia" },
    { c_id: 92, main: "world", sub: "south korea" },
    { c_id: 93, main: "world", sub: "spain" },
    { c_id: 94, main: "world", sub: "turkey" },
    { c_id: 95, main: "world", sub: "uk" },
    { c_id: 96, main: "world", sub: "ukraine" },
    { c_id: 97, main: "world", sub: "us" },
  ];

  const onChange = (e) => {
    const profileImg = e.target.files[0];
    if (profileImg) {
      // setFile(profileImg);
    } else {
      //업로드 취소할 시
      setUserImage(DefaultUserImage);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    const formData = new FormData();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        //이미지 정상적으로 불러오면 변경하기
        setUserImage(reader.result);
        formData.append("file", profileImg);

        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }

        // 유저 이미지 변경 api 전송
        await axios
          .post("/user/avatar", formData, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("이미지 변경완?", res);
            dispatch(getUser(user.accessToken)).then((res) =>
              console.log("스토어 업데이트 까지 완", res),
            );
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onCloseClick = useCallback(() => {
    setIsFilterModal(false);
  }, []);

  const modifyCategory = async (checkList) => {
    console.log("넘어온 체크 리스트", checkList);
    const data = [];
    checkList.forEach((element) => {
      console.log(element);
      data.push({ c_id: element });
    });
    console.log("보낼 데이터 최종", data);
    await axios
      .post("/category", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
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
                이미지 수정{user.src}
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
            <p className="name">{user.nickname}</p>
            <p className="email">
              <FontAwesomeIcon icon={faEnvelope} />
              {user.email}
            </p>
          </div>
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
            <p>
              MY&nbsp; <b> INTEREST</b>
            </p>
            <p className="icon">
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => setIsFilterModal(true)}
              />
            </p>
          </div>
          <div className="list">
            {userCategory.length > 0 &&
              userCategory.map((c) => (
                <div key={c.c_id} className="category-item">
                  <p>{category[c.c_id].main}</p>
                  {category[c.c_id].sub}
                </div>
              ))}
          </div>
        </div>
      </div>
      {isFilterModal && (
        <FilterModal
          text={"수정하기"}
          closeHandler={onCloseClick}
          sendApi={modifyCategory}
        />
      )}
    </>
  );
}

const level = (level) => {
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
};
