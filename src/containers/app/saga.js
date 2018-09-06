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

import {
  loadGeneralInfo,
  loadWalletInfo,
  availableCoins,
  balanceCoins,
  createCoinsAddress
} from "../skeleton/redux/skeletonSaga";
import {
  validateAddress,
  getWalletCoinHistory,
  shareCoinAddress,
  getWalletSendModalFee,
  getCoinFee,
  setWalletTransaction
} from "../wallet/redux/walletSaga";
import { getProfessionalNode } from "../leasing/redux/leasingSaga";
import { getVoucher } from "../coupons/redux/couponsSaga";
import {
  getTwoFactorAuth,
  verifyTwoFactorAuthSettings
} from "../settings/redux/settingsSaga";

export default function* rootSaga() {
  yield [
    // User-Saga
    fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser),
    fork(takeLatest, "POST_USER_CREATE_2FA_API", createTwoFactorAuth),
    fork(takeLatest, "POST_USER_VERIFY_2FA_API", verifyTwoFactorAuth),
    fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
    fork(takeLatest, "POST_USER_RESET_USER_API", resetUser),
    fork(takeLatest, "GET_USER_2FA_API", hasTwoFactorAuth),
    fork(takeLatest, "SET_USER_SEED_API", setUserSeed),
    // Skeleton-Saga
    fork(takeLatest, "GET_GENERAL_INFO_API", loadGeneralInfo),
    fork(takeLatest, "GET_AVAILABLE_COINS_API", availableCoins),
    fork(takeLatest, "GET_BALANCE_COINS_API", balanceCoins),
    fork(takeLatest, "GET_WALLET_INFO_API", loadWalletInfo),
    fork(takeLatest, "POST_CREATE_COINS_ADDRESS_API", createCoinsAddress),
    // Wallet-Saga
    fork(takeLatest, "GET_WALLET_VALIDATE_ADDRESS_API", validateAddress),
    fork(takeLatest, "GET_WALLET_COIN_HISTORY_API", getWalletCoinHistory),
    fork(takeLatest, "GET_WALLET_MODAL_SEND_FEE_API", getWalletSendModalFee),
    fork(takeLatest, "SHARE_COIN_ADRESS_API", shareCoinAddress),
    fork(takeLatest, "SET_WALLET_TRANSACTION_API", setWalletTransaction),

    // Leasing
    fork(takeLatest, "GET_PROFESSIONAL_NODE_API", getProfessionalNode),
    fork(takeLatest, "GET_COIN_FEE_API", getCoinFee),

    // Coupons
    fork(takeLatest, "GET_VOUCHER_API", getVoucher),

    // Settings
    fork(takeLatest, "POST_SETTINGS_CREATE_2FA_API", getTwoFactorAuth),
    fork(takeLatest, "GET_SETTINGS_2FA_API", verifyTwoFactorAuthSettings)
  ];
}
