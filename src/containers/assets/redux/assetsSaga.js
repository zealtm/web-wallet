import { put, call } from "redux-saga/effects";

import {
  internalServerError,
  modalError
} from "../../../containers/errors/statusCodeMessage";

import i18n from "../../../utils/i18n";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";

// Services
import AssetService from "../../../services/assetService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";

const transactionService = new TransactionService();
const assetService = new AssetService();
const coinService = new CoinService();

export function* getAssetGeneralInfo(action) {
  try {
    yield put({
      type: "SET_ASSET_DATA",
      isBalanceLoading: true
    });

    let token = getAuthToken();
    let { lunesAddress } = action;

    let response = yield call(
      [assetService, assetService.getBalances],
      lunesAddress,
      token
    );

    if (response.type !== "success") {
      yield put({ type: "REQUEST_FAILED", message: response.message });
      yield put({ type: "SET_ASSET_DATA", isBalanceLoading: false });
      return;
    }

    let assets = response.data.balances;

    yield put({
      type: "SET_ASSET_DATA",
      assets: assets,
      isBalanceLoading: false
    });
  } catch (error) {
    yield put({ type: "REQUEST_FAILED", message: error.message });
    console.warn(error);
  }
}

export function* getAssetHistory(action) {
  try {
    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: true
    });

    let token = yield call(getAuthToken);
    let { assetId, lunesAddress } = action;

    let response = yield call(
      [assetService, assetService.getTxHistory],
      lunesAddress,
      assetId,
      token
    );

    if (response.type !== "success") {
      yield put({ type: "REQUEST_FAILED", message: response.message });
      yield put({ type: "SET_ASSET_DATA", isTxHistoryLoading: false });
      return;
    }

    let history = response.data;

    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: false,
      history: history
    });

    return;
  } catch (error) {
    yield put({ type: "REQUEST_FAILED", message: error.message });
    console.warn(error);
  }
}

export function* reloadAsset(action) {
  try {
    let { assetId, lunesAddress } = action;

    yield put({ type: "GET_ASSET_GENERAL_INFO_API", lunesAddress });

    yield put({
      type: "GET_ASSET_HISTORY_API",
      assetId,
      lunesAddress
    });
  } catch (error) {
    yield put({ type: "REQUEST_FAILED", message: error.message });
    console.warn(error);
  }
}



export function* validateAddressAssets(action) {
  try {
    let address = action.address.replace(action.coin + ":", "").split("?")[0];
    let response = yield call(
      coinService.validateAddress,
      action.coin,
      address
    );

    if (response !== "error" && !response.error) {
      yield put({
        type: "SET_ADDRESS_MODAL_ADDRESS",
        address: address
      });

      yield put({
        type: "SET_ADDRESS_MODAL_STEP",
        step: 1
      });

      return;
    } else if (response === "error") {
      let dataAlias = yield call(transactionService.getAddressByAlias, address);

      let response = yield call(
        coinService.validateAddress,
        action.coin,
        dataAlias.address
      );

      if (!response.error && response !== "error") {
        yield put({
          type: "SET_ADDRESS_MODAL_ADDRESS",
          address: dataAlias.address
        });

        yield put({
          type: "SET_ADDRESS_MODAL_STEP",
          step: 1
        });

        return;
      }
    }

    yield put(modalError(i18n.t("MESSAGE_INVALID_ADDRESS")));

    yield put({
      type: "SET_ASSETS_MODAL_LOADING"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* getAssetsSendModalFee(action) {
  try {
    let response = yield call(
      coinService.getFee,
      action.coin,
      action.fromAddress,
      action.toAddress,
      action.amount,
      action.decimalPoint
    );

    if (response) {
      yield put({
        type: "GET_ASSETS_MODAL_SEND_FEE",
        fee: response
      });

      yield put({
        type: "SET_ADDRESS_MODAL_STEP",
        step: 2
      });

      return;
    }
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}
export function* shareTokenAddress(action) {
  try {    
    yield call(coinService.shareCoinAddress, action.name, action.address);
  } catch (error) {
    yield put(internalServerError());
  }
}
