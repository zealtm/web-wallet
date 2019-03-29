import axios from "axios";
// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// UTILS
import {
  setAuthToken
} from "../utils/localStorage";
// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";


class DepositService {

  async getPackages(token) {
    try {
      let packages = [];

      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/deposit/packages",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== "200") {
        return packages;
      }

      return response.data.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getDepositHistory(token) {
    try {

      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL + "/deposit/history",
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);      

      return response;

    } catch (error) {
      return internalServerError();
    }
  }


  async createDepositBill(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.post(
        `${BASE_URL}/deposit/bill`,
        payload,
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);
      
      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getKycData(token) {
    try {

      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/deposit/user", API_HEADER);

      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response.data;
    } catch (error) {
      internalServerError();
    }
  }

  async getPaymentsMethods(token){
    try{
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(`${BASE_URL}/deposit/paymentmethods`, API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response.data;
    }catch(error){
      internalServerError();
    }
  }
}

export default DepositService;
