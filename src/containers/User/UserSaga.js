import { takeLatest, put, call, all } from "redux-saga/effects";
import UserService from "../../services/UserService";
const userService = new UserService();

 
function* authenticateUser(data) {
    const request = yield call( userService.userAuthenticate, data.email, data.password);
    
    yield put({
        type: "POST_USER_AUTHENTICATE",
        data: request
    });
}

export default function* watchAll() {
    yield all([
        takeLatest("POST_USER_AUTHENTICATE_API", authenticateUser)
    ]); 
}

