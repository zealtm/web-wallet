import {
  put,
  call
} from "redux-saga/effects";
import {
  getAuthToken
} from "../../../utils/localStorage";
import {
  internalServerError,
  modalSuccess,
  modalError
} from "../../../containers/errors/statusCodeMessage";
import i18n from "../../../utils/i18n";
import AuthService from "../../../services/authService";
import TransactionService from "../../../services/transaction/transactionService";
import CoinService from "../../../services/coinService";
const authService = new AuthService();
const transactionService = new TransactionService();
const coinService = new CoinService();

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

    let responseAddress = yield call(
      coinService.validateAddress,
      action.data.coinName,
      action.data.toAddress
    );

    if (!responseAddress || responseAddress === "error") {
      yield put({
        type: "SET_LEASING_MODAL_LOADING"
      });
      return yield put(modalError(i18n.t("MESSAGE_INVALID_ADDRESS")));
    }

    let response = yield call(
      transactionService.createAlias,
      action.data.alias,
      action.data.fee
    );
    console.warn("alias", response);
    yield put({
      type: "SET_SKELETON_ALIAS_ADDRESS",
      alias: "leonardinho"
    })
    return response;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getAliases(action) {
  try {

    let responseAddress = yield call(
      coinService.validateAddress,
      action.data.coinName,
      action.data.toAddress
    );

    if (!responseAddress || responseAddress === "error") {
      yield put({
        type: "SET_LEASING_MODAL_LOADING"
      });
      return yield put(modalError(i18n.t("MESSAGE_INVALID_ADDRESS")));
    }

    let response = yield call(
      transactionService.getAliases,
      action.data.address
    );

    return response;
  } catch (error) {
    yield put(internalServerError());
  }
}