import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function ArticleInside({ Article }) {
  const { title, content, level, c_id } = Article;

  return (
    <>
      <div className="article-wrapper">
        <div className="article-img">
          <img src={require("assets/article.png")} alt="article"></img>
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
          <div className="article-content">{content}</div>
        </div>
      </div>
    </>
  );
}
