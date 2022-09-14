import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function ArticleOutside({ Article }) {
  const { title, content, level, category } = Article;
  return (
    <>
      <div className="article-wrapper-side">
        <div className="article-img">
          <img src={require("assets/article.png")} alt="article"></img>
          <span className="article-level">{level}</span>
        </div>
        <div className="article-info-desc">
          <div className="article-title">{title}</div>
          <div className="article-content">{content}</div>
          <span className="article-category">
            <i>
              <FontAwesomeIcon icon={faCircle} />
            </i>
            {category}
          </span>
        </div>
      </div>
    </>
  );
}

export default ArticleOutside;
