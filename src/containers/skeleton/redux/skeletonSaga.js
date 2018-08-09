import { put, call } from "redux-saga/effects";
import { getAuthToken } from "../../../utils/localStorage";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";
// Services
import CoinService from "../../../services/coinService";
const coinService = new CoinService();

export function* availableCoins() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(coinService.getAvaliableCoins, token);
    yield put({
      type: "GET_AVAILABLE_COINS",
      coins: response.data.data.coins
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* balanceCoins(action) {
  try {
    let response = yield call();
    console.warn(response, action);
    yield put({
      type: "GET_BALANCE_COINS",
      coins: response
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* createCoinsAddress(action) {
  try {
    let response = yield call();
    console.warn(response, action);
    yield put({
      type: "POST_CREATE_COINS_ADDRESS",
      coins: response.data.data.coins
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}
