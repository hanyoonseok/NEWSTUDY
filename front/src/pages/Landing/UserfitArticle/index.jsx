import React, { useState } from "react";
import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
function UserfitArticle({ children, active, setActive }) {
  const count = React.Children.count(children);
  const MAX_VISIBILITY = 3;
  return (
    <>
      <div className="carousel">
        {active > 0 && (
          <button
            className="nav left"
            onClick={() => setActive((active) => active - 1)}
          >
            <i>
              <FontAwesomeIcon icon={faChevronLeft} />
            </i>
          </button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="card-container"
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            {child}
          </div>
        ))}
        {active < count - 1 && (
          <button
            className="nav right"
            onClick={() => setActive((active) => active + 1)}
          >
            <i>
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          </button>
        )}
      </div>
    </>
  );
}

export default UserfitArticle;
