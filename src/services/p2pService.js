import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class P2pService {
  async getMyOrders(token, coin) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/coin/" + coin + "/p2p/myorder",
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data.data;

    } catch (error) {
      return internalServerError();
    }
  }

  async getHistory(token, coin) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/coin/" + coin + "/p2p/history",
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data.data;

    } catch (error) {
      return internalServerError();
    }
  }

  async getFilter(token, coin, type, coinBuy) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/coin/" + coin + "/p2p/order/"+type+"/"+coinBuy,
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data.data;

    } catch (error) {
      return internalServerError();
    }
  }

}

export default P2pService;
