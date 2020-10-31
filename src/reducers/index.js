import { combineReducers } from "redux";
import {
  DATA_ERROR,
  DATA_LOADING,
  DATA_RESPONSE_CHARACTER,
  DATA_RESPONSE_CHARACTERS,
  DATA_RESPONSE_DEATHS,
  DATA_RESPONSE_EPISODES,
  DATA_RESPONSE_QUOTE,
  DATA_RESPONSE_QUOTES,
} from "../actions";

const initialState = {
  loading: false,
  errorDescription: null,
  dataEpisodes: [],
  dataCharacters: [],
  dataCharacter: {},
  dataQuotes: [],
  dataQuote: {},
  dataDeaths: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, loading: true };
    case DATA_RESPONSE_EPISODES:
      return { ...state, loading: false, dataEpisodes: action.payload };
    case DATA_RESPONSE_CHARACTERS:
      return { ...state, loading: false, dataCharacters: action.payload };
    case DATA_RESPONSE_CHARACTER:
      return { ...state, loading: false, dataCharacter: action.payload };
    case DATA_RESPONSE_QUOTES:
      return { ...state, loading: false, dataQuotes: action.payload };
    case DATA_RESPONSE_QUOTE:
      return { ...state, loading: false, dataQuote: action.payload };
    case DATA_RESPONSE_DEATHS:
      return { ...state, loading: false, dataDeaths: action.payload };
    case DATA_ERROR:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataEpisodes: [],
        dataCharacters: [],
        dataCharacter: {},
        dataQuotes: [],
        dataQuote: {},
        dataDeaths: [],
      };
    default:
      return state;
  }
};

export const reducers = reducer;
// export const reducers = combineReducers({});
