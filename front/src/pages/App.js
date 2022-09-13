import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import NewsDetail from "pages/NewsDetail";
import Layout from "components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/news/:id" element={<NewsDetail />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
