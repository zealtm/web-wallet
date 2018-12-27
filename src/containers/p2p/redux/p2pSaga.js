import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

import { getAuthToken } from "../../../utils/localStorage";
import P2pService from "../../../services/p2pService";

import i18n from "../../../utils/i18n"

const p2pService = new P2pService();

const CHANGE_SKELETON_ERROR_STATE = {
  type: "CHANGE_SKELETON_ERROR_STATE",
  state: true
};

export function* openChat(payload) {
  yield put({
    type: "OPEN_CHAT_P2P_REDUCER",
    iduser: payload.iduser
  });
}

export function* closeChat() {
  yield put({
    type: "CLOSE_CHAT_P2P_REDUCER"
  });
}

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_FLOW_STEP_REDUCER",
    step: payload.step
  });
}

export function* openModalPaySaga(payload) {
  yield put({
    type: "SET_MODAL_OPEN_REDUCER",
    open: payload.open
  });
}

export function* getP2PMyOrdersSaga(payload) {
  try {
    yield put({ type: "SET_LOADING_P2P", loading: true });

    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getMyOrders, token, payload.coin);

    if (response.errorMessage) {
      yield put({
        type: "GET_MY_ORDERS_REDUCER",
        orders: []
      });
    } else {
      yield put({
        type: "GET_MY_ORDERS_REDUCER",
        orders: response.data.orders
      });
    }
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);
    yield put(internalServerError());
  }
}

export function* getPaymentMethodsWhenBuying(payload) {
  try {
    let { coin } = payload;
    yield put({ type: "BUY_SETTER", data: { paymentMethodLoading: true } });

    let token = yield call(getAuthToken);
    let response = yield call(
      p2pService.getPaymentMethodsWhenBuying,
      token,
      coin
    );

    let cripto = [
      { title: "LUNES", img: `images/icons/coins/lunes.png`, value: "lunes" }
    ];
    if (response.cripto) {
      response.cripto.forEach(val => {
        if (val.status == "active") {
          cripto.push({
            id: val.id,
            title: val.name.toUpperCase(),
            img: `images/icons/coins/${val.abbreviation}.png`,
            value: val.abbreviation
          });
        }
      });
    }

    if (response.fiat) {
      response.fiat.forEach(val => {
        if (val.status == "active") {
          cripto.push({
            id: val.id,
            title: val.name.toUpperCase(),
            img: `images/icons/fiat/${val.abbreviation}.png`,
            value: val.abbreviation
          });
        }
      });
    }

    yield put({ type: "BUY_SETTER", data: cripto });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getP2PHistorySaga(payload) {
  try {
    yield put({ type: "SET_LOADING_P2P", loading: true });

    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getHistory, token, payload.coin, payload.historyType);

    if (response.errorMessage) {
      yield put({type: "REQUEST_FAILED", message: i18n.t("P2P_FAILED_TO_GET_ORDERS")})
      yield put({
        type: "GET_HISTORY_REDUCER",
        orders: []
      });
    } else {
      yield put({
        type: "GET_HISTORY_REDUCER",
        orders: response.data.orders
      });
    }
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);
    yield put(internalServerError());
  }
}

export function* acceptOfferWhenBuying(payload) {
  try {
    yield put({ type: "BUY_SETTER", data: { isBuyLoading: true } });
    let token = yield call(getAuthToken);

    yield call(p2pService.acceptOfferWhenBuying, token, payload.data);

    yield put({ type: "SUCCESS_REQUEST", message: "" });
    yield put({ type: "BUY_SETTER", data: { isBuyLoading: false } });
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);
    yield put(internalServerError());
  }
}

export function* getP2PFilterSaga(payload) {
  try {
    yield put({ type: "SET_LOADING_P2P", loading: true });

    const { typeOrder, coinBuy } = payload;

    let token = yield call(getAuthToken);
    let response = yield call(p2pService.getFilter, token, typeOrder, coinBuy);
    yield put({
      type: "GET_FILTER_REDUCER",
      orders: !response ? [] : response.orders
    });
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);
    yield put(internalServerError());
  }
}

export function* createOfferWhenSelling(payload) {
  try {
    yield put({ type: "SET_LOADING_CREATE_OFFER", loading: true });

    let token = yield call(getAuthToken);
    let response = yield call(
      p2pService.createOfferWhenSelling,
      token,
      payload.data
    );

    if (response.data.data.orderId) {
      yield put({
        type: "CREATE_OFFER_DONE",
        offer: response.data.data.orderId
      });
    } else {
      yield put({
        type: "CREATE_OFFER_ERROR"
      });
    }
  } catch (error) {
    yield put({
      type: "CREATE_OFFER_ERROR"
    });
    yield put(internalServerError());
  }
}

export function* setP2POrdersCancelSaga(payload) {
  try {
    yield put({ type: "SET_LOADING_P2P", loading: true });

    let token = yield call(getAuthToken);

    let response = yield call(
      p2pService.setCancelOrder,
      token,
      payload.orderId
    );

    yield put({
      type: "SET_P2P_CANCEL_ORDERS_REDUCER",
      orderId: response
    });
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);

    yield put(internalServerError());
  }
}

export function* createSignatureSaga(payload) {
  try {
    let token = yield call(getAuthToken);

    yield call(p2pService.createSignature, token, payload.data);
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* openDeposit(payload) {
  yield put({
    type: "OPEN_DEPOSIT_P2P_REDUCER",
    iduser: payload.iduser
  });
}

export function* closeDeposit() {
  yield put({
    type: "CLOSE_DEPOSIT_P2P_REDUCER"
  });
}

export function* openAvaliation() {
  yield put({
    type: "OPEN_AVALIATION_P2P_REDUCER"
  });
}

export function* closeAvaliation() {
  yield put({
    type: "CLOSE_AVALIATION_P2P_REDUCER"
  });
}

export function* setTabIconSaga(payload) {
  yield put({
    type: "SET_TAB_ICON_REDUCER",
    tabIcon: payload.tabIcon
  });
}

export function* getProfileSaga(payload) {
  try {
    yield put({ type: "SET_LOADING_P2P", loading: true });

    const token = yield call(getAuthToken);
    const response = yield call(p2pService.getProfile, token, payload.profile);
    yield put({
      type: "GET_PROFILE_REDUCER",
      profile: response.data
    });
  } catch (error) {
    yield put(CHANGE_SKELETON_ERROR_STATE);
    yield put(internalServerError());
  }
}

export function* confirmOrder(payload) {
  try {
    let token = yield call(getAuthToken);

    yield call(p2pService.confirmOrder, token, payload.idOrder);
  } catch (error) {
    yield put(internalServerError());
  }
}
