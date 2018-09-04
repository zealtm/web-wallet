import {
  put,
  call
} from "redux-saga/effects";
import {
  internalServerError
} from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
import {
  setAuthToken,
  getAuthToken
} from "../../../utils/localStorage";
import {
  convertBiggestCoinUnit
} from "../../../utils/numbers";
import {
  HEADER_RESPONSE
} from "../../../constants/apiBaseUrl";

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

    let leaseData = {
      address: action.data.coinAddress,
      amount: action.data.amount,
      fee: action.data.feeValue,
      recipient: action.data.toAddress
    }

    let response = yield call(leasingService.createLeasing, leaseData);

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
    let professionalNodes = yield call(leasingService.getProfessionalNodes);
    let lease = yield call(leasingService.getLeasingHistory, action.coin, action.address, token);

    if (lease.history) {
      setAuthToken(lease.history.headers[HEADER_RESPONSE]);
      lease.history.data.data.txs.map(history => {

        if (history.amount) {
          history.amount = convertBiggestCoinUnit(history.amount, action.decimalPoint);
        }

        professionalNodes.map(node => {
          if (history.to === node.address) {
            history.to = node.domain
          }
        });
      });

      yield put({
        type: "GET_INFO_LEASING",
        leasingHistory: lease.history.data,
        leasingBalance: convertBiggestCoinUnit(lease.balance.data.data.balance, action.decimalPoint),
        professionalNodes
      });

      return;
    }

    yield put(history.error);

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}