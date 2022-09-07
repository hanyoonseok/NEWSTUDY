import { useState } from "react";
import "./style.scss";

export default function Header() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <nav className="header-nav">
      {isLogin ? (
        <>
          {" "}
          <input />
          <button>login 되어잇음</button>
        </>
      ) : (
        <>
          <div>&nbsp;</div> <button>login</button>
        </>
      )}
    </nav>
  );
}
