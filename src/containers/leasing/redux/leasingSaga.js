import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
import { convertBiggestCoinUnit } from "../../../utils/numbers"
import { setAuthToken, getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import { HEADER_RESPONSE, TESTNET } from "../../../constants/apiBaseUrl";
import { decryptAes } from "../../../utils/cryptography";
import { networks } from "../../../constants/network";

const leasingService = new LeasingService();
const coinService = new CoinService();
const transactionService = new TransactionService();


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

    let userSeed = yield call(getUserSeedWords);
    let seedDecrypt = yield call(decryptAes, userSeed, action.data.password);
    let valueFee = action.data.feeValue.low * 1000000000;
    let leaseData = {
      amount: convertBiggestCoinUnit(action.data.amount),
      fee: valueFee,
      recipient: action.data.toAddress,
      seed: seedDecrypt,
      network: TESTNET ? networks.LUNES : networks.LNSTESTNET,
    }

    let response = yield call(transactionService.createLeasing, leaseData);
    if (!response.error) {
      yield put({
        type: "START_LEASING",
      });
      return;
    }
    yield put(response.error);

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getLeasingInfo(action) {
  try {
    let token = yield call(getAuthToken);
    // let professionalNodes = yield call(leasingService.getProfessionalNodes);
    let lease = yield call(leasingService.getLeasingHistory, action.coin, action.address, token);

    if (lease.history) {
      setAuthToken(lease.history.headers[HEADER_RESPONSE]);
      lease.history.data.data.txs.map(history => {

        if (history.amount) {
          history.amount = convertBiggestCoinUnit(history.amount, action.decimalPoint);
        }

        // professionalNodes.map(node => {
        //   if (history.to === node.address) {
        //     history.to = node.domain
        //   }
        // });
      });

      yield put({
        type: "GET_INFO_LEASING",
        leasingHistory: lease.history.data,
        leasingBalance: convertBiggestCoinUnit(lease.balance.data.data.balance, action.decimalPoint),
        professionalNodes: []
      });

      return;
    }

    yield put(history.error);

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}