import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// UTILS
import { getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";

// Services
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
import AssetService from "../../../services/assetService";
import AuthService from "../../../services/authService";
const assetService = new AssetService();
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
        type: "SET_ASSET_MODAL_ADDRESS",
        address: action.address
      });

      yield put({
        type: "SET_ASSET_MODAL_STEP",
        step: 1
      });

      return;
    }

    yield put(response.error);

    yield put({
      type: "SET_ASSET_MODAL_LOADING"
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* getAssetSendModalFee(action) {
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
        type: "GET_ASSET_MODAL_SEND_FEE",
        fee: response
      });

      yield put({
        type: "SET_ASSET_MODAL_STEP",
        step: 2
      });

      return;
    }
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* shareCoinAddress(action) {
  try {
    yield call(coinService.shareCoinAddress, action.name, action.address);
  } catch (error) {
    yield put(internalServerError());
  }
}



export function* getCoinFee(action) {
  try {
    let response = yield call(coinService.getFee, action.coinType);
    yield put({
      type: "GET_COIN_FEE",
      fee: response
    });
  } catch (error) {
    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* setAssetTransaction(action) {
  try {
    let seed = yield call(getUserSeedWords);
    let token = yield call(getAuthToken);

    let lunesWallet = yield call(
      transactionService.transactionService,
      action.transaction.coin,
      token
    );

    if (lunesWallet) {
      let response = yield call(
        transactionService.transaction,
        action.transaction,
        lunesWallet,
        decryptAes(seed, action.password),
        token
      );

      if (response) {
        yield put({
          type: "SET_ASSET_MODAL_STEP",
          step: 5
        });

        yield put({
          type: "SET_ASSET_TRANSACTION",
          response: response
        });

        return;
      }
    }

    yield put({
      type: "SET_ASSET_MODAL_STEP",
      step: 6
    });

    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

/* eslint-disable */
export function* getAssetGeneralInfo(action) {
  //TODO verify if the token is expired, dont forget it!
  try {
    yield put({
      type: "SET_ASSET_DATA",
      isBalanceLoading: true })
    // TODO remove below --
    const auth = new AuthService();
    let { data } = yield call(auth.authenticate, 'lunes2', '12345678');
    let token = data.data.token;
    // TODO remove above-- uncomment below
    // let token = getAuthToken();



    // TODO uncomment below
    let state = window.store.getState();
    let lunesAddress = state.skeleton.coins.lunes.address;
    // TODO substitute from below
    // let lunesAddress = "37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr";
    // let assetId      = "Bome8qGJtJucpHdE8mSMBDWMJ5TCiopRPVb6cJG3Ueym";
    // let assetId      = "1";

    let response = yield call([assetService, assetService.getBalances], lunesAddress, token);
    if (response.type !== 'success') {
      yield put({type: "REQUEST_FAILED", message: response.message})
      return;
    }

    let assets = response.data.balances;

    yield put({ type: "SET_ASSET_DATA", assets: assets, isBalanceLoading: false })

  } catch (error) {
    console.log('getAssetsGeneralInfo', error)
  }
}

export function* getAssetHistory(action) {
  try {
    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: true
    })

    let token = yield call(getAuthToken);
    let { assetId, address } = action;

    if (!address) {
      address = window.store.getState().skeleton.coins.lunes.address;
    }

    let response = yield call(
      [assetService, assetService.getTxHistory],
      address,
      assetId,
      token
    );

    if (response.type === 'error') {
      yield put({type: 'REQUEST_FAILED', message: response.message})
      return;
    }

    let history = response.data;

    // let state = window.store.getState();
    // let { assets } = state.assets;
    //
    // assets = assets.map(asset => {
    //   if (asset.assetId === assetId)
    //     asset.history = history;
    //   return asset;
    // })

    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: false,
      history: history
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* reloadAsset(action) {
  let { assetId, address } = action;

  yield put({ type: "GET_ASSET_GENERAL_INFO_API" })

  yield put({
    type: "GET_ASSET_HISTORY_API",
    assetId,
    address
  })
}
