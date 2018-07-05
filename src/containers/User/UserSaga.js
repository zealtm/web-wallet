import { takeEvery, put, call } from "redux-saga/effects";

export function* userAuthenticate() {
    yield takeEvery("ASYNC_USER_AUTHENTICATE", authenticate)
}

export function* authenticate(data) {
    const request = yield call("external_service", data);

    yield put({
        type: "USER_AUTHENTICATE",
        data: request
    });
}

