import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class PaymentService {
  async getCoins(token){
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        "https://a.lunes.io/wallet/staging/service/pagamento",
        API_HEADER
      );
      return response.data;
    }catch(error){
      internalServerError();
      return;
    }
  }

  async getInvoice(token, number){
    try {
      API_HEADER.headers.Authorization = token;

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

      //teste
      // const data = {
      //   number: number,
      //   value: 45.90,
      //   assignor: "Banco Inter",
      //   description: "Titulo de Cobranca",
      //   dueDate: "24/09/2018"
      // }

      return data;
    }catch(error){
      internalServerError();
      return;
    }
  }

}

export default PaymentService;
