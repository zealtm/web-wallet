import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

// SERVICES
import InviteService from "../../../services/inviteService";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";

const inviteService = new InviteService();

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

export function* sendMailInviteSaga(email) {
  yield put({
    type: "SET_LOADING_INVITES",
    loading: true
  });

  let token = yield call(getAuthToken);
  yield call(inviteService.sendEmail, token, email);

  yield put({
    type: "SEND_MAIL_INVITE_REDUCER",
    email
  });
}

export function* getInviteSentSaga() {
  try {
    yield put({
      type: "SET_LOADING_SENT",
      loading: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(inviteService.getInviteHistory, token);

    let invites = [];
    if(response){
      invites = response
    }

    yield put({
      type: "GET_INVITE_SENT_REDUCER",
      invites: invites.data// parametro mockup
    });
  } catch (error) {
    yield put(internalServerError());
  }
}