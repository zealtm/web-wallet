import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import UserService from "../../../services/userService";
const userService = new UserService();

export function* authenticateUser(action) {
    try {
        const request = yield call(userService.userAuthenticate, action.email, action.password);

        if (request.status !== 200) {
            return yield put({
                type: "POST_USER_AUTHENTICATE",
                payload: { 
                    user: request 
                }
            });
        }
        
        return yield put({
            type: "REQUEST_FAILED",
            payload: {
                message: "Usuário e/ou senha incorretos"
            }
        });
    }

    catch (error) {
        console.warn("ERRO ", error);
    }
}

export default function* rootSaga() {
    yield [
        fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser)
    ];
}

