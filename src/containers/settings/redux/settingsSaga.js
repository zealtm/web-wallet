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

// SERVICES
import AuthService from "../../../services/authService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";

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
