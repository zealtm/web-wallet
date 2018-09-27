import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import NotificationService from "../../../services/notificationService";

const notificationService = new NotificationService();

export function* getNotificationsSaga () {
  try {
    let response = yield call(notificationService.getNotifications);
    yield put({
      type: "GET_NOTIFICATIONS_REDUCER",
      notifications: response.data
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}
