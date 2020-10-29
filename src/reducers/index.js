import { combineReducers } from "redux";
import { DATA_ERROR, DATA_LOADING, DATA_RESPONSE } from "../actions";

const initialState = { loading: false, data: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, loading: true };
    case DATA_RESPONSE:
      return { ...state, loading: false, data: action.payload };
    case DATA_ERROR:
      return { ...state, loading: false, data: [] };
    default:
      return state;
  }
};

export const reducers = reducer;
// export const reducers = combineReducers({});
