import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { setAuthToken } from "../../../utils/localStorage";
import AuthService from "../../../services/authService";
const authService = new AuthService();

export function* authenticateUser(action) {
  try {
    const request = yield call(
      authService.authenticate,
      action.email,
      action.password
    );

    if (request.status === 200) {
      yield call(setAuthToken, request.data.token);

      return yield put({
        type: "POST_USER_AUTHENTICATE",
        payload: {
          page: 1,
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
        message:
          "Your request could not be completed. Check your connection or try again later"
      }
    });
  }
}

export function* twoFactorAuth() {
  try {
    return yield put({
      type: "POST_2FA_AUTHENTICATE",
      payload: {
        page: 2
      }
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message:
          "Your request could not be completed. Check your connection or try again later"
      }
    });
  }
}

export function* createUser() {
  try {
    return yield put({
      type: "POST_USER_CREATE_USER",
      payload: {
        page: 1
      }
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message:
          "Your request could not be completed. Check your connection or try again later"
      }
    });
  }
}

export function* resetUser() {
  try {
    console.warn("AQUI");
    return yield put({
      type: "POST_USER_RESET_USER",
      payload: {
        page: 1
      }
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message:
          "Your request could not be completed. Check your connection or try again later"
      }
    });
  }
}

export default function* rootSaga() {
  yield [
    fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser),
    fork(takeLatest, "POST_2FA_AUTHENTICATE_API", twoFactorAuth),
    fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
    fork(takeLatest, "POST_USER_RESET_USER_API", resetUser)
  ];
}
