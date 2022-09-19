import { Route } from "react-router-dom";

import RedirectComponent from "./RedirectComponent";

export const NotAuthRoute = ({ path, element }) => {
  const me = localStorage.getItem("isLogin");

  return <Route path={path} element={element} />;
  //   return me === "true" ? ( // 로그인 했을 시 접근 불가 페이지들
  //     <RedirectComponent needAuth={false} />
  //   ) : (
  //     <Route path={path} element={element}></Route>
  //   );
};
