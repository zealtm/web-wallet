import { put,call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

// UTILS
// import { getUserSeedWords } from "../../../utils/localStorage";
// import { decryptAes } from "../../../utils/cryptography";
 import { getAuthToken } from "../../../utils/localStorage";
// import { convertBiggestCoinUnit } from "../../../utils/numbers";
// import { convertToLocaleDate } from "../../../utils/strings";


// SERVICES
import P2PService from "../../../services/p2pService";
const p2pService = new P2PService();

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

export function* setP2POrdersCancelSaga(payload){
  try {
    let token = yield call(getAuthToken);
  
    let response = yield call(p2pService.setCancelOrder, token, payload.orderId);
    
    yield put({
      type: "SET_P2P_CANCEL_ORDERS_REDUCE", 
      isCancel: response
    });
  }catch(error){
    yield put(internalServerError());
  }

}