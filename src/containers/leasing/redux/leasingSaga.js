import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
const leasingService = new LeasingService();
const coinService = new CoinService();


export function* getProfessionalNode() {
  try {
    let response = yield call(leasingService.getProfessionalNodes);
    yield put({
      type: "GET_PROFESSIONAL_NODE",
      professionalNode: response
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}


export function* validateLeasingAddress(action) {
  try {
    let response = yield call(coinService.validateAddress,
      action.coin,
      action.address);
    
      if (!response.error) {
      yield put({
        type: "VALIDATE_LEASING_ADDRESS",
        addressIsValid: response
      });
      return;
    }

    yield put(response.error);


    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* createLeasing(action) {
  try {
    let response = yield call(coinService.validateAddress,
      action.coin,
      action.address);
    
      if (!response.error) {
      yield put({
        type: "VALIDATE_LEASING_ADDRESS",
        addressIsValid: response
      });
      return;
    }

    yield put(response.error);


    return;
  } catch (error) {
    yield put(internalServerError());
  }
}