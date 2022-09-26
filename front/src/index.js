import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const DEFAULT_ACCEPT_TYPE =
  "application/json; charset=utf-8; application/x-www-form-urlencoded;";
axios.defaults.headers.common["Content-Type"] = DEFAULT_ACCEPT_TYPE;
axios.defaults.withCredentials = true; // refreshToken 주고받기 위한 처리

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);

// react v 17 버전용
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
