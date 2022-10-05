import React from "react";
import "./style.scss";
import GlobeImg from "assets/user_globe.png";
import { useNavigate } from "react-router-dom";

export default function Modal({ text, setStatus, movePage }) {
  const navigate = useNavigate();

  return (
    <div className="alert-modal" onClick={() => setStatus(false)}>
      <div className="alert-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={GlobeImg} alt="지구본이미지"></img>
        </div>
        {text}
        <button
          onClick={() => {
            setStatus(false);
            movePage && navigate(-1);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
