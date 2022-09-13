import { useRef, useEffect, useState } from "react";

import "./style.scss";

export default function Sidebar() {
  const sidebar = useRef();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("isLogin");
    if (localStorageItem === null || localStorageItem === "false")
      setIsLogin(false);
    else setIsLogin(true);
  }, []);

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
    <>
      {isLogin && (
        <nav
          className="sidebar-nav"
          onMouseOver={hoverHandler}
          onMouseOut={outHandler}
        >
          <div className="sidebar-contents">
            <div className="content">sidebar</div>
            <div className="sidebar-div" ref={sidebar}>
              asdsa
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
