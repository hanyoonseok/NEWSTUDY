import React from "react";
import "./style.scss";
import GlobeImg from "assets/user_globe.png";

export default function Modal({ text, setStatus }) {
  return (
    <div className="email-modal" onClick={() => setStatus(false)}>
      <div className="email-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={GlobeImg} alt="지구본이미지"></img>
        </div>
        {text}
        <button onClick={() => setStatus(false)}>확인</button>
      </div>
    </div>
  );
}
