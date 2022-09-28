import React from "react";
import "./style.scss";

export default function BadgeModal({ img, text, setStatus }) {
  return (
    <div className="badge-modal" onClick={() => setStatus(false)}>
      <div className="badge-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={require(`assets/${img}`)} alt="배지 이미지"></img>
        </div>
        <div className="text-box">
          축하합니다 <br />"{text}" 배지를 획득하셨습니다!
        </div>
        <button onClick={() => setStatus(false)}>확인</button>
      </div>
    </div>
  );
}
