import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// UTILS
import { getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";

// Services
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
const coinService = new CoinService();
const transactionService = new TransactionService();

export function* validateAddress(action) {
  try {
    let response = yield call(
      coinService.validateAddress,
      action.coin,
      action.address
    );

    if (!response.error) {
      yield put({
        type: "SET_WALLET_MODAL_ADDRESS",
        address: action.address
      });

      yield put({
        type: "SET_WALLET_MODAL_STEP",
        step: 1
      });

      return;
    }

    yield put(response.error);

    yield put({
      type: "SET_WALLET_MODAL_LOADING"
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* getWalletCoinHistory(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(
      coinService.getCoinHistory,
      action.coin,
      action.address,
      token
    );

    if (!response.error) {
      yield put({
        type: "SET_WALLET_HISTORY",
        history: response
      });

      yield put({
        type: "SET_WALLET_HISTORY_LOADING"
      });

      return;
    }

    yield put({
      type: "SET_WALLET_HISTORY_LOADING",
      state: true
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* setWalletTransaction(action) {
  try {
    let seed = yield call(getUserSeedWords);
    let token = yield call(getAuthToken);
    let response = yield call(
      transactionService.transaction,
      action.transaction,
      decryptAes(seed, action.password),
      token
    );

    if (!response.error) {
      yield put({
        type: "SET_WALLET_TRANSACTION",
        response: response
      });

      yield put({
        type: "SET_WALLET_MODAL_STEP",
        step: 5
      });

      return;
    }

    yield put({
      type: "SET_WALLET_MODAL_STEP",
      step: 6
    });

    yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}
