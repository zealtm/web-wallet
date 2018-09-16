import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";
import { convertBiggestCoinUnit } from "../../../utils/numbers";

// importar servico
import RechargeService from "../../../services/rechargeService";

// iniciar servico
const rechargeService = new RechargeService();

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_RECHARGE_STEP_REDUCER",
    step: payload.step
  });
}