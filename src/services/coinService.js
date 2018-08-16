import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { convertCoin } from "../utils/numbers";
class CoinService {
  async getavailableCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/coin", API_HEADER);
      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getGeneralInfo(token, seed) {
    try {
      API_HEADER.headers.Authorization = token;
      let responseavailableCoins = await axios.get(
        BASE_URL + "/coin",
        API_HEADER
      );

      let availableCoins = responseavailableCoins.data.data.coins;
      let coins = [];

      const promises = availableCoins.map(async (coin, index) => {
        if (coin.status === "active") {
          let responsePrice = await axios.get(
            BASE_URL + "/coin/" + coin.abbreviation + "/price",
            API_HEADER
          );

          availableCoins[index].price = responsePrice.data.data;

          let responseCreateAddress = await axios.post(
            BASE_URL + "/coin/" + coin.abbreviation + "/address",
            { seed },
            API_HEADER
          );

          availableCoins[index].address =
            responseCreateAddress.data.data.address;

          let responseBalance = await axios.get(
            BASE_URL +
              "/coin/" +
              coin.abbreviation +
              "/balance/" +
              coin.address,
            API_HEADER
          );

          availableCoins.token = responseBalance.headers[HEADER_RESPONSE];
          availableCoins[index].balance = responseBalance.data.data;

          availableCoins[index].balance.available = convertCoin(
            availableCoins[index].balance.available,
            coin.decimalPoint
          );

          availableCoins[index].balance.total = convertCoin(
            availableCoins[index].balance.total,
            coin.decimalPoint
          );

          Object.keys(availableCoins[index].price).map(fiat => {
            let fiatPrice = availableCoins[index].price[fiat];
            availableCoins[index].balance[fiat] =
              fiatPrice.price * availableCoins[index].balance.available;
          });
        } else {
          availableCoins[index].address = undefined;
          availableCoins[index].balance = undefined;
        }
      });

      /* eslint-disable */
      await Promise.all(promises);
      /* eslint-enable */

      availableCoins.map((coin, index) => {
        coins[coin.abbreviation] = availableCoins[index];
      });

      coins.token = availableCoins.token;

      return coins;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinBalance(coinType, address, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL + "/coin/" + coinType + "/balance/" + address,
        API_HEADER
      );

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinPrice(coinType, fiat, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL + "/coin/" + coinType + "/price/" + fiat,
        API_HEADER
      );

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async createWalletCoin(coinType, seed, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/coin/" + coinType + "/address",
        { seed },
        API_HEADER
      );

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }
}

export default CoinService;
