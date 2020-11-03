import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_ERROR_CHARACTERS,
  DATA_CALL_CHARACTERS,
  DATA_RESPONSE_CHARACTERS,
} from "../../actions";
import { getCharacters as getCharactersApi } from "../../api";

export default function* charactersSaga() {
  yield spawn(watchGetCharactersAsync);
}

function* watchGetCharactersAsync() {
  yield takeEvery(DATA_CALL_CHARACTERS, getCharacters);
}

function* getCharacters(action) {
  try {
    const response = yield call(getCharactersApi);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_CHARACTERS, payload: response.data });
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_CHARACTERS,
      payload: error,
    });
  }
}
