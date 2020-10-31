import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_CALL_CHARACTER,
  DATA_ERROR_CHARACTER,
  DATA_RESPONSE_CHARACTER,
} from "../../actions";
import { getCharacterByName } from "../../api";

export default function* characterSaga() {
  yield spawn(watchGetCharacterAsync);
}

function* watchGetCharacterAsync() {
  yield takeEvery(DATA_CALL_CHARACTER, getCharacter);
}

function* getCharacter(action) {
  try {
    const response = yield call(getCharacterByName, action.payload);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_CHARACTER, payload: response.data });
    } else {
      throw `${response.status} - ${response.statusText}`;
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_CHARACTER,
      payload: error?.response,
    });
  }
}
