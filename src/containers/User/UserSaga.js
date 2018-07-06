import { takeLatest, put, call } from "redux-saga/effects";

export function* userAuthenticate() {
    yield takeLatest("GET_USER_AUTHENTICATE_API", authenticate)
}

export function* authenticate(data) {
    const request = yield call("external_service", data);

    yield put({
        type: "GET_USER_AUTHENTICATE",
        data: request
    });
}

