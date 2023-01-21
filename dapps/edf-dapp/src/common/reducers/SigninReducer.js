import { ADD_KEY, ADD_DID } from "./types";

const initState = {
  publicKey: null,
  accountHash: null,
  isSignedIn: false,
  did: null,
  typeAccount: "client",
};

export const signinReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_KEY:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_DID:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
