import { applyMiddleware, createStore as createStoreRedux } from "redux";
import { reducers } from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";

export const createStore = () => {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();

  const store = createStoreRedux(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(sagas);

  return store;
};
