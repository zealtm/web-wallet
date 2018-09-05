import {put,call} from "redux-saga/effects";
import {internalServerError} from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";

// importar servico 
import PaymentService from "../../../services/paymentService";

// iniciar servico 
const paymentService = new PaymentService();

export function* nomeFuncao(){
  try {
    // chama o servico e passa a resposta ao saga 
    let response = yield call(paymentService.getNomeFuncao);
    yield put(
      {
        type: "NOME_FUNCAO_REDUCER",
        payload: response
      }
    )
  }catch(error){
    yield put(internalServerError());
  }
}

export function* getCoinsEnabledSaga(){
  let token = yield call(getAuthToken);
  let response = yield call(paymentService.getCoins, token);
  console.log(response);
  // yield put(
  //   {
  //     type: "GET_COINS_REDUCER",
  //     coins: response
  //   }
  // )
}

export function* setPaymentSaga(payload){
  console.log(payload);

  const data = {
    number: payload.number,
    coin: payload.coin,
    amount: payload.amount,
    value: payload.value,
    bank: payload.assignor,
    name: payload.name,
    dateend: payload.dueDate,
    doc: payload.cpfCnpj
  }

  yield put(
    {
      type: "SET_PAYMENT_REDUCER",
      payload: data
    }
  )
}