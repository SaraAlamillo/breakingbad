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
import { createReducer } from "./utils";

const initialState = {
  character: { loading: false, data: [], errorDescription: null },
  characters: { loading: false, data: [], errorDescription: null },
  episode: { loading: false, data: [], errorDescription: null },
  episodes: { loading: false, data: [], errorDescription: null },
  quote: { loading: false, data: [], errorDescription: null },
  quotes: { loading: false, data: [], errorDescription: null },
  deaths: { loading: false, data: [], errorDescription: null },
};

export const reducers = createReducer(initialState, {
  [DATA_CALL_EPISODES]: (state, action) => ({
    ...state,
    episodes: { ...state.episodes, loading: true },
  }),
  [DATA_RESPONSE_EPISODES]: (state, action) => ({
    ...state,
    episodes: {
      loading: false,
      data: action.payload,
      errorDescription: null,
    },
  }),
  [DATA_ERROR_EPISODES]: (state, action) => ({
    ...state,
    episodes: {
      loading: false,
      data: [],
      errorDescription: action.payload,
    },
  }),
  [DATA_CALL_EPISODE]: (state, action) => ({
    ...state,
    episode: { ...state.episode, loading: true },
  }),
  [DATA_RESPONSE_EPISODE]: (state, action) => ({
    ...state,
    episode: { loading: false, data: action.payload, errorDescription: null },
  }),
  [DATA_ERROR_EPISODE]: (state, action) => ({
    ...state,
    episode: { loading: false, data: [], errorDescription: action.payload },
  }),
  [DATA_CALL_CHARACTERS]: (state, action) => ({
    ...state,
    characters: { ...state.characters, loading: true },
  }),
  [DATA_RESPONSE_CHARACTERS]: (state, action) => ({
    ...state,
    characters: {
      loading: false,
      data: action.payload,
      errorDescription: null,
    },
  }),
  [DATA_ERROR_CHARACTERS]: (state, action) => ({
    ...state,
    characters: { loading: false, data: [], errorDescription: action.payload },
  }),
  [DATA_CALL_CHARACTER]: (state, action) => ({
    ...state,
    character: { ...state.character, loading: true },
  }),
  [DATA_RESPONSE_CHARACTER]: (state, action) => ({
    ...state,
    character: { loading: false, data: action.payload, errorDescription: null },
  }),
  [DATA_ERROR_CHARACTER]: (state, action) => ({
    ...state,
    character: { loading: false, data: [], errorDescription: action.payload },
  }),
  [DATA_CALL_QUOTES]: (state, action) => ({
    ...state,
    quotes: { ...state.quotes, loading: true },
  }),
  [DATA_RESPONSE_QUOTES]: (state, action) => ({
    ...state,
    quotes: { loading: false, data: action.payload, errorDescription: null },
  }),
  [DATA_ERROR_QUOTES]: (state, action) => ({
    ...state,
    quotes: { loading: false, data: [], errorDescription: action.payload },
  }),
  [DATA_CALL_QUOTE]: (state, action) => ({
    ...state,
    quote: { ...state.quote, loading: true },
  }),
  [DATA_RESPONSE_QUOTE]: (state, action) => ({
    ...state,
    quote: { loading: false, data: action.payload, errorDescription: null },
  }),
  [DATA_ERROR_QUOTE]: (state, action) => ({
    ...state,
    quote: { loading: false, data: [], errorDescription: action.payload },
  }),
  [DATA_CALL_DEATHS]: (state, action) => ({
    ...state,
    deaths: { ...state.deaths, loading: true },
  }),
  [DATA_RESPONSE_DEATHS]: (state, action) => ({
    ...state,
    deaths: { loading: false, data: action.payload, errorDescription: null },
  }),
  [DATA_ERROR_DEATHS]: (state, action) => ({
    ...state,
    deaths: { loading: false, data: [], errorDescription: action.payload },
  }),
});
