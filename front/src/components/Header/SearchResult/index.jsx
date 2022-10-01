import React from "react";
import "./style.scss";

function SearchResult({ article, query }) {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];

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
          className={`newscard-level ${
            level_value[article.level].includes("A")
              ? "Alv"
              : level_value[article.level].includes("B")
              ? "Blv"
              : "Clv"
          }`}
        >
          {level_value[article.level]}
        </i>
      </div>
    </div>
  );
}

export default SearchResult;
