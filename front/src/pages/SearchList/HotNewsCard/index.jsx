import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { category } from "constants/category";

import React from "react";

function HotNewsCard({ news, isMobile, query }) {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="hottest-article">
      <i
        className={`hottest-article-level ${
          level_value[news.level].includes("A")
            ? "Alv"
            : level_value[news.level].includes("B")
            ? "Blv"
            : "Clv"
        }`}
      >
        {level_value[news.level]}
      </i>
      {isMobile && (
        <div className="hottest-article-category mobile">
          <FontAwesomeIcon icon={faCircle} />
          {news.c_id}
        </div>
      )}
      <span className="hottest-article-img">
        <img src={news.thumbnail} alt="article"></img>
      </span>
      <h1 className="hottest-article-title">
        {news.title.includes(query) ? (
          <>
            {news.title.split(query)[0]}
            <b>{query}</b>
            {news.title.split(query)[1]}
          </>
        ) : (
          news.title
        )}
      </h1>
      {!isMobile && (
        <div className="hottest-article-footer">
          <div className="hottest-article-category">
            <FontAwesomeIcon icon={faCircle} />
            {category[news.c_id].main}
          </div>
          <FontAwesomeIcon
            icon={faBookmark}
            className="hottest-article-bookmark"
          />
        </div>
      )}
    </div>
  );
}

export default HotNewsCard;
