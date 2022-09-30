import "./style.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FilterModal({ text, closeHandler, sendApi }) {
  // sendApi는 선택 다 한다음 체크된 리스트 가지고 api처리하기 위한 props
  const user = useSelector((state) => state.user);
  const [allCategory, setAllCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [active, setActive] = useState("");
  const [checkedList, setCheckedList] = useState([]);

  const addCheckList = (checked, id) => {
    console.log("지금 체크된 id", id);
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
    console.log("체크된 값", checkedList);
  };
  const mainCategory = ["life", "news", "sports", "tech", "world", "other"]; //대분류 카테고리

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/category", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          setAllCategory(res.data);
        });
    };
    fetchData();
    return () => {};
  }, []);

  const openSub = (main) => {
    setSubCategory(allCategory.filter((category) => category.main === main)); //대분류에 맞춰 소분류 설정
  };

  return (
    <div className="outside-area" onClick={closeHandler}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="filter-modal-title">Category</h1>
        <div className="category-area">
          <article className="main-category-container">
            {mainCategory &&
              mainCategory.map((e, i) => (
                <div
                  className={`main-category-btn ${
                    active === e ? "active" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    openSub(e);
                    setActive(e);
                  }}
                >
                  {e}
                </div>
              ))}
          </article>
          {subCategory.length > 0 && (
            <article className="sub-category-container">
              {subCategory.map((sub) => (
                <label className="sub-category-name" key={sub.c_id}>
                  <input
                    type="checkbox"
                    name={sub.c_id}
                    checked={checkedList.includes(sub.c_id) ? true : false}
                    onChange={(e) => addCheckList(e.target.checked, sub.c_id)}
                  />
                  <span>{sub.sub}</span>
                </label>
              ))}
            </article>
          )}
        </div>

        <div
          className="modal-submit-btn"
          onClick={() => {
            sendApi(checkedList);
            closeHandler();
          }}
        >
          {text}
          <div className="arrow-btn-wrapper">
            <button className="right-arrow-btn"></button>
          </div>
          <div className="arrow-btn-wrapper">
            <button className="right-arrow-btn"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
