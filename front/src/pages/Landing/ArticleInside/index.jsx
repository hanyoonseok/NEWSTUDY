import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ArticleInside({ Article }) {
  const { title, content, level, c_id, thumbnail } = Article;
  const [activeGoArticle, setActiveGoArticle] = useState(false);
  return (
    <>
      <div
        className="article-wrapper"
        onMouseOver={() => setActiveGoArticle(true)}
        onMouseLeave={() => setActiveGoArticle(false)}
      >
        {activeGoArticle && (
          <div className="article-screen">
            <div className="border"></div>
            <span>
              기사보러가기 &nbsp;&nbsp;
              <i>
                <FontAwesomeIcon icon={faAnglesRight} />
              </i>
            </span>
          </div>
        )}
        <div className="article-img">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="article"
              className={activeGoArticle ? "hover" : "normal"}
            ></img>
          ) : (
            <img src={require("assets/article.png")}></img>
          )}
        </div>
        <span className="article-level">{level}</span>
        <span className="article-category">
          <i>
            <FontAwesomeIcon icon={faCircle} />
          </i>
          {c_id}
        </span>
        <div className="article-info">
          <h2 className="article-title">{title}</h2>
          <div className={`article-content visible`}>{content}</div>
        </div>
      </div>
    </>
  );
}
