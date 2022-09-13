import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import Layout from "components/Layout";
import Signup from "./Signup";
import Mypage from "./Mypage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
