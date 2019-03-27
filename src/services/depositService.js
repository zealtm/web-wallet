// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import axios from "axios";
// UTILS
import {
  setAuthToken
} from "../utils/localStorage";
// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

class DepositService {
  async getPackages(token) {
    try {
      API_HEADER.headers.Authorization = token;

      const packages = [
        { id: 1, amount: 15 },
        { id: 2, amount: 30 },
        { id: 3, amount: 45 },
        { id: 4, amount: 60 },
        { id: 5, amount: 100 },
        { id: 6, amount: 250 },
        { id: 7, amount: 500 },
        { id: 8, amount: 1000 }
      ];

      return packages;
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
}

export default DepositService;
