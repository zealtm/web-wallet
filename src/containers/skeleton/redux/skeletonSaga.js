import { takeLatest } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { getAuthToken } from "../../../utils/localStorage";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// Services
import CoinService from "../../../services/coinService";
const coinService = new CoinService();


export function* availableCoins(action) {
  try {
    console.warn('2')
    let token = yield call(getAuthToken);
    let response = yield call(coinService.getAvaliableCoins, token);
    console.warn(response, action);
    yield put({
      type: "GET_AVAILABLE_COINS",
      coins: response
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_ERROR_STATE" });
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
    yield put({ type: "CHANGE_ERROR_STATE" });
    yield put(internalServerError());
  }
}

export function* createCoinsAddress(action) {
  try {
    let response = yield call();
    console.warn(response, action);
    yield put({
      type: "POST_CREATE_COINS_ADDRESS",
      coins: response
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_ERROR_STATE" });
    yield put(internalServerError());
  }
}

export default function* rootSaga() {
  yield [fork(takeLatest, "GET_AVAILABLE_COINS_API", availableCoins)];
  yield [fork(takeLatest, "GET_BALANCE_COINS_API", balanceCoins)];
  yield [fork(takeLatest, "POST_CREATE_COINS_ADDRESS_API", createCoinsAddress)];
}
