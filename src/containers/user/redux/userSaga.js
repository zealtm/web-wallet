import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import AuthService from "../../../services/authService";
import { setAuthToken } from "../../../utils/localStorage"
const authService = new AuthService();

export function* authenticateUser(action) {
    try {
        const request = yield call(authService.authenticate, 
            action.email, action.password);
        
        if (request.status == 200) {
            yield call(setAuthToken, request.data.token);
            
            return yield put({
                type: "POST_USER_AUTHENTICATE",
                payload: {
                    user: request
                }
            });
        }
        
        yield put({
            type: "REQUEST_FAILED",
            payload: {
                message: "Failed to try authentication"
            }
        });

    } catch (error) {
        yield put({
            type: "REQUEST_FAILED",
            payload: {
                message: error.message
            }
        });
    }
}

export default function* rootSaga() {
    yield [
        fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser)
    ];
}

