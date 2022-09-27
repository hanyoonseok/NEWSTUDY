import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import "pages/global.scss";
import Onboarding from "pages/Onboarding";
import Landing from "pages/Landing";
import NewsDetail from "pages/NewsDetail";
import NationsNewsList from "pages/NationsNewsList";
import NewsList from "pages/NewsList";
import Layout from "components/Layout";
import Signup from "./Signup";
import Mypage from "./Mypage";
import SearchList from "./SearchList";
import GameMenu from "./GameMenu";
import CrossWord from "./CrossWord";
import SpeedQuiz from "./SpeedQuiz";
import LevelTest from "pages/LevelTest";
import AuthRoute from "routes/AuthRoute";
import { NotAuthRoute } from "routes/NotAuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<NotAuthRoute component={<Onboarding />} />}
          ></Route>
          <Route
            path="/signup"
            element={<NotAuthRoute component={<Signup />} />}
          ></Route>
          <Route
            path="/leveltest"
            element={<AuthRoute component={<LevelTest />} />}
          ></Route>
          <Route
            path="/landing"
            element={<AuthRoute component={<Landing />} />}
          ></Route>
          <Route
            path="/news/:id"
            element={<AuthRoute component={<NewsDetail />} />}
          ></Route>
          <Route
            path="/mypage"
            element={<AuthRoute component={<Mypage />} />}
          ></Route>
          <Route
            path="/nationsnews"
            element={<AuthRoute component={<NationsNewsList />} />}
          ></Route>
          <Route
            path="/news/list"
            element={<AuthRoute component={<NewsList />} />}
          ></Route>
          <Route
            path="/game/menu"
            element={<AuthRoute component={<GameMenu />} />}
          ></Route>
          <Route
            path="/game/crossword"
            element={<AuthRoute component={<CrossWord />} />}
          ></Route>
          <Route
            path="/game/speedquiz"
            element={<AuthRoute component={<SpeedQuiz />} />}
          ></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
