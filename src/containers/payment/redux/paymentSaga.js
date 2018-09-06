import {put,call} from "redux-saga/effects";
import {internalServerError} from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";

// importar servico
import PaymentService from "../../../services/paymentService";

// iniciar servico
const paymentService = new PaymentService();

export function* getCoinsEnabledSaga() {
  try {
    let token = yield call(getAuthToken);
    // let response = yield call(paymentService.getCoins, token);
    // console.log(response);

    const response = [
      {
        title: 'Lunes',
        value: 'lunes',
        img: '/images/icons/coins/lunes.png'
      },
      {
        title: 'Bitcoin',
        value: 'btc',
        img: '/images/icons/coins/btc.png'
      }
    ];

    yield put(
      {
        type: "GET_COINS_REDUCER",
        coins: response
      }
    )
  } catch(error) {
    yield put(internalServerError());
  }
}

export function* setPaymentSaga(payload) {
  try {
    // chamar a quantidade de moedas necessarias
    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getAmountCoinPay, token, payload.coin, payload.value);

    const data = {
      number:   payload.pay.number,
      coin:     payload.pay.coin,
      amount:   response.amount,
      value:    payload.pay.value,
      bank:     payload.pay.assignor,
      name:     payload.pay.name,
      dateend:  payload.pay.dueDate,
      doc:      payload.pay.cpfCnpj
    }

    yield put(
      {
        type: "SET_PAYMENT_REDUCER",
        payload: data
      }
    )
  } catch(error) {
    yield put(internalServerError());
  }
}

export function* getFeePaymentSaga(payload) {
  try {
    // dados exemplo, tem que fazer chamada aqui
    const data = {
      low: 0.001,
      medium: 0.001,
      hight: 0.001
    }

    // retorno exemplo
    yield put(
      {
        type: "GET_FEE_PAYMENT_REDUCER",
        fee: data
      }
    )
  } catch(error) {
    yield put(internalServerError());
  }
}

export function* setFeePaymentSaga(payload) {
  yield put(
    {
      type: "SET_FEE_PAYMENT_REDUCER",
      fee: payload.fee
    }
  )
}

export function* getInvoiceSaga(payload) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getInvoice, token, payload.number);

    yield put(
      {
        type: "GET_INVOICE_REDUCER",
        payment: response
      }
    )
  } catch(error) {
    yield put(internalServerError());
  }
}

// export function* calcCoinPaymentSaga(value){
//   let token = yield call(getAuthToken);
//   // AQUI UM ENDPOINT PRA RETORNAR O QTDE DE MOEDAS NECESSARIAS
//   // let response = yield call(paymentService.getInvoice, token, payload.number);

//   yield put(
//     {
//       type: "GET_INVOICE_REDUCER",
//       payment: response
//     }
//   )
// }
