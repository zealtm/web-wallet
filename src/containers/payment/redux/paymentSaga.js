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
}

export function* setPaymentSaga(payload){
  const data = {
    number:   payload.pay.number,
    coin:     payload.pay.coin,
    amount:   15000, //payload.pay.amount,
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
}

export function* getFeePaymentSaga(payload){
  console.log(payload);

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
}

export function* setFeePaymentSaga(payload){
  yield put(
    {
      type: "SET_FEE_PAYMENT_REDUCER",
      fee: payload.fee
    }
  )
}

export function* getInvoiceSaga(payload){
  //console.log("get",payload);
  let token = yield call(getAuthToken);
  let response = yield call(paymentService.getInvoice, token, payload.number);
  
  yield put(
    {
      type: "GET_INVOICE_REDUCER",
      payment: response
    }
  )
  
}