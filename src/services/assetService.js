//TODO remove it
/* eslint-disable */
//TODO

import axios from "axios";
import {
  BASE_URL,
  LUNESNODE_URL,
  API_HEADER,
  HEADER_RESPONSE,
  TESTNET
} from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

// SERVICES
import AuthService from "./authService.js";

// UTILS
import {
  getDefaultCrypto,
  setDefaultCrypto,
  setAuthToken
} from "../utils/localStorage";
import {
  convertBiggestCoinUnit,
  percentCalc,
  convertSmallerCoinUnit
} from "../utils/numbers";
import i18n from "../utils/i18n.js";

let token;
let Axios;
const PATHS = {
  GET_BALANCE: (address) => `coin/lunes/asset/balance/${address}`,
  GET_TX_HISTORY: (address, assetId) => `coin/lunes/asset/history/${address}/${assetId}`
}

async function init() {
  async function login() {
    const auth = new AuthService();
    console.log('Doing the login...'.yellow)
    let { data } = await auth.authenticate('lunes2', '12345678')
    console.log('Loggin function have passed through'.green)
    token = data.data.token;
  }
  await login();

  API_HEADER.headers.Authorization = token;
  Axios = axios.create({
    baseURL: BASE_URL,
    headers: API_HEADER.headers,
    timeout: 30000,
    valitadeStatus: function() {
      return true;
    }
  });
}
init().then(() => {
  class AssetService {
    async getBalance(address, token) {
      let response = await Axios.get(PATHS.GET_BALANCE(address))
      console.log(response)
    }
    async getTxHistory() {
      let response = await Axios.ge(PATHS.GET_TX_HISTORY(address, assetId));
      console.log(response)
    }
  }
  const assetService = new AssetService();
  assetService.getBalance('37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr', token)
    .then(r => { console.log(r) })
    .catch(e => { console.log('error', e) })
});
