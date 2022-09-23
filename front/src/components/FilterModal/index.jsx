import "./style.scss";
import { categoryFilter } from "constants";
import React from "react";

export default function FilterModal({ closeHandler }) {
  const mainCategory = Object.keys(categoryFilter);

  return (
    <div className="outside-area">
      <div className="modal-container">
        <h1 className="filter-modal-title">Category</h1>
        <div className="category-area">
          <article className="main-category-container">
            {mainCategory.map((e, i) => (
              <div className="main-category-btn" key={i}>
                {e}
              </div>
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
