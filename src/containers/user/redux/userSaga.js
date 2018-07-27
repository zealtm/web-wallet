import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { setAuthToken, getAuthToken } from "../../../utils/localStorage";

// Services
import AuthService from "../../../services/authService";
import UserService from "../../../services/userService";
import PinService from "../../../services/pinService";
const authService = new AuthService();
const userService = new UserService();
const pinService = new PinService();

export function* authenticateUser(action) {
  try {
    let response = yield call(
      authService.authenticate,
      action.email,
      action.password
    );

    if (response.data.code === 200) {
      yield call(setAuthToken, response.data.data.token);
      let userToken = yield call(getAuthToken);
      let twoFactorResponse = yield call(
        authService.hasTwoFactorAuth,
        userToken
      );
      let pinResponse = yield call(pinService.consult, userToken);
      let pin = pinResponse.data.code === 200 ? true : false;

      return yield put({
        type: "POST_USER_AUTHENTICATE",
        user: {
          pin: pin
        },
        pages: {
          login: twoFactorResponse.data.code === 200 ? 1 : 2
        }
      });
    }

    if (response.data.code === 401) {
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
    const response = yield call(authService.verifyTwoFactoryAuth, action.token);

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

export function* verifyUserPin(action) {
  try {
    let userToken = yield call(getAuthToken);
    let response = yield call(pinService.verify, action.pin, userToken);

    if (response.data.code === 200) {
      yield put({
        type: "REQUEST_SUCCESS",
        message: "You are logged :)"
      });
    }

    if (response.data.code === 401) {
      yield put({
        type: "REQUEST_FAILED",
        message: "Inavlid PIN"
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

export function* createUserPin(action) {
  try {
    let userToken = yield call(getAuthToken);
    let response = yield call(pinService.create, action.pin, userToken);

    if (response.data.code === 201) {
      yield put({
        type: "REQUEST_SUCCESS",
        message: "Pin has been created. You are logged :)"
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

export function* createUser(action) {
  try {
    let response = yield call(userService.createUser, action.user);
    console.warn(response)

    if (response.data.code === 201) {
      yield put({
        type: "POST_USER_CREATE_USER",
        page: 2
      });
    }

    yield put({
      type: "CHANGE_LOADING_STATE"
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Your request could not be completed. Check your connection or try again later"
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
    yield put({
      type: "POST_USER_RESET_USER",
      page: 1
    });

    yield put({
      type: "REQUEST_FAILED",
      message:
        "Este recurso ainda não está dispoível :)"
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

export default function* rootSaga() {
  yield [
    fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser),
    fork(takeLatest, "POST_USER_CREATE_2FA_API", createTwoFactorAuth),
    fork(takeLatest, "POST_USER_VERIFY_2FA_API", verifyTwoFactorAuth),
    fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
    fork(takeLatest, "POST_USER_RESET_USER_API", resetUser),
    fork(takeLatest, "POST_USER_VERIFY_PIN_API", verifyUserPin),
    fork(takeLatest, "POST_USER_CREATE_PIN_API", createUserPin),
    fork(takeLatest, "GET_USER_2FA_API", hasTwoFactorAuth)
  ];
}
