import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class PaymentService {
  async getNomeFuncao(){
    try {
      //let response = await axios.get("");
      let response = {
        teste: "teste",
        teste2: "123"
      }
      return response;
    }catch(error){
      internalServerError();
      return;
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

  async getInvoice(token, number){
    //API_HEADER.headers.Authorization = token;
   
    let response = await axios.get(
      `https://a.lunes.io/wallet/staging/bill/${number}`
      //API_HEADER
    );

    

    const data = {
      number: response.data.LinhaDigitavel,
      value: response.data.Valor, 
      assignor: response.data.Cedente,
      description: response.data.TipoServico,
      dueDate: response.data.DataVencimento
    }

    return data;
  }
}

export default PaymentService;