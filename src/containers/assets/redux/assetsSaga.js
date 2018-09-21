import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";

// Services
import AssetService from "../../../services/assetService";
const assetService = new AssetService();


/* eslint-disable */
export function* getAssetGeneralInfo(action) {
  //TODO verify if the token is expired, dont forget it!
  try {
    yield put({
      type: "SET_ASSET_DATA",
      isBalanceLoading: true })

    let token = getAuthToken();
    let { lunesAddress } = action;

    let response = yield call([assetService, assetService.getBalances], lunesAddress, token);
    if (response.type !== 'success') {
      yield put({type: "REQUEST_FAILED", message: response.message})
      yield put({ type: "SET_ASSET_DATA", isBalanceLoading: false })
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
    let { assetId, lunesAddress } = action;


    let response = yield call(
      [assetService, assetService.getTxHistory],
      lunesAddress,
      assetId,
      token
    );

    if (response.type !== 'success') {
      yield put({type: "REQUEST_FAILED", message: response.message})
      yield put({type: "SET_ASSET_DATA", isTxHistoryLoading: false})
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
    yield put({ type: "CHANGE_ASSET_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* reloadAsset(action) {
  let { assetId, lunesAddress } = action;

  yield put({ type: "GET_ASSET_GENERAL_INFO_API", lunesAddress })

  yield put({
    type: "GET_ASSET_HISTORY_API",
    assetId,
    lunesAddress
  })
}
