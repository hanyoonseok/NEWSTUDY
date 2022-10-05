import React from "react";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useEffect } from "react";

export default function DarkToggle({ isDark, setIsDark }) {
  const localStorageDark = localStorage.getItem("dark");

  useEffect(() => {
    if (localStorageDark === null || localStorageDark === "false")
      setIsDark(false);
    else setIsDark(true);
  }, [localStorageDark]);

  //다크모드 설정
  const clickDarkToggle = (checked) => {
    if (checked) {
      setIsDark(true);
      localStorage.setItem("dark", true);
    } else {
      setIsDark(false);
      localStorage.removeItem("dark");
    }
  };
  return (
    <div className="dark-toggle" key={"darkmode"}>
      <div>
        <FontAwesomeIcon icon={faMoon} />
      </div>
      <input
        type="checkbox"
        id="darkmode"
        checked={isDark}
        onChange={(e) => clickDarkToggle(e.target.checked)}
      />
      <label htmlFor="darkmode"></label>
    </div>
  );
}
