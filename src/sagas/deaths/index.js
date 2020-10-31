import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_ERROR_DEATHS,
  DATA_CALL_DEATHS,
  DATA_RESPONSE_DEATHS,
} from "../../actions";
import { getDeaths as getDeathsApi } from "../../api";

export default function* deathsSaga() {
  yield spawn(watchGetDeathsAsync);
}

function* watchGetDeathsAsync() {
  yield takeEvery(DATA_CALL_DEATHS, getDeaths);
}

function* getDeaths(action) {
  try {
    const response = yield call(getDeathsApi);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_DEATHS, payload: response.data });
    } else {
      throw `${response.status} - ${response.statusText}`;
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_DEATHS,
      payload: error?.response,
    });
  }
}
