import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";
import i18n from "./../utils/i18n"

class P2pService {
  async getPaymentMethodsWhenBuying(token, coin) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/coin/${coin}/p2p/paymentMethods`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        throw new Error(i18n.t("P2P_FAILED_GET_PAYMENT_METHOD"))
      }

      return response.data.data;

    } catch (error) {
      return internalServerError();
    }
  }

  async acceptOfferWhenBuying(token, data) {
    try {
      let {coin, orderId} = data;
      API_HEADER.headers.Authorization = token;

      const response = await axios.post(
        `${BASE_URL}/coin/${coin}/p2p/buy`,
        {
          orderId: orderId
        },
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);
      if (response.data.code !== 200) {
        throw new Error(i18n.t("P2P_FAILED_TO_BUY_COIN"))
      }

    } catch (error) {
      return internalServerError();
    }
  }

  async createOfferWhenSelling(token, data) {
    try {
      let {coin, type, paymentMethodId, amount, amountPayment, addressSeller } = data
      API_HEADER.headers.Authorization = token;

      const response = await axios.post(
        `${BASE_URL}/coin/${coin}/p2p/order`,
        {
          type,
          paymentMethodId,
          amount,
          amountPayment,
          addressSeller
        },
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);
      if (response.data.code !== 200) {
        throw new Error(i18n.t("P2P_FAILED_TO_BUY_COIN"))
      }

      return true

    } catch (error) {
      return internalServerError();
    }
  }
}

export default P2pService;
