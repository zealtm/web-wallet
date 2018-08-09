import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import {
    authenticateUser,
    createTwoFactorAuth,
    verifyTwoFactorAuth,
    createUser,
    resetUser,
    hasTwoFactorAuth,
    setUserSeed
} from "../user/redux/userSaga";

import { availableCoins, balanceCoins, createCoinsAddress } from "../skeleton/redux/skeletonSaga";

export default function* rootSaga() {

    yield [
        //user-saga
        fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser),
        fork(takeLatest, "POST_USER_CREATE_2FA_API", createTwoFactorAuth),
        fork(takeLatest, "POST_USER_VERIFY_2FA_API", verifyTwoFactorAuth),
        fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
        fork(takeLatest, "POST_USER_RESET_USER_API", resetUser),
        fork(takeLatest, "GET_USER_2FA_API", hasTwoFactorAuth),
        fork(takeLatest, "SET_USER_SEED_API", setUserSeed),

        //skeleton-saga
        fork(takeLatest, "GET_AVAILABLE_COINS_API", availableCoins),
        fork(takeLatest, "GET_BALANCE_COINS_API", balanceCoins),
        fork(takeLatest, "POST_CREATE_COINS_ADDRESS_API", createCoinsAddress)
    ];
}