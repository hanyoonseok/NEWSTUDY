import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCircle } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import React from "react";

export default function Filter({ clickHandler, filterCnt }) {
  return (
    <button
      className={`filter-btn ${filterCnt > 0 && "filter "}`}
      onClick={clickHandler}
    >
      <FontAwesomeIcon icon={faFilter} />
      &nbsp; FILTER &nbsp;
      {filterCnt > 0 && <p> {filterCnt}</p>}
    </button>
  );
}
