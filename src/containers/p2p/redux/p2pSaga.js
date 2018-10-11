import { put, call } from "redux-saga/effects";
//import { internalServerError } from "../../errors/statusCodeMessage";

// UTILS
// import { getUserSeedWords } from "../../../utils/localStorage";
// import { decryptAes } from "../../../utils/cryptography";
// import { getAuthToken } from "../../../utils/localStorage";
// import { convertBiggestCoinUnit } from "../../../utils/numbers";
// import { convertToLocaleDate } from "../../../utils/strings";


// SERVICES
//import P2PService from "../../../services/p2pService";
//const p2pService = new P2PService();

export function* setChatStatus(payload) {
  yield put({
    type: "OPEN_CHAT_P2P_REDUCER",
    iduser: payload.iduser
  });
}
