import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class PaymentService {
  async getNomeFuncao() {
    try {
      //let response = await axios.get("");
      let response = {
        teste: "teste",
        teste2: "123"
      }
      return response;
    } catch(error) {
      internalServerError();
      return;
    }
  }

  async getPaymentDataData(number, token) {
    try {
      API_HEADER.headers.Authorization = token;

      // const response = await axios.post(
      //   `${BASE_URL}/payment/validate`,
      //   {number},
      //   API_HEADER
      // );

      // return response.data;

      return {
        cedente: 'Lunes',
        vencimento: '2018-09-12',
        valor: 200.00
      }
    } catch (error) {
      return internalServerError();
    }
  }

  async getCoins(token){
    API_HEADER.headers.Authorization = token;

    let response = await axios.get(
      "https://a.lunes.io/wallet/staging/service/pagamento",
      API_HEADER
    );
    return response.data;
  }
}

export default PaymentService;
