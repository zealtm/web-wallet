import { put, call } from "redux-saga/effects";
import {
  internalServerError,
  modalSuccess,
  modalError
} from "../../../containers/errors/statusCodeMessage";

// UTILS
import i18next from "../../../utils/i18n";
import { decryptAes } from "../../../utils/cryptography";
import { getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import i18n from "../../../utils/i18n";

// SERVICES
import AuthService from "../../../services/authService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
import SettingsService from "../../../services/settingsService";
import { errorInput } from "../../errors/redux/errorAction";

const authService = new AuthService();
const transactionService = new TransactionService();
const coinService = new CoinService();
const settingsService = new SettingsService();

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
      type: "GET_USER_2FA",
      state: true
    });

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
    let addressAlias = action.data.alias;
    let userSeed = yield call(getUserSeedWords);
    let seedDecrypt = yield call(decryptAes, userSeed, action.data.password);
    let token = yield call(getAuthToken);

    let hasBalance = yield call(
      coinService.getCoinBalance,
      action.data.coin,
      action.data.address,
      token
    );

    if (hasBalance.data.data.available === 0) {
      yield put(modalError(i18next.t("ALIAS_BALANCE_INSUFICIENT")));
      yield put({
        type: "SET_WALLET_ALIAS_LOADING"
      });
      return;
    }

    let lunesWallet = yield call(transactionService.aliasService, token);

    let response = yield call(
      transactionService.createAlias,
      addressAlias,
      seedDecrypt
    );

    if (!lunesWallet || response.data) {
      yield put(modalError(i18next.t("ALIAS_ALREADY_CLAIMED")));
      yield put({
        type: "SET_WALLET_ALIAS_LOADING"
      });

      return;
    }

    let responseFee = yield call(
      coinService.getFee,
      "lunes",
      action.data.address,
      lunesWallet.address,
      lunesWallet.fee,
      lunesWallet.decimalPoint
    );

    let dataTransaction = {
      coin: "lunes",
      fromAddress: action.data.address,
      toAddress: lunesWallet.address,
      lunesUserAddress: action.data.address,
      amount: lunesWallet.fee,
      fee: responseFee.fee.low,
      describe: "ALIAS",
      price: action.data.price,
      decimalPoint: lunesWallet.decimalPoint
    };

    let transaction = yield call(
      transactionService.transaction,
      lunesWallet.id,
      dataTransaction,
      lunesWallet,
      seedDecrypt,
      token
    );

    if (!transaction || transaction.data.code !== 200) {
      yield put(modalError(i18next.t("ALIAS_ERROR_TRANSACTION")));
      yield put({
        type: "SET_WALLET_ALIAS_LOADING"
      });
      return;
    }

    yield put({
      type: "SET_SKELETON_ALIAS_ADDRESS",
      alias: addressAlias
    });

    yield put({
      type: "SET_WALLET_ALIAS_LOADING"
    });

    yield put({
      type: "SET_WALLET_ALIAS_MODAL_OPEN"
    });

    yield put(modalSuccess(i18next.t("ALIAS_CREATED_SUCCESS")));

    return;
  } catch (error) {
    console.warn(error);
    yield put({
      type: "SET_WALLET_ALIAS_LOADING"
    });
    yield put(internalServerError());
  }
}

export function* getAliases(action) {
  try {
    let response = yield call(
      transactionService.getAliases,
      action.data.address
    );

    if (response.length > 0) {
      let firstAlias = response[0].split(":")[2];

      yield put({
        type: "SET_SKELETON_ALIAS_ADDRESS",
        alias: firstAlias
      });
    }
  } catch (error) {
    console.warn("error", error);
    yield put(internalServerError());
  }
}

export function* kycCreate(payload) {
  try {
    yield put({ type: "SET_LOADING_CREATE_KYC", loadingCreate: true });
    let token = yield call(getAuthToken);
    let response = yield call(settingsService.kycCreate, token, payload);

    yield put({
      type: "KYC_CREATE_REDUCER",
      payload
    });

    if (response.code != 200) {
      yield put(errorInput(i18n.t("SEND_MAIL_INVITE_ERROR")));
    } else {
      yield put({ type: "COUNT_KYC_SEND_REQUEST" });
    }
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* kycUpload(payload) {
  try {
    yield put({ type: "SET_LOADING_KYC", loadingKyc: true });
    let token = yield call(getAuthToken);
    let response = yield call(settingsService.kycUpload, token, payload);
    yield put({
      type: "KYC_UPLOAD_REDUCER",
      payload
    });
    if (response.code != 200) {
      yield put(errorInput(i18n.t("SEND_MAIL_INVITE_ERROR")));
    } else {
      yield put({ type: "COUNT_KYC_SEND_REQUEST" });
    }
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* kycGetCountries() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(settingsService.kycGetCountries, token);
    if (response.code !== 200) {
      yield put(internalServerError());
      return;
    }
    yield put({
      type: "KYC_SET_COUNTRIES",
      response
    });
    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* kycGetStates(payload) {
  try {
    yield put({ type: "SET_LOADING_STATE" });
    let token = yield call(getAuthToken);
    let response = yield call(
      settingsService.kycGetStates,
      token,
      payload.country
    );
    if (response.code !== 200) {
      yield put(internalServerError());
      return;
    }
    yield put({
      type: "KYC_SET_STATE",
      response
    });
    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* kycGetCity(payload) {
  try {
    yield put({ type: "SET_LOADING_CITY" });
    let token = yield call(getAuthToken);
    let { country, state } = payload.location;
    let response = yield call(
      settingsService.kycGetCity,
      token,
      country,
      state
    );
    if (response.code !== 200) {
      yield put(internalServerError());
      return;
    }
    yield put({
      type: "KYC_SET_CITY",
      response
    });
    return;
  } catch (error) {
    yield put(internalServerError());
  }
}
