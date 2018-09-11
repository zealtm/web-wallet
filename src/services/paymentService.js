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
      //API_HEADER.headers.Authorization = token;

      // const response = await axios.get(`${BASE_URL}/bill/${number}`, API_HEADER);
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      let response = await axios.get(
        `https://a.lunes.io/wallet/staging/bill/${number}`
        //API_HEADER
      );

      const data = {
        number: response.data.data.LinhaDigitavel,
        value: response.data.data.Valor,
        assignor: response.data.data.Cedente,
        description: response.data.data.TipoServico,
        dueDate: response.data.data.DataVencimento
      }

      return data;
    }catch(error){
      internalServerError();
      return;
    }
  }

}

export default PaymentService;
