import { put } from "redux-saga/effects";

import { PeerToPeer } from "../../../services/p2p"

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

    let paymentMethods = yield PeerToPeer.getPaymentMethodsWhenBuying(coin)
      .catch(error => { throw error })

    yield put({type: "BUY_SETTER", data: { paymentMethods }})
    yield put({type: "BUY_SETTER", data: { paymentMethodLoading: false }})
  } catch (error) {
    yield put({type: "FAILED_REQUEST", message: error.message})
  }
}

export function* acceptOfferWhenBuying(payload) {
  try {
    yield put({type:"BUY_SETTER", data: { isBuyLoading: true }})

    yield PeerToPeer.acceptOfferWhenBuying(payload.data)
      .catch(error => { throw error })

    yield put({type: "SUCCESS_REQUEST", message: ""})
    yield put({type:"BUY_SETTER", data: { isBuyLoading: false }})
  } catch (error) {
    yield put({type: "FAILED_REQUEST", message: error.message})
  }
}
