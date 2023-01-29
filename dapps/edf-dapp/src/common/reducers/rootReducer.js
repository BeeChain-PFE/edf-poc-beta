import { combineReducers } from "redux";
import { signinReducer } from "./SigninReducer";

export const rootReducer = combineReducers({
  signin: signinReducer,
});
