import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Word from "components/Word";
import "./style.scss";

export default function MyVoca({ setVocaLength }) {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [filterVocas, setFilterVocas] = useState([]);
  const [userVocas, setUserVocas] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [wordMemorizeStatus, setWordMemorizeStatus] = useState(false); //단어 외움 상태 바꿨는지 감지할 변수

  useEffect(() => {
    getVocas();
    return () => {};
  }, []);

  useEffect(() => {
    changeFilterVocas();
    return () => {};
  }, [isChecked, userVocas]);

  useEffect(() => {
    changeFilterVocas();
    getVocas();
    return () => {};
  }, [wordMemorizeStatus]);

  const changeFilterVocas = () => {
    if (isChecked) {
      setFilterVocas(userVocas.filter((voca) => voca.done));
    } else {
      setFilterVocas(userVocas.filter((voca) => !voca.done));
    }
  };

  // 단어 목록 가져오기
  const getVocas = async () => {
    await axios
      .get(`/vocaburary`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserVocas(res.data);
      });
  };

  return (
    <>
      <div className="wrap">
        <input
          type="checkbox"
          id="memorize"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          checked={isChecked}
        />
        <label htmlFor="memorize">외운 단어 보기</label>
      </div>
      {filterVocas.length > 0 && (
        <Word
          vocas={filterVocas}
          setWordMemorizeStatus={setWordMemorizeStatus}
        />
      )}
    </>
  );
}
