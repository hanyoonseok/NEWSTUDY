import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import NewsDetail from "pages/NewsDetail";
import NationsNewsList from "pages/NationsNewsList";
import Layout from "components/Layout";
import Signup from "./Signup";
import Mypage from "./Mypage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/news/:id" element={<NewsDetail />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/nationsnews" element={<NationsNewsList />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
