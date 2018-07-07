import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { authenticateUser } from "./UserSaga";

export default function* rootSaga() {
    yield[
        fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser)
    ];
}
