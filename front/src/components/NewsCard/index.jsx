import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkone } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect } from "react";
import { category } from "constants/category";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { intToLevel } from "constants";

export default function NewsCard({ news, stretch, query, isScrap }) {
  const navigate = useNavigate();
  const onLinkClick = () => {
    navigate(`/news/${news.n_id}`);
  };
  console.log(isScrap);
  return (
    <div
      className={`newscard-container ${stretch ? "stretch" : ""}`}
      onClick={onLinkClick}
    >
      <div className="newscard-img-container">
        <img src={news.thumbnail} alt="" className="newscard-img" />
        <i
          className={`newscard-level ${
            news.level <= 2 ? "Alv" : news.level <= 4 ? "Blv" : "Clv"
          }`}
        >
          {intToLevel[news.level]}
        </i>
      </div>
      <div className="newscard-contents-container">
        {query ? (
          <h1 className="newscard-title">
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
        ) : (
          <h1 className="newscard-title">{news.title}</h1>
        )}
        {query ? (
          <h3 className="newscard-body">
            {news.content.includes(query) ? (
              <>
                {news.content.split(query)[0]}
                <lb>{query}</lb>
                {news.content.split(query)[1]}
              </>
            ) : (
              news.content
            )}
          </h3>
        ) : (
          <h3 className="newscard-body">{news.content}</h3>
        )}

        <div className="newscard-footer">
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
          <div className="newscard-footer-right">
            <i>{news.date.substring(0, 10)}</i>{" "}
            {isScrap ? (
              <FontAwesomeIcon icon={faBookmark} />
            ) : (
              <FontAwesomeIcon icon={faBookmarkone} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
