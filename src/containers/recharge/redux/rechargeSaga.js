import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";

// SERVICES
import RechargeService from "../../../services/rechargeService";

const rechargeService = new RechargeService();

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_RECHARGE_STEP_REDUCER",
    step: payload.step
  });
}

export function* getOperatorsSaga(payload){
  try {
    yield put({
      type: "SET_LOADING_VAL_REDUCER",
      payload: true
    });
  
    let token       = yield call(getAuthToken);
    let response    = yield call(rechargeService.getOperadoras, token, payload.ddd);

    yield put({
      type: "GET_OPERADORAS_REDUCER",
      operadoras: response
    });

    return;

  }catch(error){
    yield put(internalServerError());
  }
}


export function* getValuesCreditSaga(payload){
  try {
    yield put({
      type: "SET_LOADING_VAL_REDUCER",
      payload: true
    });
   
    let token       = yield call(getAuthToken);
    let response    = yield call(rechargeService.getValoresRecarga, token, payload);
   
    yield put({
      type: "GET_VALORES_REDUCER",
      valores: response
    });

    return;

  }catch(error){
    yield put(internalServerError());
  }
}