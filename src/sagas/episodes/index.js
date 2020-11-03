import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_CALL_EPISODES,
  DATA_ERROR_EPISODES,
  DATA_RESPONSE_EPISODES,
} from "../../actions";
import { getEpisodes as getEpisodesApi } from "../../api";

export default function* episodesSaga() {
  yield spawn(watchGetEpisodesAsync);
}

function* watchGetEpisodesAsync() {
  yield takeEvery(DATA_CALL_EPISODES, getEpisodes);
}

function* getEpisodes(action) {
  try {
    const response = yield call(getEpisodesApi);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_EPISODES, payload: response.data });
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_EPISODES,
      payload: error,
    });
  }
}
