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
import LevelTest from "pages/LevelTest";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "../modules/index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
