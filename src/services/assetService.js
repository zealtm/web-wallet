//TODO remove it
/* eslint-disable */
//TODO
const colors = require('colors');
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
// import AuthService from "./authService.js";

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


const PATHS = {
  GET_BALANCE: (address) => `coin/lunes/asset/balance/${address}`,
  GET_TX_HISTORY: (address, assetId) => `coin/lunes/asset/history/${address}/${assetId}`
}
//TODO maybe remove it
const getHeaders = (additional) => {
  return {
    ...API_HEADER.headers,
    ...additional
  }
}
// API_HEADER.headers.Authorization = token;
const Axios = axios.create({
  baseURL: BASE_URL,
  headers: API_HEADER.headers,
  timeout: 30000,
  validateStatus: function() {
    return true;
  }
});

class AssetService {
  //TODO MAYBE REMOVE THIS TOKEN
  constructor(token) {
    this.token = token;
  }
  responseValidation(response) {
    if (!response)
      return {type: 'error',message:i18n.t("ASSETS_EMPTY_RESPONSE")}

    if (response.errorMessage) {
      let errorMessage = JSON.parse(response.errorMessage);
      return this.responseValidation(errorMessage);
    }

    let {
      code, message: serverMessage, axiosStatus: status
    } = response ? response : {};

    code = code ? code.toString() : status ? status.toString() : '0';

    if (code !== '200') {
      if (code.startsWith('4'))
        return { type: 'error', message: i18n.t("ASSETS_BAD_REQUEST"),
        serverMessage };
      else if (code.startsWith('5'))
        return { type: 'error', message: i18n.t("ASSETS_SERVER_ERROR"),
        serverMessage };
      else
        return { type: 'error', message: i18n.t("ASSETS_UNKNOWN_ERROR"),
        serverMessage };
    }
    return { type: 'success' }
  }
  async getBalances(address, token) {
    try {
      let { data: result, status } = await Axios.get(PATHS.GET_BALANCE(address),{
        headers: { Authorization: token }
      });
      let { data } = result;
      let { balances } = data ? data : {};

      let validationResult = this.responseValidation({...result, axiosStatus: status});
      if (validationResult.type === 'error')
        return validationResult

      return { type: 'success', data: data };
    } catch (error) {
      console.warn(error);
      internalServerError();
      return {type: 'error', message: error.message || i18n.t("ASSETS_UNKNOWN_ERROR_1")}
    }
  }
  async getTxHistory(address, assetId, token) {
    try {
      let { data: result, status, headers } = await Axios.get(PATHS.GET_TX_HISTORY(
        address, assetId), { headers: { Authorization: token } });
      let { data, type, message } = result ? result : {};
      let { assets } = data ? data : {};

      let validationResult = this.responseValidation({...result, axiosStatus: status});
      if (validationResult.type === 'error')
        return validationResult

      if (assets && assets.constructor.name !== 'Array')
        return { type: 'error', message: i18n.t("ASSETS_NO_TX_HISTORY_1") }
      if (assets.length < 1)
        return { type: 'error', message: i18n.t("ASSETS_NO_TX_HISTORY_2") }

      return { type: 'success', data };
    } catch(error) {
      console.warn(error);
      internalServerError();
      return {type: 'error', message: error.message || i18n.t("ASSETS_UNKNOWN_ERROR_1")}
    }
  }
}

export default AssetService;
