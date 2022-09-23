import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <div className="back-btn-wrapper" onClick={() => navigate(-1)}>
      <button className="back-btn"></button>
    </div>
  );
}
