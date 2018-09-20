import {
  put,
  call
} from "redux-saga/effects";
import {
  getAuthToken, getUserSeedWords
} from "../../../utils/localStorage";
import {
  internalServerError,
  modalSuccess, 
} from "../../../containers/errors/statusCodeMessage"; 
import AuthService from "../../../services/authService";
import TransactionService from "../../../services/transaction/transactionService";
import { decryptAes } from "../../../utils/cryptography";
const authService = new AuthService();
const transactionService = new TransactionService();

export function* getTwoFactorAuth() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(authService.createTwoFactorAuth, token);

    yield put({
      type: "POST_SETTINGS_CREATE_2FA",
      url: response.qrcode
    });
    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });
    return;
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });
    yield put(internalServerError());
  }
}

export function* verifyTwoFactorAuthSettings(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(
      authService.verifyTwoFactoryAuth,
      action.token,
      token
    );

    if (response.error || response.messageError) {
      yield put(response.error);
      yield put({
        type: "CHANGE_LOADING_SETTINGS"
      });
      return;
    }

    yield put(modalSuccess("Successfully Activated"));
    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });

    yield put(internalServerError());
  }
}

export function* createAlias(action) {
  try {
    console.warn("saga", action);
    let userSeed = yield call(getUserSeedWords);
    let seedDecrypt = yield call(decryptAes, userSeed, action.data.password);

    let response = yield call(
      transactionService.createAlias,
      action.data.alias,
      action.data.fee,
      seedDecrypt
    );
    console.warn("alias", response);
    // yield put({
    //   type: "SET_SKELETON_ALIAS_ADDRESS",
    //   alias: "leonardinho"
    // })
    return response;
  } catch (error) {
    console.warn("error", error);
    yield put(internalServerError());
  }
}

export function* getAliases(action) {
  try {
    console.warn("saga", action);

    let response = yield call(
      transactionService.getAliases,
      action.data.address
    );
    console.warn("result ", response);
    return response;
  } catch (error) {
    console.warn("error", error);
    yield put(internalServerError());
  }
}