import "./style.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faNewspaper,
  faBaseballBatBall,
  faMicrochip,
  faGlobe,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

import { category } from "constants/category";

export default function FilterModal({
  text,
  closeHandler,
  sendApi,
  selectedCategory,
}) {
  // sendApi는 선택 다 한다음 체크된 리스트 가지고 api처리하기 위한 props
  const [subCategory, setSubCategory] = useState([]);
  const [active, setActive] = useState("");
  const [cidArray, setCidArray] = useState(
    selectedCategory.map((el) => {
      return el.c_id;
    }),
  );

  const addCheckList = (id) => {
    if (cidArray.includes(id)) {
      setCidArray(cidArray.filter((item) => item !== id));
    } else {
      setCidArray([...cidArray, id]);
    }
  };
  const mainCategory = ["life", "news", "sports", "tech", "world", "other"]; //대분류 카테고리
  const icon = [
    faLeaf,
    faNewspaper,
    faBaseballBatBall,
    faMicrochip,
    faGlobe,
    faEllipsis,
  ];

  const openSub = (main) => {
    setSubCategory(category.filter((c) => c && c.main === main)); //대분류에 맞춰 소분류 설정
  };

  return (
    <div className="filter-outside-area" onClick={closeHandler}>
      <div
        className="filter-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
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
                  <span>
                    <FontAwesomeIcon icon={icon[i]} />
                  </span>
                  {e}
                </div>
              ))}
          </article>
          {subCategory.length > 0 && (
            <article className="sub-category-container">
              {subCategory.map(
                (sub) =>
                  sub.sub !== "" && (
                    <label className="sub-category-name" key={sub.c_id}>
                      <input
                        type="checkbox"
                        name={sub.c_id}
                        checked={cidArray.includes(sub.c_id)}
                        onChange={(e) => addCheckList(sub.c_id)}
                      />
                      <span>
                        {sub.sub.replace(/^./, sub.sub[0].toUpperCase())}
                      </span>
                    </label>
                  ),
              )}
            </article>
          )}
        </div>

        <div
          className="modal-submit-btn"
          onClick={() => {
            sendApi(cidArray);
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
