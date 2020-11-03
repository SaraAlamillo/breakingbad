import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_CALL_EPISODE,
  DATA_ERROR_EPISODE,
  DATA_RESPONSE_EPISODE,
} from "../../actions";
import { getEpisodeById } from "../../api";

export default function* episodeSaga() {
  yield spawn(watchGetEpisodeAsync);
}

function* watchGetEpisodeAsync() {
  yield takeEvery(DATA_CALL_EPISODE, getEpisode);
}

function* getEpisode(action) {
  try {
    const response = yield call(getEpisodeById, action.payload);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_EPISODE, payload: response.data });
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_EPISODE,
      payload: error,
    });
  }
}
