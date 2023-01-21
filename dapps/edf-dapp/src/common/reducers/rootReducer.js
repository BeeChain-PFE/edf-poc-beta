import { combineReducers } from "redux";
import { holderReducer } from "./holderReducer";
import { signinReducer } from "./SigninReducer";
import { vcReducer } from "./vcReducer";
import { verifierReducer } from "./verifierReducer";
import { vpRequestsReducer } from "./vpRequestsReducer";

export const rootReducer = combineReducers({
  signin: signinReducer,
  verefier: verifierReducer,
  vcList: vcReducer,
  vpRequest: vpRequestsReducer,
  holder: holderReducer,
});
