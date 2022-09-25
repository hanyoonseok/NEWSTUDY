import React from "react";
import "./style.scss";

function SearchResult({ article }) {
  return (
    <div className="search-article">
      <div className="search-article-thumbnail">
        <img src={require("assets/article.png")} alt="article"></img>
      </div>
      <div className="search-article-title">{article.title}</div>
      <div className="search-article-level">
        <i
          className={`newscard-level ${
            article.level.includes("A")
              ? "Alv"
              : article.level.includes("B")
              ? "Blv"
              : "Clv"
          }`}
        >
          {article.level}
        </i>
      </div>
    </div>
  );
}

export default SearchResult;
