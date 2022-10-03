import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "modules/user/user";
import FilterModal from "components/FilterModal";
import "./style.scss";
import { category } from "constants/category";

import DefaultUserImage from "assets/user_globe.png";
import A1 from "assets/level_A1.png";
import A2 from "assets/level_A2.png";
import B1 from "assets/level_B1.png";
import B2 from "assets/level_B2.png";
import C1 from "assets/level_C1.png";
import C2 from "assets/level_C2.png";
import { useCallback } from "react";
export default function MyInfo({
  myRecord,
  selectedCategory,
  setSelectedCategory,
}) {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState("");
  const fileInput = useRef(null);
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [userCategory, setUserCategory] = useState([]);

  useEffect(() => {
    if (user && !user.src) {
      setUserImage(DefaultUserImage);
    } else {
      setUserImage(user.src);
    }
    getCategory();
    return () => {};
  }, []);

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

  const getCategory = async () => {
    await axios
      .get("/category/me", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserCategory(res.data);
        setSelectedCategory(res.data);
      });
  };

  const modifyCategory = async (checkList) => {
    console.log("넘어온 체크 리스트", checkList);
    const data = checkList.map((element) => {
      return { c_id: element };
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
        getCategory();
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
            <p className="name">{user.nickname}</p>
            <p className="email">
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp;{user.email}
            </p>
          </div>
        </div>
        <div className="current">
          {myRecord.map((item, index) => (
            <div key={index}>
              <FontAwesomeIcon icon={item.icon} />
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
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
