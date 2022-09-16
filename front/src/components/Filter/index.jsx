import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

export default function Filter({ clickHandler }) {
  return (
    <button className="filter-btn" onClick={clickHandler}>
      FILTER&nbsp;
      <FontAwesomeIcon icon={faFilter} />
    </button>
  );
}
