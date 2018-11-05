import { put } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

export function* getInviteAddressSaga() {
  try {
    yield put({
      type: "SET_LOADING_ADDRESS",
      loading: true
    });

    yield put({
      type: "GET_INVITE_ADDRESS_REDUCER",
      address: "123123123123123" // parametro mockup
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* sendMailInviteSaga(email){
  yield put({
    type: "SET_LOADING_INVITES",
    loading: true
  });

  yield put({
    type: "SEND_MAIL_INVITE_REDUCER",
    email
  });
}

export function* getInviteSentSaga(){
  try {
    yield put({
      type: "SET_LOADING_SENT",
      loading: true
    });

    yield put({
      type: "GET_INVITE_SENT_REDUCER",
      invites: [1,2,3,4] // parametro mockup
    });
  } catch (error) {
    yield put(internalServerError());
  }
}