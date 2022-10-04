import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";
import { category } from "constants/category";
import { Link } from "react-router-dom";

import React from "react";

function HotNewsCard({ news, isMobile, query, isScrap }) {
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
      <Link to={`/news/${news.n_id}`}>
        <span className="hottest-article-img">
          <img src={news.thumbnail} alt="article"></img>
        </span>
      </Link>
      <h1 className="hottest-article-title">
        {news.title.includes(query) ? (
          <>
            <Link to={`/news/${news.n_id}`}>
              {news.title.split(query)[0]}
              <b>{query}</b>
              {news.title.split(query)[1]}
            </Link>
          </>
        ) : (
          <Link to={`/news/${news.n_id}`}>news.title</Link>
        )}
      </h1>
      {!isMobile && (
        <div className="hottest-article-footer">
          <div className="newscard-categories">
            <div className="newscard-category">
              <FontAwesomeIcon icon={faCircle} />
              {category[news.c_id].main}
            </div>
            <div className="newscard-category-sub">
              <FontAwesomeIcon icon={faCircle} />
              {category[news.c_id].sub}
            </div>
          </div>
          {isScrap ? (
            <FontAwesomeIcon
              icon={faBookmark}
              className="hottest-article-bookmark"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBookmarkEmpty}
              className="hottest-article-bookmark"
            />
          )}
        </div>
      )}
      {isMobile && (
        <div className="newscard-categories mobile">
          <div className="newscard-category ">
            <FontAwesomeIcon icon={faCircle} />
            {category[news.c_id].main}
          </div>
          <div className="newscard-category-sub">
            <FontAwesomeIcon icon={faCircle} />
            {category[news.c_id].sub}
          </div>
        </div>
      )}
    </div>
  );
}

export default HotNewsCard;
