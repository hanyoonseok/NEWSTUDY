import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import React from "react";

export default function LevelContainer({
  isMobile,
  onLevelClick,
  selectedLevel,
}) {
  const drawStar = (cnt, color) => {
    const rendering = () => {
      const result = [];
      for (let i = 0; i < 6; i++) {
        i < cnt
          ? result.push(
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: color }}
                key={`${color}${i}`}
              />,
            )
          : result.push(<FontAwesomeIcon icon={faStar} key={`${color}${i}`} />);
      }
      return result;
    };

    return rendering();
  };

  return (
    <div className="newslist-level-container">
      <div
        className={`newslist-level ${selectedLevel === 1 ? "active" : ""}`}
        onClick={onLevelClick(1)}
      >
        <h1 className="level-title Alv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; A1 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(1, "#a9dd75")}</span>
        )}
      </div>
      <div
        className={`newslist-level ${selectedLevel === 2 ? "active" : ""}`}
        onClick={onLevelClick(2)}
      >
        <h1 className="level-title Alv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; A2 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(2, "#a9dd75")}</span>
        )}
      </div>
      <div
        className={`newslist-level ${selectedLevel === 3 ? "active" : ""}`}
        onClick={onLevelClick(3)}
      >
        <h1 className="level-title Blv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; B1 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(3, "#96b2ff")}</span>
        )}
      </div>
      <div
        className={`newslist-level ${selectedLevel === 4 ? "active" : ""}`}
        onClick={onLevelClick(4)}
      >
        <h1 className="level-title Blv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; B2 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(4, "#96b2ff")}</span>
        )}
      </div>
      <div
        className={`newslist-level ${selectedLevel === 5 ? "active" : ""}`}
        onClick={onLevelClick(5)}
      >
        <h1 className="level-title Clv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; C1 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(5, "#debbff")}</span>
        )}
      </div>
      <div
        className={`newslist-level ${selectedLevel === 6 ? "active" : ""}`}
        onClick={onLevelClick(6)}
      >
        <h1 className="level-title Clv">
          <FontAwesomeIcon icon={faCircle} />
          &nbsp; C2 {!isMobile && "LV"}
        </h1>
        {!isMobile && (
          <span className="star-container">{drawStar(6, "#debbff")}</span>
        )}
      </div>
    </div>
  );
}
