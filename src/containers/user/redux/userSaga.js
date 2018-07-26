import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import AuthService from "../../../services/authService";
import { setAuthToken, getAuthToken } from "../../../utils/localStorage";
const authService = new AuthService();

export function* authenticateUser(action) {
  try {
    const response = yield call(
      authService.authenticate,
      action.payload.email,
      action.payload.password
    );

    if (response.data.code === 200) {
      yield call(setAuthToken, response.data.data.token);
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
          login:
            hasTwoFactorAuth.data && hasTwoFactorAuth.data.code === 200 ? 1 : 2
        }
      });
    }

    if (response.data.code === 401 || response.data.code === 403) {
      yield put({
        type: "REQUEST_FAILED",
        message: "Inavlid Username/Email or Password"
      });
    }

    yield put({
      type: "CHANGE_LOADING_STATE"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
    });
  }
}

export function* hasTwoFactorAuth() {
  try {
    let userToken = yield call(getAuthToken);
    const response = yield call(authService.hasTwoFactorAuth, userToken);

    if (response.data.code === 200) {
      return yield put({
        type: "GET_USER_2FA",
        response
      });
    }

    if (response.data.code === 401) {
      yield put({
        type: "REQUEST_FAILED",
        message: "Could not verify 2fa"
      });
    }

    yield put({
      type: "CHANGE_LOADING_STATE"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
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
      message:
        "Your request could not be completed. Check your connection or try again later"
    });
  }
}

export function* verifyTwoFactorAuth(action) {
  try {
    const response = yield call(
      authService.verifyTwoFactoryAuth,
      action.payload.token
    );

    if (response.data.code === 200) {
      return yield put({
        type: "POST_USER_VERIFY_2FA",
        response,
        pages: {
          login: 2
        }
      });
    }

    if (response.data.code === 401) {
      yield put({
        type: "REQUEST_FAILED",
        message: "Invalid 2FA token"
      });
    }

    yield put({
      type: "CHANGE_LOADING_STATE"
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
    });
  }
}

export function* createUser() {
  try {
    return yield put({
      type: "POST_USER_CREATE_USER",
      page: 1
    });
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
    });
  }
}

export function* resetUser() {
  try {
    return yield put({
      type: "POST_USER_RESET_USER",
      page: 1
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
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
