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

export function* getPaymentMethodsWhenBuying(payload) {
  try {

    let { coin } = payload
    yield put({type: "BUY_SETTER", data: {paymentMethodLoading: true}})

    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getPaymentMethodsWhenBuying, token, coin);

    yield put({type: "BUY_SETTER", data: { response }})
    yield put({type: "BUY_SETTER", data: { paymentMethodLoading: false }})

  }catch(error){
    yield put(internalServerError());
  }
}

export function* acceptOfferWhenBuying(payload) {
  try {

    yield put({type:"BUY_SETTER", data: { isBuyLoading: true }})
    let token = yield call(getAuthToken);
    
    yield call(p2pService.acceptOfferWhenBuying, token, payload.data);

    yield put({type: "SUCCESS_REQUEST", message: ""})
    yield put({type:"BUY_SETTER", data: { isBuyLoading: false }})

   }catch(error){
    yield put(internalServerError());
  }
}

export function* createOfferWhenSelling(payload) {
  try {
    // yield put({type: "BUY_SETTER", data: { loading: false }})

    yield p2pService.createOfferWhenSelling(payload.data)
      .catch(error => { throw error })

    // yield put({type: "SUCCESS_REQUEST", message: "Foi"})
    // yield put({type: "BUY_SETTER", data: { loading: false }})
  } catch (error) {
    yield put({type: "FAILED_REQUEST", message: error.message})
  }
}
