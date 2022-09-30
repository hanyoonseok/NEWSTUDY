import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

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
          <Link
            to="/news/:id"
            params={{ id: article.n_id }}
            className="article"
            key={index}
          >
            <span>{article.level}</span>
            <div className="img-box">
              <img src={require("assets/test.png")} alt="기사 이미지"></img>
            </div>
            <p>{article.title}</p>
          </Link>
        ))}
    </div>
  );
}
