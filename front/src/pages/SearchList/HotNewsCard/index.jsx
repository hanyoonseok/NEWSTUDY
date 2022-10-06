import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkEmpty } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";
import { category } from "constants/category";
import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import DefaultThumb from "assets/default-thumb.png";
import { useState } from "react";

function HotNewsCard({ news, isMobile, query, isScrap }) {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];
  const [queryTitleIdx, setQueryTitleIdx] = useState(-1);

  useEffect(() => {
    if (news && query) {
      setQueryTitleIdx(news.title.toUpperCase().indexOf(query.toUpperCase()));
    }
  }, [news]);

  return (
    <Link to={`/news/${news.n_id}`} className="hottest-article">
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
      <span className="hottest-article-img">
        <img
          src={news.thumbnail ? news.thumbnail : DefaultThumb}
          alt="article"
        ></img>
      </span>
      <h1 className="hottest-article-title">
        {queryTitleIdx >= 0 ? (
          <>
            {news.title.substring(0, queryTitleIdx)}
            <b>
              {news.title.substring(
                queryTitleIdx,
                queryTitleIdx + query.length,
              )}
            </b>
            {news.title.substring(
              queryTitleIdx + query.length,
              news.title.length,
            )}
          </>
        ) : (
          news.title
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
    </Link>
  );
}

export default HotNewsCard;
