import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import Layout from "components/Layout";

import LevelTest from "pages/LevelTest";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/leveltest" element={<LevelTest />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
