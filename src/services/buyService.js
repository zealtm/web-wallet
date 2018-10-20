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
        BASE_URL + "/coin/" + coin + "/sell/package",
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

  async getCoinPayment(token, coin) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/coin/" + coin + "/sell/paymentMethods",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      // if (response.code !== 200) {
      //   return internalServerError();
      // }

      let coins = [];
      response.data.data.coin.map(val => {
        coins.push(val);
      });

      return {
        coins
      };
    } catch (error) {
      return internalServerError();
    }
  }

  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(BASE_URL + "/service/compra", API_HEADER);

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async sendBuy(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.post(
        `${BASE_URL}/coin/${payload.coin}/sell`,
        payload,
        API_HEADER
      );
      console.log(response);
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getHistory(token, coins) {
    try {
      API_HEADER.headers.Authorization = token;

      let url;
      coins = Object.keys(coins);

      let promises = [];
      let thenFunc = r => {
        let { data } = r;
        if (data.code !== 200) throw data;
        return data.data.txs;
      };

      for (let coin of coins) {
        url = `${BASE_URL}/coin/${coin}/sell/history`;
        promises.push(
          axios
            .get(url, API_HEADER)
            .then(thenFunc)
            .catch(() => {})
        );
      }

      let txs = [];
      let results = await Promise.all(promises); //eslint-disable-line

      results.map(array => {
        txs.push(...array);
      });

      return txs;
    } catch (err) {
      return internalServerError();
    }
  }
}

export default BuyService;
