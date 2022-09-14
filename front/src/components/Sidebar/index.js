import { useRef } from "react";

import "./style.scss";

export default function Sidebar() {
  const sidebar = useRef();

  const hoverHandler = () => {
    console.log("sadf");
    sidebar.current.style.left = "80px";
    sidebar.current.style.opacity = "1";
  };

  const outHandler = () => {
    console.log("out");
    sidebar.current.style.left = "-120px";
    sidebar.current.style.opacity = "0";
  };

  return (
    <nav
      className="sidebar-nav"
      onMouseOver={hoverHandler}
      onMouseOut={outHandler}
    >
      <div className="sidebar-contents">
        <div className="sidebar-content">sidebar</div>
        <div className="sidebar-div" ref={sidebar}>
          asdsa
        </div>
      </div>
    </nav>
  );
}
