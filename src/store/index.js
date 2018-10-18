import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

export default function storeConfiguration(initialState = {}) {
  const middlewares = [thunkMiddleware];

  let composeEnhancers = compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
