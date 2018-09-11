import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { setAuthToken } from  '../utils/localStorage';

class PaymentService {
  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/service/pagamento`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch(error) {
      return internalServerError();
    }
  }

  async getInvoice(token, number) {
    try {
      // API_HEADER.headers.Authorization = token;

      // const response = await axios.get(`${BASE_URL}/bill/${number}`, API_HEADER);
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      // const data = {
      //   number: response.data.LinhaDigitavel,
      //   value: response.data.Valor,
      //   assignor: response.data.Cedente,
      //   description: response.data.TipoServico,
      //   dueDate: response.data.DataVencimento
      // }

      //teste
      const data = {
        number: number,
        value: 49.90,
        assignor: "Banco Inter",
        description: "Titulo de Cobranca",
        dueDate: "24/09/2018"
      }

      return data;
    } catch(error) {
      return internalServerError();
    }
  }

  async getCoinAmountPay(token, coin, value) {
    try {
      // API_HEADER.headers.Authorization = token;
      // let response = await axios.get(
      //   "url",
      //   API_HEADER,
      //   coin,
      //   value
      // );
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      //teste
      const response = {
        data: {
          amount: 50000
        }
      };

      return response.data;
    } catch(error) {
      return internalServerError();
    }
  }
}

export default PaymentService;
