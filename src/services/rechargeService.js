import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";

class RechargeService {

  async getOperadoras(token, ddd) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/recharge/operators/`+ddd,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if(response.data.code !== 200){
        return internalServerError();
      }

      let operadoras = [];
      response.data.data.operators.map(val=>{
        operadoras.push({ value: val.id, title: val.name });
      });

      return operadoras;

    } catch (error) {
      return internalServerError();
    }
  }

  async getValoresRecarga(token, action) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/recharge/price/`+action.operadora+`/`+action.ddd,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if(response.data.code !== 200){
        return internalServerError();
      }

      let valores = [];
      response.data.data.prices.map(val=>{
        valores.push({ value: val.value, title: "R$"+val.value });
      });

      return valores;

    } catch (error) {
      return internalServerError();
    }
  }

  async getCoinAmountPay(token, coin, value) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.get(
        `${BASE_URL}/recharge/amount/${coin}?value=${value}`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async sendRecharge(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;

      console.log('send recharge', payload);

      const response = await axios.post(
        `${BASE_URL}/recharge/pay`,
        payload,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      console.log('response send recharge', response);

      return response;
    } catch (error) {
      console.log('error send recharge', error);
      internalServerError();
      return;
    }
  }

  async getHistory(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(`${BASE_URL}/recharge/history`, API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data.data;
    } catch (error) {
      return internalServerError();
    }
  }
}


export default RechargeService;
