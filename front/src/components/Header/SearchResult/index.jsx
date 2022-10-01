import React from "react";
import "./style.scss";

function SearchResult({ article, query }) {
  return (
    <div className="search-article">
      <div className="search-article-thumbnail">
        <img src={article.thumbnail} alt="article"></img>
      </div>
      <div className="search-article-title">
        {article.title.includes(query) ? (
          <>
            {article.title.split(query)[0]}
            <b>{query}</b>
            {article.title.split(query)[1]}
          </>
        ) : (
          article.title
        )}
      </div>
      <div className="search-article-level">
        <i
          // className={`newscard-level ${
          //   article.level.includes("A")
          //     ? "Alv"
          //     : article.level.includes("B")
          //     ? "Blv"
          //     : "Clv"
          // }`}
          className="newscard-level Alv"
        >
          {article.level}
        </i>
      </div>
    </div>
  );
}

export default SearchResult;
