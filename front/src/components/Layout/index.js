import "./style.scss";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

export default function Layout({ children }) {
  return (
    <div className="layout-div">
      {/* <Header /> */}
      {/* <Sidebar /> */}
      {children}
    </div>
  );
}
