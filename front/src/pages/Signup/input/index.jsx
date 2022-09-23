import "./style.scss";
import React from "react";
export default function Input({ type, placeholder }) {
  return (
    <div className="input-div">
      <div className="box"></div>
      <input type={type} placeholder={placeholder} required></input>
    </div>
  );
}
