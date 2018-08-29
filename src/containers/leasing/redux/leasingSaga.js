import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
const leasingService = new LeasingService();


export function* getProfessionalNode() {
  try {
    let response = yield call(leasingService.getProfessionalNodes);
    console.warn(response);
    yield put({
      type: "GET_PROFESSIONAL_NODE",
      professionalNode: response
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}
