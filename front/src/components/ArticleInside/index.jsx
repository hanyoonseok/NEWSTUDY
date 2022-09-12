import React from "react";
import "./style.scss";

export default function ArticleInside({ Article }) {
  const { title, content, level, category } = Article;

  return (
    <>
      <div className="article-wrapper">
        <div className="article-img">
          <img src={require("assets/article.png")} alt="article"></img>
        </div>
        <span className="article-level">{level}</span>
        <span className="article-category">{category}</span>
        <div className="article-info">
          <h2 className="article-title">{title}</h2>
          <div className="article-content">{content}</div>
        </div>
      </div>
    </>
  );
}
