import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

import React from "react";

function HotNewsCard({ news, isMobile, query }) {
  return (
    <div className="hottest-article">
      <i
        className={`hottest-article-level ${
          news.level.includes("A")
            ? "Alv"
            : news.level.includes("B")
            ? "Blv"
            : "Clv"
        }`}
      >
        {news.level}
      </i>
      {isMobile && (
        <div className="hottest-article-category mobile">
          <FontAwesomeIcon icon={faCircle} />
          {news.category}
        </div>
      )}
      <span className="hottest-article-img">
        <img src={require("assets/article.png")} alt="article"></img>
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
            {news.category}
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
