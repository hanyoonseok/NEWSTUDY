import "./style.scss";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

export default function Word({ vocas, setWordMemorizeStatus }) {
  const user = useSelector((state) => state.user.currentUser);

  const changeMemorizeStatus = async (voca) => {
    await axios
      .put(`/vocaburary/${voca.v_id}`, null, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setWordMemorizeStatus((current) => !current);
      });
  };

  return (
    <div className="voca-box">
      {vocas.map((voca, index) => (
        <div className="voca" key={index}>
          <div
            onClick={() => changeMemorizeStatus(voca)}
            className={"memorize " + (voca.done ? "blue" : "grey")}
          ></div>
          <div className="word">{voca.eng}</div>
          <div className="mean">
            {/* {voca.part.map((item, index) => (
              <div key={index}>
                {item.id === 0 && <p className="tag blue">형</p>}
                {item.id === 1 && <p className="tag orange">명</p>}
                {item.id === 2 && <p className="tag pink">부</p>}
                {item.id === 3 && <p className="tag green">동</p>}
                <p className="kor-mean">{item.mean}</p>
              </div>
            ))} */}
            {voca.kor}
          </div>
        </div>
      ))}
    </div>
  );
}
