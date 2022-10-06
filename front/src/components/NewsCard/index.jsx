import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkone } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from "react";
import { category } from "constants/category";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { intToLevel } from "constants";
import DefaultThumb from "assets/default-thumb.png";

export default function NewsCard({ news, stretch, query, isScrap }) {
  news.content = news.content
    .replaceAll(/@@divsubtitle/g, "")
    .replaceAll(/@@divimg/g, "")
    .replaceAll(/@@div/g, "");
  const [queryIdx, setQueryIdx] = useState(-1);
  const [queryTitleIdx, setQueryTitleIdx] = useState(-1);
  const navigate = useNavigate();
  const onLinkClick = () => {
    navigate(`/news/${news.n_id}`);
  };

  useEffect(() => {
    if (news && query) {
      setQueryIdx(news.content.toUpperCase().indexOf(query.toUpperCase()));
      setQueryTitleIdx(news.title.toUpperCase().indexOf(query.toUpperCase()));
    }
  }, [news]);

  return (
    <div
      className={`newscard-container ${stretch ? "stretch" : ""}`}
      onClick={onLinkClick}
    >
      <div className="newscard-img-container">
        <img
          src={news.thumbnail ? news.thumbnail : DefaultThumb}
          alt=""
          className="newscard-img"
        />
        <i
          className={`newscard-level ${
            news.level <= 2 ? "Alv" : news.level <= 4 ? "Blv" : "Clv"
          }`}
        >
          {intToLevel[news.level]}
        </i>
      </div>
      <div className="newscard-contents-container">
        {queryTitleIdx >= 0 ? (
          <h1 className="newscard-title">
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
          </h1>
        ) : (
          <h1 className="newscard-title">{news.title}</h1>
        )}
        {query ? (
          <h3 className="newscard-body">
            {queryIdx >= 0 ? (
              <>
                <b>
                  {news.content.substring(queryIdx, queryIdx + query.length)}
                </b>
                {news.content.substring(
                  queryIdx + query.length,
                  news.content.length,
                )}
              </>
            ) : (
              news.content
                .replaceAll(/@@divsubtitle/g, "")
                .replaceAll(/@@divimg/g, "")
                .replaceAll(/@@div/g, "")
            )}
          </h3>
        ) : (
          <h3 className="newscard-body">
            {news.content
              .replaceAll(/@@divsubtitle/g, "")
              .replaceAll(/@@divimg/g, "")
              .replaceAll(/@@div/g, "")}
          </h3>
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
