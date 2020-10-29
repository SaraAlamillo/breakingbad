import { createStore as createStoreRedux } from "redux";
import { reducers } from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const createStore = () => {
  const composeEnhancers = composeWithDevTools({});

  const store = createStoreRedux(reducers, composeEnhancers());

  return store;
};
