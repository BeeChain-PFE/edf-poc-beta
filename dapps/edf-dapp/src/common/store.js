import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { signinReducer } from "./reducers/SigninReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const persistConfig = {
  key: "root",
  storage,
};
const pReducer = persistReducer(persistConfig, signinReducer);
export const store = createStore(pReducer, enhancer);
const Persistor = persistStore(store);

// export const store = createStore(
//     rootReducer,
//     compose(
//         (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//     ),
//     applyMiddleware(thunk));
export { Persistor };
