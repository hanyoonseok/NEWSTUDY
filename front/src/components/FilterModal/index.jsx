import "./style.scss";
import { categoryFilter } from "constants";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FilterModal({ text, closeHandler }) {
  const user = useSelector((state) => state.user);
  // const mainCategory = Object.keys(categoryFilter);
  const [allCategory, setAllCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [active, setActive] = useState(false);
  const mainCategory = ["life", "news", "sports", "tech", "world", "other"];

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
    setSubCategory(allCategory.filter((category) => category.main === main));
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
                  className={`main-category-btn ${active ? "active" : ""}`}
                  key={i}
                  onClick={() => openSub(e)}
                >
                  {e}
                </div>
              ))}
          </article>
          {subCategory.length > 0 && (
            <article className="sub-category-container">
              {subCategory.map((e, i) => (
                <div key={i}>{e.sub}</div>
              ))}
            </article>
          )}
        </div>

        <div className="modal-submit-btn" onClick={closeHandler}>
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
