import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import AuthService from "../../../services/authService";
import { setAuthToken, getAuthToken } from "../../../utils/localStorage";
const authService = new AuthService();

export function* authenticateUser(action) {
  try {
    const request = yield call(
      authService.authenticate,
      action.payload.email,
      action.payload.password
    );

    if (request.status === 200) {
      yield call(setAuthToken, request.data.data.token);
      let userToken = yield call(getAuthToken);
      const hasTwoFactorAuth = yield call(
        authService.hasTwoFactorAuth,
        userToken
      );

      return yield put({
        type: "POST_USER_AUTHENTICATE",
        user: {
          token: userToken
        },
        pages: {
          login: hasTwoFactorAuth.data.code === 200 ? 1 : 2
        }
      });
    }

    if (request.status === 401 || request.status === 403) {
      yield put({
        type: "REQUEST_FAILED",
        payload: {
          message: "Inavlid Username/Email or Password"
        }
      });
    }

    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message: "Failed to try authentication"
      }
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message:
          "Your request could not be completed. Check your connection or try again later"
      }
    });
  }
}

export function* hasTwoFactorAuth() {
  try {
    const response = yield call(authService.hasTwoFactorAuth);
    if (response.status === 200)
      return yield put({
        type: "GET_USER_2FA",
        response
      });

    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message: "Could not verify 2fa"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message: error.message
    });
  }
}

export function* createTwoFactorAuth() {
  try {
    const response = yield call(authService.createTwoFactorAuth);
    if (response.status === 201)
      return yield put({
        type: "POST_USER_CREATE_2FA",
        response
      });

    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message: "Could not enable two-factor authentication"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message: error.message
    });
  }
}

export function* verifyTwoFactorAuth(action) {
  try {
    const response = yield call(
      authService.verifyTwoFactoryAuth,
      action.payload.token
    );

    if (response.status === 200)
      return yield put({
        type: "POST_USER_VERIFY_2FA",
        response,
        pages: {
          login: 2
        }
      });

    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message: "Invalid value inserted"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      payload: {
        message: error.message
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
      type: "CHANGE_LOADING_STATE"
    });

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
    fork(takeLatest, "POST_USER_CREATE_2FA_API", createTwoFactorAuth),
    fork(takeLatest, "POST_USER_VERIFY_2FA_API", verifyTwoFactorAuth),
    fork(takeLatest, "GET_USER_2FA_API", hasTwoFactorAuth),
    fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
    fork(takeLatest, "POST_USER_RESET_USER_API", resetUser)
  ];
}
