import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import Layout from "components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
