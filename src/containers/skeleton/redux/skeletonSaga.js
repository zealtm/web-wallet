import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";

import { internalServerError } from "../../../containers/errors/statusCodeMessage";

export function* authenticateUser(action) {
  try {
    let response = yield call();
    console.warn(response, action)
    yield put({
      type: "POST_USER_AUTHENTICATE"
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_LOADING_STATE" });
    yield put({ type: "CHANGE_ERROR_STATE" });
    yield put(internalServerError());
  }
}

export default function* rootSaga() {
  yield [fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser)];
}
