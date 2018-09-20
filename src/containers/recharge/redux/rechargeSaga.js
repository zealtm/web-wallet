import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";

// SERVICES
import RechargeService from "../../../services/rechargeService";
import CoinService from "../../../services/coinService";
import { convertBiggestCoinUnit } from "../../../utils/numbers";

const rechargeService = new RechargeService();
const coinService = new CoinService();

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

export function* setRechargeSaga(payload){
  try {

    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    const value = parseFloat(payload.recharge.value);
    const {abbreviation, address} = payload.recharge.coin;
    
    const token = yield call(getAuthToken);

    const amountResponse = yield call(
      rechargeService.getCoinAmountPay, 
      token, 
      abbreviation, 
      value
    );

    const balanceResponse = yield call(
      coinService.getCoinBalance, 
      abbreviation, 
      address, 
      token
    );

    const balance = balanceResponse.data.data.available;
    const amount = amountResponse.data.data.value;

    const data = {
      number: payload.recharge.number, 
      coin: payload.recharge.coin, 
      balance: convertBiggestCoinUnit(balance, 8),
      amount: convertBiggestCoinUnit(amount, 8),
      value: value.toFixed(2).replace(".", ","),
      operator: payload.recharge.operator
    };

    yield put({
      type: "SET_RECHARGE_REDUCER", 
      payload: data
    });

  }catch(error){
    yield put(internalServerError());
    // yield put({
    //   type: "CHANGE_SKELETON_ERROR_STATE",
    //   state: true
    // });
  }
}

export function* getFeeRechargeSaga(payload) {
  try {
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
    
    if(!response.fee){
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });
      yield put(internalServerError());
    }

    yield put({
      type: "GET_FEE_RECHARGE_REDUCER",
      fee: response
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setFeeRechargeSaga(payload) {
  yield put({
    type: "SET_FEE_RECHARGE_REDUCER",
    fee: payload
  });
}

export function* confirmRechargeSaga(payload) {
  yield put(console.log("recharge", payload));
  /*
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    const payload_transaction = {
      coin: payload.payment.coin,
      fromAddress: payload.payment.fromAddress,
      toAddress: payload.payment.toAddress,
      amount: payload.payment.amount,
      fee: payload.payment.fee,
      feePerByte: payload.payment.feePerByte,
      feeLunes: payload.payment.feeLunes,
      price: payload.payment.price,
      decimalPoint: payload.payment.decimalPoint
    };

    // transacao
    
    try {
      let seed = yield call(getUserSeedWords);
      let token = yield call(getAuthToken);

      // pega o servico disponivel
      let lunesWallet = yield call(
        transactionService.transactionService,
        payload_transaction.coin,
        token
      );

      //console.log("servico", lunesWallet);

      if (lunesWallet) {
        // transaciona
        let response = yield call(
          transactionService.transaction,
          lunesWallet.id,
          payload_transaction,
          lunesWallet,
          decryptAes(seed, payload.payment.user),
          token
        );

        //console.log("transacao", response);
        
        const transacao_obj = JSON.parse(response.config.data);
        const dueDate = payload.payment.payment.dueDate.split("/");
        const dueDateFormat = dueDate[2]+"-"+dueDate[1]+"-"+dueDate[0];

        if (response) {
          const payload_elastic = {
            barCode: payload.payment.payment.number,
            dueDate: dueDateFormat,
            amount: parseFloat(payload.payment.payment.value),
            name: payload.payment.payment.name,
            document: payload.payment.payment.cpfCnpj,
            txID: transacao_obj.txID,
            describe: payload.payment.payment.description,
            serviceId: lunesWallet.id
          };

          // chamar api pra salvar a transacao
          let response_elastic = yield call(
            paymentService.sendPay,
            token,
            payload_elastic
          );

          //console.log("payload", payload_elastic);
          //console.log("elastic", response_elastic);

          yield put({
            type: "SET_CLEAR_PAYMENT_REDUCER"
          });

          if (response_elastic.data.errorMessage) {
            yield put({
              type: "SET_MODAL_PAY_STEP_REDUCER",
              step: 6
            });
            yield put(internalServerError());
          } else {
            yield put({
              type: "SET_MODAL_PAY_STEP_REDUCER",
              step: 5
            });
          }

          return;
        }
      }

      yield put({
        type: "SET_CLEAR_PAYMENT_REDUCER"
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 5
      });

      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 6
      });

      yield put(internalServerError());

      return;
    } catch (error) {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 6
      });

      yield put(internalServerError());
    }
    
  } catch (error) {
    yield put(internalServerError());
  }
  */
}
