import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";

function ArticleOutside({ Article }) {
  const { title, content, level, c_id, thumbnail } = Article;
  return (
    <>
      <div className="article-wrapper-side">
        <div className="article-img">
          {thumbnail ? (
            <img src={thumbnail} alt="article"></img>
          ) : (
            <img src={require("assets/article.png")}></img>
          )}
          <span className="article-level">{level}</span>
        </div>
        <div className="article-info-desc">
          <div className="article-title">{title}</div>
          <div className="article-content">{content}</div>
          <span className="article-category">
            <i>
              <FontAwesomeIcon icon={faCircle} />
            </i>
            {c_id}
          </span>
        </div>
      </div>
    </>
  );
}

export default ArticleOutside;
