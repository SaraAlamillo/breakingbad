import { call, put, spawn, takeEvery } from "redux-saga/effects";
import {
  DATA_ERROR_QUOTE,
  DATA_CALL_QUOTE,
  DATA_RESPONSE_QUOTE,
} from "../../actions";
import { getRandomQuoteByAuthor } from "../../api";

export default function* quoteSaga() {
  yield spawn(watchGetQuoteAsync);
}

function* watchGetQuoteAsync() {
  yield takeEvery(DATA_CALL_QUOTE, getQuote);
}

function* getQuote(action) {
  try {
    const response = yield call(getRandomQuoteByAuthor, action.payload);
    if (response.status === 200) {
      yield put({ type: DATA_RESPONSE_QUOTE, payload: response.data });
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR_QUOTE,
      payload: error,
    });
  }
}
