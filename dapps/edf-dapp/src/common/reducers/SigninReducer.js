import { ADD_KEY } from "./types";

const initState = {
  publicKey: null,
  // accountHash: null,
  isSignedIn: false,
  // did: null,
  typeAccount: "client",
  // token: null,
};

export const signinReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_KEY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { state };
  }
};
