import axios from "axios";
import bb from "brazilian-barcode";

//CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROR
import {
  internalServerError,
  forbidden
} from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";
import i18n from "../utils/i18n";

class PaymentService {
  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/service/pagamento",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch (error) {
      console.warn(error);
      return internalServerError();
    }
  }

  async getInvoice(token, number) {
    try {
      API_HEADER.headers.Authorization = token;

      const response = await axios.get(
        BASE_URL + "/bill/" + number,
        API_HEADER
      );

      if (response.data.code === 500) {
        return forbidden(i18n.t("PAYMENT_UNAUTHORIZED"));
      }

      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch (error) {
      console.warn(error);

      // If the http status = 500
      if (error.response.data.code === 500) {
        return forbidden(i18n.t("PAYMENT_UNAUTHORIZED"));
      }

      return internalServerError();
    }
  }

  async getCoinAmountPay(token, coin, value) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.get(
        `${BASE_URL}/bill/amount/${coin}?value=${value}`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      console.warn(error);
      return internalServerError();
    }
  }

  async getHistory(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(`${BASE_URL}/bill/history`, API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code === 404) {
        return {
          payments: []
        };
      }

      if (response.data.code !== 200) {
        return "ERRO";
      }

      return response.data.data;
    } catch (error) {
      console.warn(error);
      return internalServerError();
    }
  }

  async sendPay(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;

      const response = await axios.post(
        BASE_URL + "/bill/pay/" + payload.barCode,
        payload,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      console.warn(error);
      internalServerError();
      return;
    }
  }

  async getBarcode(image) {
    try {
      const formData = new FormData();
      formData.append(
        "fupload1",
        image.target.files[0],
        image.target.files[0].name
      );

      const responseFirst = await axios.post(
        "https://wabr.inliteresearch.com/barcodes",
        formData
      );

      formData.append("sr", 0);
      formData.append("azspeed", 2);
      formData.append("MAX_FILE_SIZE", 10485760);

      const responseLast = await axios.post(
        "https://reader.datasymbol.com/cgi-bin/brcgi",
        formData,
        {
          crossdomain: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Headers": "",
            "Access-Control-Allow-Origin": ""
          }
        }
      );

      let barcode =
        responseFirst.data.Barcodes[0].Text.substring(0, 2) +
        responseLast.data.substring(2, responseLast.data.length - 1);

      if (barcode.charAt(0) !== "8")
        barcode = bb.digit.getVDBank(barcode, true);

      return barcode;
    } catch (error) {
      console.warn(error);
      internalServerError();
      return;
    }
  }
}

export default PaymentService;
