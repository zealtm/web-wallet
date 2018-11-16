import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

// UTILS
// import { getUserSeedWords } from "../../../utils/localStorage";
// import { decryptAes } from "../../../utils/cryptography";
import { getAuthToken } from "../../../utils/localStorage";
// import { convertBiggestCoinUnit } from "../../../utils/numbers";
// import { convertToLocaleDate } from "../../../utils/strings";


// SERVICES
import P2pService from "../../../services/p2pService";

const p2pService = new P2pService();

export function* openChat(payload) {
  yield put({
    type: "OPEN_CHAT_P2P_REDUCER",
    iduser: payload.iduser
  });
}

export function* closeChat() {
  yield put({
    type: "CLOSE_CHAT_P2P_REDUCER"
  })
}

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_FLOW_STEP_REDUCER",
    step: payload.step
  });
}

export function* openModalPaySaga(payload){
  yield put({
    type: "SET_MODAL_OPEN_REDUCER",
    open: payload.open
  });
}

export function* getP2PMyOrdersSaga(coin){
  try {
    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getMyOrders, token, coin);

    yield put({
      type: "GET_MY_ORDERS_REDUCER", 
      orders: response.data.data
    });
  }catch(error){
    yield put(internalServerError());
  }
}

export function* getP2PHistorySaga(coin){
  try {
    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getHistory, token, coin);

    yield put({
      type: "GET_HISTORY_REDUCER", 
      orders: response.data.data
    });
  }catch(error){
    yield put(internalServerError());
  }
}

export function* getP2PFilterSaga(coin, typeOrder, coinBuy){
  try {
    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getFilter, token, coin, typeOrder, coinBuy);

    yield put({
      type: "GET_FILTER_REDUCER", 
      orders: response.data.data
    });
  }catch(error){
    yield put(internalServerError());
  }
}