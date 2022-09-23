import { BrowserRouter, Route, Routes } from "react-router-dom";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import Landing from "pages/Landing";
import NewsDetail from "pages/NewsDetail";
import NationsNewsList from "pages/NationsNewsList";
import NewsList from "pages/NewsList";
import Layout from "components/Layout";
import Signup from "./Signup";
import Mypage from "./Mypage";
import LevelTest from "pages/LevelTest";

import rootReducer from "../modules/index";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Onboarding />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/leveltest" element={<LevelTest />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/news/:id" element={<NewsDetail />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/nationsnews" element={<NationsNewsList />}></Route>
            <Route path="/news/list" element={<NewsList />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
