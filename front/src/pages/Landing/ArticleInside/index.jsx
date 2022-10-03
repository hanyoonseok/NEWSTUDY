import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { category } from "constants/category";
import { Link } from "react-router-dom";

export default function ArticleInside({ Article }) {
  const level_value = [null, "A1", "A2", "B1", "B2", "C1", "C2"];

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
          <Link to={`/news/${Article.n_id}`}>
            <div className="article-screen">
              <div className="border"></div>
              <span>
                기사보러가기 &nbsp;&nbsp;
                <i>
                  <FontAwesomeIcon icon={faAnglesRight} />
                </i>
              </span>
            </div>
          </Link>
        )}
        <div className="article-img">
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
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="article"
              className={activeGoArticle ? "hover" : "normal"}
            />
          ) : (
            <img src={require("assets/article.png")} />
          )}
        </div>
        <span className="article-categories">
          <span className="article-category-main">
            {" "}
            <i>
              <FontAwesomeIcon icon={faCircle} />
            </i>
            {category[c_id].main}{" "}
          </span>

          <span className="article-category-sub">
            <i>
              <FontAwesomeIcon icon={faCircle} />
            </i>
            {category[c_id].sub}
          </span>
        </span>

        <div className="article-info">
          <Link to={`/news/${Article.n_id}`}>
            <h2 className="article-title">{title}</h2>
          </Link>
          <div className={`article-content visible`}>{content}</div>
        </div>
      </div>
    </>
  );
}
