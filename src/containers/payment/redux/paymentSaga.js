import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

import { getAuthToken,getUserSeedWords } from "../../../utils/localStorage";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
import { decryptAes } from "../../../utils/cryptography";

// importar servico
import PaymentService from "../../../services/paymentService";
import UserService from "../../../services/userService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";

// iniciar servico
const paymentService = new PaymentService();
const userService = new UserService();
const coinService = new CoinService();
const transactionService = new TransactionService();

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_PAY_STEP_REDUCER",
    step: payload.step
  });
}

export function* getCoinsEnabledSaga() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getCoins, token);

    const services = response.data.services;

    const coins = services.map(coin => {
      return {
        title: coin.name,
        value: {
          abbreviation: coin.abbreviation,
          address: coin.address
        },
        img: `/images/icons/coins/${coin.abbreviation}.png`
      };
    });

    yield put({
      type: "GET_COINS_REDUCER",
      coins: coins
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setPaymentSaga(payload) {
  try {
    // abrir loading
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    // chamar a quantidade de moedas necessarias
    let token = yield call(getAuthToken);
    let response = yield call(
      coinService.getCoinPrice,
      payload.pay.coin.abbreviation,
      "brl",
      token
    );

    //console.log("response pay", response);
    const balanceResponse = yield call(
      coinService.getCoinBalance,
      payload.pay.coin.abbreviation,
      payload.pay.coin.address,
      token
    );

    //console.log("response balance", balanceResponse);

    const balance = balanceResponse.data.data.available;
    const value = parseFloat(payload.pay.value);
    const amount = parseFloat(value / response.data.data.price);

    //console.log("value", payload.pay);
    //console.log("amount", response.data.data.price);

    const data = {
      number: payload.pay.number,
      coin: payload.pay.coin,
      balance: convertBiggestCoinUnit(balance, 8),
      amount: parseFloat(amount.toFixed(8)),
      value: value.toFixed(2).replace(".", ","),
      assignor: payload.pay.assignor,
      name: payload.pay.name,
      dueDate: payload.pay.dueDate,
      description: payload.pay.description,
      cpfCnpj: payload.pay.cpfCnpj
    };

    //console.log("response data", data);

    yield put({
      type: "SET_PAYMENT_REDUCER",
      payload: data
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getFeePaymentSaga(payload) {
  try {
    // abrir loading
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let response = yield call(
      coinService.getFee,
      payload.coin,
      payload.fromAddress,
      payload.toAddress,
      payload.amount,
      payload.decimalPoint
    );

    yield put({
      type: "GET_FEE_PAYMENT_REDUCER",
      fee: response
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setFeePaymentSaga(payload) {
  yield put({
    type: "SET_FEE_PAYMENT_REDUCER",
    fee: payload
  });
}

export function* getInvoiceSaga(payload) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getInvoice, token, payload.number);

    yield put({
      type: "GET_INVOICE_REDUCER",
      payment: response
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setUserGdprSaga(payload) {
  try {
    const token = yield call(getAuthToken);
    yield call(userService.updateUser, payload.user, token);

    yield put({
      type: "GET_USER_GDPR_REDUCER",
      user: payload.user
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getHistoryPaySaga() {
  try {
    // let token = yield call(getAuthToken);
    //let response = yield call(paymentService.getHistory, token);

    const response = [
      {
        name: "Energia",
        date: "04/09/2018 17:00",
        status: "confirmado",
        coin: "lunes",
        amount: "50000",
        value: "45.90"
      },
      {
        name: "Plano Saude",
        date: "04/09/2018 17:00",
        status: "confirmado",
        coin: "lunes",
        amount: "1000",
        value: "205.00"
      }
    ];

    yield put({
      type: "GET_HISTORY_PAY_REDUCER",
      history: response
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* confirmPaySaga(payload) {
  try {
    // ligar o loading
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });
    
    const payload_transaction = {
      coin:           payload.payment.coin,
      fromAddress:    payload.payment.fromAddress,
      toAddress:      payload.payment.toAddress,
      amount:         payload.payment.amount,
      fee:            payload.payment.fee,
      feePerByte:     payload.payment.feePerByte,
      feeLunes:       payload.payment.feeLunes,
      price:          payload.payment.price,
      decimalPoint:   payload.payment.decimalPoint
    }

    //console.log("transacao_payload", payload);

    // transacao 
    try {
      let seed      = yield call(getUserSeedWords);
      let token     = yield call(getAuthToken);
  
      // pega o servico disponivel
      let lunesWallet = yield call(
        transactionService.transactionService,
        payload_transaction.coin,
        token
      );
      
      if (lunesWallet) {
        
        // transaciona
        let response = yield call(
          transactionService.transaction,
          payload_transaction,
          lunesWallet,
          decryptAes(seed, payload.payment.user),
          token
        );
  
        console.log("transacao_response", response);

        if (response) {
         
          const payload_elastic = {
            "barCode":    payload.payment.payment.number,
            "dueDate":    payload.payment.payment.dueDate,
            "amount":     parseFloat(payload.payment.payment.value),
            "name":       payload.payment.payment.name,
            "document":   payload.payment.payment.cpfCnpj,
            "txID":       response.config.data.txID,
            "describe":   payload.payment.payment.description,
            "serviceId":  lunesWallet.id
          };
          
          console.log("elastic", payload_elastic);

          // chamar api pra salvar a transacao
          let response_elastic = yield call(paymentService.sendPay, token, payload_elastic);

          console.log("elastic_response", response_elastic);

          yield put({
            type: "SET_LOADING_REDUCER",
            payload: false
          });

          yield put({
            type: "SET_CLEAR_PAYMENT_REDUCER"
          });

          return;
        }
      }

      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });
  
      // yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
      yield put(internalServerError());
  
      return;
    } catch (error) {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });


      //yield put({ type: "CHANGE_WALLET_ERROR_STATE", state: true });
      yield put(internalServerError());
    }

  } catch (error) {
    yield put(internalServerError());
  }
}
