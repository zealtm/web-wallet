import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class BuyService {
  async getPackages(token, coin) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/coin/" + coin.coin + "/sell/package",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      let packages = [];
      response.data.data.packages.map(val => {
        packages.push(val);
      });

      return {
        packages
      };
    } catch (error) {
      return internalServerError();
    }
  }

  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/service/compra",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async sendBuy(token, payload) {
    // try {
    //   API_HEADER.headers.Authorization = token;
    //   const response = await axios.post(
    //     `${BASE_URL}/recharge/pay`,
    //     payload,
    //     API_HEADER
    //   );
    //   setAuthToken(response.headers[HEADER_RESPONSE]);
    //   return response;
    // } catch (error) {
    //   internalServerError();
    //   return;
    // }
  }

  async getHistory(token) {
    
  }
}

export default BuyService;
