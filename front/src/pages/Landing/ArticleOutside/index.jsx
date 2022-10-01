import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { category } from "constants/category";

function ArticleOutside({ Article }) {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];
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
          <span
            className={`article-level ${
              level_value[level].includes("A")
                ? "Alv"
                : level_value[level].includes("B")
                ? "Blv"
                : "Clv"
            }`}
          >
            {level_value[level]}
          </span>
        </div>
        <div className="article-info-desc">
          <div className="article-title">{title}</div>
          <div className="article-content">{content}</div>
          <span className="article-category">
            <i>
              <FontAwesomeIcon icon={faCircle} />
            </i>
            {category[c_id].main}
          </span>
        </div>
      </div>
    </>
  );
}

export default ArticleOutside;
