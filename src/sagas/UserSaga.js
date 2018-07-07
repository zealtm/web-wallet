import { put, call } from "redux-saga/effects";
import UserService from "../services/UserService";
const userService = new UserService();

export function* authenticateUser(action) {
    try {
        const request = yield call(
            userService.userAuthenticate,
            action.email,
            action.password);

        console.warn("saga", request);
        yield put({
            type: "POST_USER_AUTHENTICATE",
            data: request
        });
    } catch (error) {
        console.error("failed: ", error)
    }

}

