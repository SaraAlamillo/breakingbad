import {
  DATA_CALL_CHARACTER,
  DATA_CALL_CHARACTERS,
  DATA_CALL_DEATHS,
  DATA_CALL_EPISODES,
  DATA_CALL_EPISODE,
  DATA_CALL_QUOTE,
  DATA_CALL_QUOTES,
  DATA_RESPONSE_CHARACTER,
  DATA_RESPONSE_CHARACTERS,
  DATA_RESPONSE_DEATHS,
  DATA_RESPONSE_EPISODES,
  DATA_RESPONSE_EPISODE,
  DATA_RESPONSE_QUOTE,
  DATA_RESPONSE_QUOTES,
  DATA_ERROR_CHARACTER,
  DATA_ERROR_CHARACTERS,
  DATA_ERROR_DEATHS,
  DATA_ERROR_EPISODES,
  DATA_ERROR_EPISODE,
  DATA_ERROR_QUOTE,
  DATA_ERROR_QUOTES,
} from "../actions";

const initialState = {
  loading: false,
  errorDescription: "",
  dataEpisodes: [],
  dataEpisode: [],
  dataCharacters: [],
  dataCharacter: [],
  dataQuotes: [],
  dataQuote: [],
  dataDeaths: [],
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case DATA_CALL_EPISODES:
    case DATA_CALL_EPISODE:
    case DATA_CALL_CHARACTERS:
    case DATA_CALL_CHARACTER:
    case DATA_CALL_QUOTES:
    case DATA_CALL_QUOTE:
    case DATA_CALL_DEATHS:
      return { ...state, loading: true };
    case DATA_RESPONSE_EPISODES:
      return { ...state, loading: false, dataEpisodes: action.payload };
    case DATA_RESPONSE_EPISODE:
      return { ...state, loading: false, dataEpisode: action.payload };
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
    case DATA_ERROR_EPISODES:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataEpisodes: [],
      };
    case DATA_ERROR_EPISODE:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataEpisode: [],
      };
    case DATA_ERROR_CHARACTERS:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataCharacters: [],
      };
    case DATA_ERROR_CHARACTER:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataCharacter: [],
      };
    case DATA_ERROR_QUOTES:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataQuotes: [],
      };
    case DATA_ERROR_QUOTE:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataQuote: [],
      };
    case DATA_ERROR_DEATHS:
      return {
        ...state,
        loading: false,
        errorDescription: action.payload,
        dataDeaths: [],
      };
    default:
      return state;
  }
};
