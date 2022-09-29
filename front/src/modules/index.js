import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";
import user from "./user/user";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  user,
});

export default persistReducer(persistConfig, rootReducer);
