import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_ERROR_QUOTES,
  DATA_CALL_QUOTES,
  DATA_RESPONSE_QUOTES,
} from "../../actions";
import { getQuotesByAuthor } from "../../api";

export default function* quoteSaga() {
  yield spawn(watchGetQuotesAsync);
}

function* watchGetQuotesAsync() {
  yield takeEvery(DATA_CALL_QUOTES, getQuotes);
}

function* getQuotes(action) {
  try {
    const response = yield call(getQuotesByAuthor, action.payload);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_QUOTES, payload: response.data });
    } else {
      throw `${response.status} - ${response.statusText}`;
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_QUOTES,
      payload: error?.response,
    });
  }
}
