import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import {
 
  getAuthToken,
  getUserSeedWords,
  getDefaultCrypto,
  getUserId, 
  getFavoritesCrypto
} from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import UserService from "../../../services/userService";
import TransactionService from "../../../services/transactionService";

const coinService = new CoinService();
const userService = new UserService();
const transactionService = new TransactionService();

export function* loadGeneralInfo(action) {
  try {
    let token = yield call(getAuthToken);
    let seed = yield call(getUserSeedWords);
    let userId = yield call(getUserId);
    let responseCoins = yield call(
      coinService.getGeneralInfo,
      token,
      decryptAes(seed, action.password)
    );
    let responseUser = yield call(userService.getUser, token);
    let pictureUser = yield call(
      userService.getUserPicture,
      responseUser.data.data.email
    );

    let responseCredits = yield call(
      coinService.getCoinBalance,
      "lbrl",
      userId,
      token
    );
    let responseAlias = yield call(
      transactionService.getAliases,
      responseCoins.lunes.address
    );

    if (responseAlias.length > 0) {
      let firstAlias = responseAlias[0].split(":")[2];

      yield put({
        type: "SET_SKELETON_ALIAS_ADDRESS",
        alias: firstAlias
      });
    }

    yield put({ type: "SET_CREDIT_BALANCE", responseCredits });

    yield put({
      type: "SET_USER_INFO",
      user: {
        birthday: responseUser.data.data.birthday,
        city: responseUser.data.data.city,
        country: responseUser.data.data.country,
        terms: responseUser.data.data.terms,
        phone: responseUser.data.data.phone,
        state: responseUser.data.data.state,
        street: responseUser.data.data.street,
        profilePicture: pictureUser,
        name: responseUser.data.data.name,
        surname: responseUser.data.data.surname,
        username: responseUser.data.data.username,
        zipcode: responseUser.data.data.zipcode,
        email: responseUser.data.data.email
      }
    });

    yield put({
      type: "GET_GENERAL_INFO",
      coins: responseCoins
    });

    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* loadCreditBalance(action) {
  try {
    let token = yield call(getAuthToken);
    let userId = yield call(getUserId);
    let {oldBalance} = action;
    let responseCredits = {};
    let timeOut = 25000;
    let endTime = 2000;
    do{
      setTimeout(()=> {}, 2000);
      endTime +=  2000;
      responseCredits  = yield call(
        coinService.getCoinBalance,
        "lbrl",
        userId,
        token
      );
    }while(oldBalance === responseCredits.data.data.available && endTime <= timeOut);

    yield put({ type: "SET_CREDIT_BALANCE", responseCredits });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* loadWalletInfo(action) {
  try {
    const token = yield call(getAuthToken);
    const seed = yield call(getUserSeedWords);
    const defaultCrypto = yield call(getDefaultCrypto);
    let responseCoins = yield call(
      coinService.getGeneralInfo,
      token,
      decryptAes(seed, action.password)
    );
    

    let responseCoinHistory = yield call(
      coinService.getCoinHistory,
      defaultCrypto,
      responseCoins[defaultCrypto].address,
      token
    );
    yield put({
      type: "GET_GENERAL_INFO",
      coins: responseCoins
    });

    yield put({
      type: "SET_WALLET_HISTORY",
      history: responseCoinHistory
    });

    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE"
    });

    yield put({
      type: "SET_WALLET_LOADING"
    });
    yield put({
      type: "SET_ASSET_LOADING"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* getCoinInformation(action){
  const coins = yield call (availableCoins,action.password);
  yield call(balanceCoins, coins);
  
}

export function* availableCoins(password) {
  try {
    let token = yield call(getAuthToken);
    const seed = yield call(getUserSeedWords);
    let coins = yield call(coinService.getAvailableCoins, token,  decryptAes(seed, password));

    yield put({
      type: "GET_AVAILABLE_COINS",
      coins: coins
    });
    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE"
    });
    return coins;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* balanceCoins(coins) {
  try {
    const fav = yield call(getFavoritesCrypto);
    let token = yield call(getAuthToken);
    let favCoins = [];
    Object.values(coins).map(coin => {
      if(coin.status === "active"){
        fav.map((favCoin, index) => {
          if(favCoin === coin.abbreviation){
            favCoins[index] = coin;
          }
        });
      }
    });
    const response = yield call(coinService.getCoinBalance, favCoins, token);
    
    return response;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* createCoinsAddress() {
  try {
    let response = yield call();
    yield put({
      type: "POST_CREATE_COINS_ADDRESS",
      coins: response.data.data.coins
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}
