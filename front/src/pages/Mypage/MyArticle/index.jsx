import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { intToLevel } from "constants";
import { category } from "constants/category";
import "./style.scss";
import DefaultThumb from "assets/default-thumb.png";

export default function MyArticle() {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    getArticles();
    return () => {};
  }, []);

  //기사 목록 가져오기
  const getArticles = async () => {
    await axios
      .get(`/scrap`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserArticles(res.data);
      });
  };

  return (
    <div className="article-box">
      {userArticles.length > 0 &&
        userArticles.map((article, index) => (
          <Link to={`/news/${article.n_id}`} className="article" key={index}>
            <span
              className={`${
                article.level <= 2 ? "Alv" : article.level <= 4 ? "Blv" : "Clv"
              }`}
            >
              {intToLevel[article.level]}
            </span>
            <div className="img-box">
              <img
                src={article.thumbnail ? article.thumbnail : DefaultThumb}
                alt="기사 이미지"
              ></img>
            </div>
            <p>{article.title}</p>
            <div className="">{article.c_id} </div>
          </Link>
        ))}
    </div>
  );
}
