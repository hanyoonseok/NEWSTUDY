import "./style.scss";
import { categoryFilter } from "constants";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FilterModal({ closeHandler }) {
  const user = useSelector((state) => state.user);
  const mainCategory = Object.keys(categoryFilter);
  const [category, setCategory] = useState([]);
  // const []

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
          setCategory(res.data);
        });
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="outside-area">
      <div className="modal-container">
        <h1 className="filter-modal-title">Category</h1>
        <div className="category-area">
          <article className="main-category-container">
            {category.length > 0 &&
              category.map((e, i) => (
                <label className="main-category-btn" key={i}>
                  <input
                    type="checkbox"
                    name={i}
                    // checked={
                    //   checkedList.includes(index + pageState * 15) ? true : false
                    // }
                    // onChange={(e) =>
                    //   addCheckList(e.target.checked, index + pageState * 15)
                    // }
                  />
                  {e.main}
                </label>
              ))}
          </article>
          <article className="sub-category-container"></article>
        </div>

        <div className="modal-submit-btn" onClick={closeHandler}>
          결과보기{" "}
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
